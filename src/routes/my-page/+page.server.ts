import { json } from '@sveltejs/kit';
import { sql } from '@vercel/postgres';
import type { User } from '../../types/user';

export async function load({ locals }) {
	const session = await locals.getSession();
	if (!session?.user) {
		throw new Error('Unauthorized');
	}

	const { rows: existingUsers } = await sql`SELECT * FROM users WHERE email=${session.user.email}`;

	if (existingUsers.length === 0) {
		throw new Error('User not found');
	}

	const user = existingUsers[0];
	const userId = user.id;

	const { rows: quizResults } =
		await sql`SELECT is_correct FROM user_quizzes WHERE user_id=${userId}`;

	const totalQuizzes = quizResults.length;
	let correctAnswers = 0;
	let incorrectAnswers = 0;

	for (const result of quizResults) {
		if (result.is_correct) {
			correctAnswers++;
		} else {
			incorrectAnswers++;
		}
	}

	const accuracy = ((correctAnswers / totalQuizzes) * 100).toFixed(2);

	return {
		user: user as User,
		statistics: {
			totalQuizzes,
			correctAnswers,
			incorrectAnswers,
			accuracy: `${isNaN(Number(accuracy)) ? 0 : accuracy}%`
		}
	};
}
