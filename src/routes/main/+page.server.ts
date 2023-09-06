import { sql } from '@vercel/postgres';
import type { User } from '../../types/user';

export async function load({ locals }) {
	const session = await locals.getSession();
	if (!session?.user) {
		throw new Error('Unauthorized');
	}

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
		const totalQuizzes = quizResults.length ?? 0;

		return { user: user as User, totalQuizzes };
	} catch (error) {
		if ((error as Error).status === 404) {
			throw error;
		}
	}
}
