import type { User } from '$types/user';
import { json } from '@sveltejs/kit';
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
			ranking: await getTopFiveRanking()
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
	const { rows: rankingData } = await sql`
		WITH UserScores AS (
			SELECT 
				users.id AS "userId",
				users.nickname AS "userNickname",
				COALESCE(SUM(user_quizzes.point), 0) AS "totalPoints",
				COALESCE(SUM(CASE WHEN user_quizzes.is_correct THEN 1 ELSE 0 END), 0) AS "totalCorrect",
				COUNT(user_quizzes.is_correct) AS "totalAttempts",
				COALESCE(100.0 * SUM(CASE WHEN user_quizzes.is_correct THEN 1 ELSE 0 END) / NULLIF(COUNT(user_quizzes.is_correct), 0), 0) AS "userAccuracy"
			FROM users
			LEFT JOIN user_quizzes ON users.id = user_quizzes.user_id
			GROUP BY users.id
		)
		SELECT * FROM UserScores
		ORDER BY "totalPoints" DESC, "userAccuracy" DESC, "totalAttempts" DESC
		LIMIT 5;
	`;

	return rankingData;
};
