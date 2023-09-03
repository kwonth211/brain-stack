import { json } from '@sveltejs/kit';
import { sql } from '@vercel/postgres';
import type { User } from '../../data/user';

export async function load({ locals, request }: { request: Request }) {
	const session = await locals.getSession();

	const { rows: existingUsers } = await sql`SELECT * FROM users WHERE email=${session.user.email}`;

	if (existingUsers.length === 0) {
		return json({ error: 'User not found' }, { status: 404 });
	}

	const user = existingUsers[0];
	const userId = user.id;

	const { rows: quizResults } =
		await sql`SELECT is_correct FROM user_quizzes WHERE user_id=${userId}`;

	if (quizResults.length === 0) {
		return json({ message: 'No quiz results found for this user.' }, { status: 404 });
	}

	// Calculate statistics
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
			accuracy: `${accuracy}%`
		}
	};
}
