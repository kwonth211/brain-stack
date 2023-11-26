import { serveToClient } from '$utils/convert';
import { sql } from '@vercel/postgres';

export const getPopularQuizzes = async (categoryId: number) => {
	let query = `
        SELECT q.id AS quiz_id, q.question, COUNT(uq.quiz_id) AS attempts
        FROM quizzes q
        LEFT JOIN user_quizzes uq ON q.id = uq.quiz_id
    `;
	if (categoryId) {
		query += `WHERE q.category_id = ${categoryId} `;
	}
	query += `
        GROUP BY q.id
        ORDER BY attempts DESC
        LIMIT 10;
    `;
	const { rows } = await sql.query(query);
	return serveToClient(rows);
};

// 어려운 퀴즈 조회 함수
export const getDifficultQuizzes = async (categoryId: number) => {
	let query = `
        SELECT q.id AS quiz_id, q.question,
               (SUM(CASE WHEN uq.is_correct = true THEN 1 ELSE 0 END) / COUNT(uq.quiz_id)) * 100 AS success_rate
        FROM quizzes q
        LEFT JOIN user_quizzes uq ON q.id = uq.quiz_id
    `;
	if (categoryId) {
		query += `WHERE q.category_id = ${categoryId} `;
	}
	query += `
        GROUP BY q.id
        ORDER BY success_rate ASC
        LIMIT 10;
    `;
	const { rows } = await sql.query(query);
	return rows;
};
