import { createPool } from '@vercel/postgres';
import type { Categories } from '../../types/categories';
import { getRemainingQuizzes } from '$utils/server/utils';

export async function load({ url, params, locals }) {
	const db = createPool();
	const session = await locals.getSession();

	const userEmail = session?.user?.email;

	try {
		const { rows: categories } = await db.query(
			'SELECT * FROM categories where id != 12 and id != 13 and id != 14 and id != 1 and id != 2 and id != 999'
		);

		const remainingQuizzes = await getRemainingQuizzes({
			userEmail
		});
		return {
			remainingQuizzes: remainingQuizzes,
			categories: [...categories] as Categories[]
		};
	} catch (error: any) {
		throw new Error(error.message);
	}
}
