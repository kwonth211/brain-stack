import { createPool } from '@vercel/postgres';
import type { Quiz } from '../../types/quiz';
import { sql } from '@vercel/postgres';

export async function load(event) {
	const categoryId = event.url.searchParams.get('category');
	const session = await event.locals.getSession();
	const userId = session?.user?.email; // 세션에서 유저 이메일 가져오기

	try {
		const { rows: solvedQuizzes } =
			await sql`SELECT quiz_id FROM user_quizzes WHERE user_id = (SELECT id FROM users WHERE email=${userId})`;

		let query = `SELECT * FROM quizzes WHERE `;
		let conditions = [];
		let values = [];

		if (categoryId) {
			conditions.push(`category_id=$${conditions.length + 1}`);
			values.push(categoryId);
		}

		if (solvedQuizzes.length > 0) {
			const quizIds = solvedQuizzes.map((q) => q.quiz_id);
			conditions.push(
				`id NOT IN (${quizIds.map((_, i) => `$${conditions.length + i + 1}`).join(', ')})`
			);
			values.push(...quizIds);
		}

		query += conditions.join(' AND ');

		const { rows: quizzes } = await sql.query(query, values);

		return {
			quizzes: quizzes as Quiz[]
		};
	} catch (error: unknown) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
}
