import { getTopFiveRanking } from '$utils/server/utils';
import type { StorageQuizType } from '$utils/window/interface';
import { sql } from '@vercel/postgres';

const categoryId = '999';

export async function load({ locals }) {
	const session = await locals.getSession();
	const userEmail = session?.user?.email;

	const remainingQuizzes = await getRemainingQuizzes({
		userEmail,
		categoryId: categoryId
	});

	return {
		remainingQuizzes: remainingQuizzes,
		streamed: {
			ranking: getTopFiveRanking({ categoryId: categoryId })
		}
	};
}

const getRemainingQuizzes = async ({
	categoryId,
	userEmail
}: {
	categoryId?: string | null;
	userEmail?: string | null;
}) => {
	const conditions = ['q.category_id != 12'];
	const params = [];

	if (userEmail) {
		conditions.push(`NOT EXISTS (
      SELECT 1
      FROM user_quizzes uq
      INNER JOIN users u ON u.id = uq.user_id
      WHERE uq.quiz_id = q.id AND u.email = $${params.length + 1}
    )`);
		params.push(userEmail);
	}

	if (categoryId) {
		conditions.push(`q.category_id = $${params.length + 1}`);
		params.push(categoryId);
	}

	let query = `SELECT q.id,q.category_id FROM quizzes q`;
	if (conditions.length > 0) {
		query += ` WHERE ` + conditions.join(' AND ');
	}

	const { rows: remainingQuizzes } = await sql.query(query, params);

	return remainingQuizzes as StorageQuizType;
};
