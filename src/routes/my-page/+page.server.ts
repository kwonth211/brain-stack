import { json, redirect } from '@sveltejs/kit';
import { sql } from '@vercel/postgres';
import type { User } from '../../types/user';

export async function load({ locals }) {
	const session = await locals.getSession();
	if (!session?.user) {
		throw redirect(307, '/signin');
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
		streamed: {
			ranking: getTopTenRanking()
		},
		statistics: {
			totalQuizzes,
			correctAnswers,
			incorrectAnswers,
			accuracy: `${isNaN(Number(accuracy)) ? 0 : accuracy}%`
		}
	};
}

const getTopTenRanking = async () => {
	const { rows: allUsers } = await sql`SELECT id, nickname FROM users`;
	const rankingData = [];

	for (const user of allUsers) {
		const { rows: userQuizResults } =
			await sql`SELECT is_correct, point FROM user_quizzes WHERE user_id=${user.id}`;
		let totalPoints = 0;
		let totalCorrect = 0;

		for (const result of userQuizResults) {
			totalPoints += result.point;
			if (result.is_correct) {
				totalCorrect++;
			}
		}

		const totalAttempts = userQuizResults.length;
		const userAccuracy = totalAttempts === 0 ? 0 : (totalCorrect / totalAttempts) * 100;

		rankingData.push({
			userId: user.id,
			userNickname: user.nickname,
			totalPoints,
			userAccuracy,
			totalAttempts
		});
	}

	// Sort the ranking data
	rankingData.sort((a, b) => {
		if (a.totalPoints !== b.totalPoints) {
			return b.totalPoints - a.totalPoints;
		}
		if (a.userAccuracy !== b.userAccuracy) {
			return b.userAccuracy - a.userAccuracy;
		}
		return b.totalAttempts - a.totalAttempts;
	});

	return rankingData;
};
