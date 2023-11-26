import { serveToClient } from '$utils/convert';
import type { StorageQuizType } from '$utils/window/interface';
import { sql } from '@vercel/postgres';

export const getRemainingQuizzes = async ({
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

	if (categoryId && categoryId !== '0') {
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

export const getSolvedQuizzes = async ({
	categoryId,
	userId
}: {
	categoryId?: string | null;
	userId?: string | null;
}) => {
	const { rows: solvedQuizzes } = categoryId
		? await sql`SELECT quiz_id, is_correct, answer FROM user_quizzes WHERE user_id = (SELECT id FROM users WHERE email=${userId}) AND quiz_id IN (SELECT id FROM quizzes WHERE category_id=${categoryId})`
		: await sql`SELECT quiz_id, is_correct, answer FROM user_quizzes WHERE user_id = (SELECT id FROM users WHERE email=${userId})`;

	return solvedQuizzes;
};

export const getAllRanking = async () => {
	const { rows } = await sql`
    SELECT
      u.id as user_id,
      u.nickname as user_nickname,
      COUNT(uq.is_correct) FILTER (WHERE uq.is_correct = true) as total_correct,
      COUNT(uq.is_correct) as total_attempts,
      CASE 
        WHEN COUNT(uq.is_correct) > 0 THEN 
          COUNT(uq.is_correct) FILTER (WHERE uq.is_correct = true) * 100.0 / COUNT(uq.is_correct)
        ELSE 0 
      END as user_accuracy
    FROM 
      users u
    LEFT JOIN user_quizzes uq on u.id = uq.user_id
    LEFT JOIN quizzes q on uq.quiz_id = q.id
    WHERE q.category_id != 12
    GROUP BY u.id
    ORDER BY total_correct DESC, user_accuracy DESC, total_attempts DESC
  `;

	const rankingData = serveToClient(rows);
	const formattedRankingData = rankingData.map((user) => {
		return {
			userId: user.userId,
			userNickname: user.userNickname,
			totalCorrect: Number(user.totalCorrect),
			totalAttempts: Number(user.totalAttempts),
			userAccuracy: Number(user.userAccuracy)
		};
	});
	return formattedRankingData;
};

export const getTopFiveRanking = async ({ categoryId }: { categoryId: string }) => {
	const { rows } = await sql`
    SELECT
      u.id as user_id,
      u.nickname as user_nickname,
      COUNT(uq.is_correct) FILTER (WHERE uq.is_correct = true) as total_correct,
      COUNT(uq.is_correct) as total_attempts,
      CASE WHEN COUNT(uq.is_correct) > 0 THEN 
        COUNT(uq.is_correct) FILTER (WHERE uq.is_correct = true) * 100.0 / COUNT(uq.is_correct) 
      ELSE 0 
      END as user_accuracy
    FROM
      users u
    LEFT JOIN user_quizzes uq on u.id = uq.user_id
    LEFT JOIN quizzes q on uq.quiz_id = q.id
    WHERE q.category_id = ${categoryId}  
    GROUP BY u.id, u.nickname
    ORDER BY total_correct DESC, user_accuracy DESC, total_attempts DESC
    LIMIT 5
  `;

	return serveToClient(rows);
};

export const updateCategoryRanking = async (
	userId: number,
	categoryId: number,
	isCorrect: boolean
) => {
	return await sql`
        INSERT INTO user_category_rankings (user_id, category_id, correct_count, incorrect_count)
        VALUES (${userId}, ${categoryId}, ${isCorrect ? 1 : 0}, ${isCorrect ? 0 : 1})
        ON CONFLICT (user_id, category_id)
        DO UPDATE SET
            correct_count = user_category_rankings.correct_count + ${isCorrect ? 1 : 0},
            incorrect_count = user_category_rankings.incorrect_count + ${isCorrect ? 0 : 1};
    `;
};
