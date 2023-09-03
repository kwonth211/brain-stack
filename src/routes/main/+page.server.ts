import { json } from '@sveltejs/kit';
import { sql } from '@vercel/postgres';
import type { User } from '../../data/user';

export async function load({ locals, request }: { request: Request }) {
	const session = await locals.getSession();

	try {
		const { rows: existingUsers } =
			await sql`SELECT * FROM users WHERE email=${session.user.email}`;
		if (existingUsers.length === 0) {
			const error = new Error('User not found');
			error.status = 404;
			throw error;
		}

		const user = existingUsers[0];

		const userId = user.id;

		const { rows: quizResults } =
			await sql`SELECT is_correct FROM user_quizzes WHERE user_id=${userId}`;

		const totalQuizzes = quizResults.length;

		return { user: user as User, totalQuizzes };
	} catch (error) {
		if (error.status === 404) {
			throw error;
		}
	}
}
