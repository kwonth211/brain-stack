import { createPool } from '@vercel/postgres';
import type { Quiz } from '../../types/quiz';

export async function load(params) {
	const categoryId = params.url.searchParams.get('category');
	const db = createPool();
	const startTime = Date.now();

	try {
		let query = 'SELECT * FROM quizzes';
		const values = [];

		if (categoryId) {
			query += ' WHERE category_id = $1';
			values.push(categoryId);
		}

		const { rows: quizzes } = await db.query(query, values);
		const duration = Date.now() - startTime;
		return {
			quizzes: quizzes as Quiz[],
			duration: duration
		};
	} catch (error: unknown) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
}
