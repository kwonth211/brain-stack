import { createPool } from '@vercel/postgres';
import type { Quiz } from '../../types/quiz';
import { sql } from '@vercel/postgres';

// export async function load(event) {
// 	const session = await event.locals.getSession();

// 	console.log('>>>', session);

// 	const categoryId = event.url.searchParams.get('category');
// 	const db = createPool();
// 	const startTime = Date.now();

// 	try {
// 		let query = 'SELECT * FROM quizzes';
// 		const values = [];

// 		if (categoryId) {
// 			query += ' WHERE category_id = $1';
// 			values.push(categoryId);
// 		}

// 		const { rows: quizzes } = await db.query(query, values);
// 		const duration = Date.now() - startTime;
// 		return {
// 			quizzes: quizzes as Quiz[],
// 			duration: duration
// 		};
// 	} catch (error: unknown) {
// 		if (error instanceof Error) {
// 			throw new Error(error.message);
// 		}
// 	}
// }

export async function load(event) {
	const categoryId = event.url.searchParams.get('category');
	const session = await event.locals.getSession();
	const userId = session?.user?.email; // 세션에서 유저 이메일 가져오기

	try {
		// 유저가 이미 푼 퀴즈의 ID를 가져옵니다.
		const { rows: solvedQuizzes } =
			await sql`SELECT quiz_id FROM user_quizzes WHERE user_id = (SELECT id FROM users WHERE email=${userId})`;

		let quizzes;
		if (categoryId) {
			if (solvedQuizzes.length > 0) {
				// example
				//  sql`SELECT * FROM users`, not sql('SELECT * FROM users')

				quizzes =
					await sql`SELECT * FROM quizzes WHERE category_id=${categoryId} AND id NOT IN (23,31)`;

				// 동적 쿼리로 변경
			} else {
				quizzes = await sql`SELECT * FROM quizzes WHERE category_id=${categoryId}`;
			}
		} else {
			if (solvedQuizzes.length > 0) {
				quizzes = await sql`SELECT * FROM quizzes WHERE id NOT IN (23,31)`;
			} else {
				quizzes = await sql`SELECT * FROM quizzes`;
			}
		}

		// const duration = Date.now() - startTime;
		return {
			quizzes: quizzes.rows as Quiz[]
			// duration: duration
		};
	} catch (error: unknown) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
}
