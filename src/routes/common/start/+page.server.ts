import type { User } from '$types/user';
import { sql } from '@vercel/postgres';

export async function load({ locals }) {
	const session = await locals.getSession();
	// if (!session?.user) {
	// 	throw redirect(307, '/signin');
	// }

	// const { rows: existingUsers } = await sql`SELECT * FROM users WHERE email=${session.user.email}`;

	// if (existingUsers.length === 0) {
	// 	throw new Error('User not found');
	// }

	// const user = existingUsers[0];
	// const userId = user.id;

	// const { rows: quizResults } =
	// 	await sql`SELECT is_correct FROM user_quizzes WHERE user_id=${userId}`;

	// const totalQuizzes = quizResults.length;
	// let correctAnswers = 0;
	// let incorrectAnswers = 0;

	// for (const result of quizResults) {
	// 	if (result.is_correct) {
	// 		correctAnswers++;
	// 	} else {
	// 		incorrectAnswers++;
	// 	}
	// }

	// const accuracy = ((correctAnswers / totalQuizzes) * 100).toFixed(2);

	return {
		// user: user as User,
		streamed: {
			ranking: getTopFiveRanking()
		}
		// statistics: {
		// 	totalQuizzes,
		// 	correctAnswers,
		// 	incorrectAnswers,
		// 	accuracy: `${isNaN(Number(accuracy)) ? 0 : accuracy}%`
		// }
	};
}
const getTopFiveRanking = async () => {
	const { rows: allUsers } = await sql`SELECT id, nickname, email FROM users`;
	const rankingData = [];

	for (const user of allUsers) {
		const { rows: userQuizResults } = await sql`
                SELECT uq.is_correct 
                FROM user_quizzes uq
                JOIN quizzes q ON uq.quiz_id = q.id
                WHERE uq.user_id=${user.id} AND q.category_id != 12`;

		let totalCorrect = 0;

		for (const result of userQuizResults) {
			if (result.is_correct) {
				totalCorrect++;
			}
		}

		const totalAttempts = userQuizResults.length;
		const userAccuracy = totalAttempts === 0 ? 0 : (totalCorrect / totalAttempts) * 100;

		rankingData.push({
			userId: user.id,
			userEmail: user.email,
			userNickname: user.nickname,
			totalPoints: totalCorrect,
			userAccuracy,
			totalAttempts
		});
	}

	rankingData.sort((a, b) => {
		if (a.totalPoints !== b.totalPoints) {
			return b.totalPoints - a.totalPoints;
		}
		if (a.userAccuracy !== b.userAccuracy) {
			return b.userAccuracy - a.userAccuracy;
		}
		return b.totalAttempts - a.totalAttempts;
	});

	return rankingData.slice(0, 5);
};
