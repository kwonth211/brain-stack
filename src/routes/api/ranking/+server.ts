import { serveToClient } from '$utils/convert';
import { json } from '@sveltejs/kit';
import { sql } from '@vercel/postgres';

export async function GET(request) {
	const categoryId = request.url.searchParams.get('categoryId');
	const params = [];

	let categoryCondition = '';
	if (categoryId) {
		categoryCondition = `AND q.category_id = $1`;
		params.push(categoryId);
	}

	const query = `
        SELECT
            user_id,
            user_nickname,
            total_correct,
            total_attempts,
            user_accuracy
        FROM (
            SELECT
                u.id as user_id,
                u.nickname as user_nickname,
                COUNT(uq.is_correct) FILTER (WHERE uq.is_correct = true AND uq.quiz_id = q.id ${categoryCondition}) as total_correct,
                COUNT(uq.is_correct) FILTER (WHERE uq.quiz_id = q.id ${categoryCondition}) as total_attempts,
                CASE WHEN COUNT(uq.is_correct) FILTER (WHERE uq.quiz_id = q.id ${categoryCondition}) > 0 THEN 
                    COUNT(uq.is_correct) FILTER (WHERE uq.is_correct = true AND uq.quiz_id = q.id ${categoryCondition}) * 100.0 / COUNT(uq.is_correct) FILTER (WHERE uq.quiz_id = q.id ${categoryCondition})
                ELSE 0 
                END as user_accuracy
            FROM
                users u
            LEFT JOIN user_quizzes uq on u.id = uq.user_id
            LEFT JOIN quizzes q on uq.quiz_id = q.id
            GROUP BY u.id, u.nickname
        ) as ranking
        WHERE total_correct > 0
        ORDER BY total_correct DESC, user_accuracy DESC, total_attempts DESC
    `;

	const { rows } = await sql.query(query, params);
	return json(serveToClient(rows), { status: 200 });
}
