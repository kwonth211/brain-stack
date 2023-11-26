import { serveToClient } from '$utils/convert';
import { json } from '@sveltejs/kit';
import { sql } from '@vercel/postgres';

export async function GET(request) {
	const categoryId = request.url.searchParams.get('categoryId');

	let query = '';
	let params: string[] = [];

	if (categoryId) {
		// 특정 카테고리에 대한 랭킹 조회
		query = `
            SELECT
                u.nickname AS user_nickname,
                ucr.correct_count AS total_correct,
                ucr.incorrect_count AS total_incorrect,
                (ucr.correct_count * 100.0 / (ucr.correct_count + ucr.incorrect_count)) AS user_accuracy
            FROM
                user_category_rankings ucr
            JOIN
                users u ON ucr.user_id = u.id
            WHERE
                ucr.category_id = $1
            ORDER BY
                total_correct DESC, user_accuracy DESC, (ucr.correct_count + ucr.incorrect_count) DESC
        `;
		params = [categoryId];
	} else {
		// 전체 카테고리에 대한 랭킹 조회
		query = `
            SELECT
                u.nickname AS user_nickname,
                SUM(ucr.correct_count) AS total_correct,
                SUM(ucr.incorrect_count) AS total_incorrect,
                (SUM(ucr.correct_count) * 100.0 / (SUM(ucr.correct_count) + SUM(ucr.incorrect_count))) AS user_accuracy
            FROM
                user_category_rankings ucr
            JOIN
                users u ON ucr.user_id = u.id
            GROUP BY
                ucr.user_id, u.nickname
            ORDER BY
                total_correct DESC, user_accuracy DESC, (SUM(ucr.correct_count) + SUM(ucr.incorrect_count)) DESC
        `;
	}

	const { rows } = await sql.query(query, params);
	return json(serveToClient(rows), { status: 200 });
}
