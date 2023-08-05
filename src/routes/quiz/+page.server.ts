import { createPool } from '@vercel/postgres';
import type { Quiz } from '../../types/quiz';

export async function load() {
	const db = createPool();
	const startTime = Date.now();

	try {
		const { rows: quizzes } = await db.query('SELECT * FROM quizzes');
		const duration = Date.now() - startTime;
		return {
			quizzes: quizzes as Quiz[],
			duration: duration
		};
	} catch (error: any) {
		throw new Error(error.message);
	}
}
