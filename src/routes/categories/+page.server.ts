import { createPool } from '@vercel/postgres';
import type { Categories } from '../../types/categories';

export async function load() {
	const db = createPool();
	const startTime = Date.now();

	try {
		const { rows: categories } = await db.query('SELECT * FROM categories');
		const duration = Date.now() - startTime;
		return {
			categories: [
				...categories,
				{
					id: 0,
					name: '랜덤'
				}
			] as Categories[],
			duration: duration
		};
	} catch (error: any) {
		throw new Error(error.message);
	}
}
