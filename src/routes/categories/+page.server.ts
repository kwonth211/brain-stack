import { createPool } from '@vercel/postgres';
import type { Categories } from '../../types/categories';
import { getRemainingQuizzes, getSolvedQuizzes } from '$utils/server/utils';
import type Quiz from '$components/Quiz.svelte';

export async function load({ url, params, locals }) {
	const db = createPool();
	const startTime = Date.now();
	const session = await locals.getSession();

	const userId = session?.user?.email;

	try {
		const { rows: categories } = await db.query('SELECT * FROM categories where id != 12');

		const solvedQuizzes = await getSolvedQuizzes({
			userId
		});

		const remainingQuizzes = await getRemainingQuizzes({
			solvedQuizzes
		});

		const nextQuiz = remainingQuizzes[Math.floor(Math.random() * remainingQuizzes.length)];
		return {
			solvedQuizzes,
			remainingQuizzes: remainingQuizzes as Quiz[],
			categories: [
				...categories,
				{
					id: 0,
					name: '랜덤'
				}
			] as Categories[]
		};
	} catch (error: any) {
		throw new Error(error.message);
	}
}
