import { getRemainingQuizzes } from '$utils/server/utils';
import { sql } from '@vercel/postgres';

export async function load({ locals }) {
	const session = await locals.getSession();
	const userEmail = session?.user?.email;

	const remainingQuizzes = await getRemainingQuizzes({
		userEmail,
		categoryId: '2'
	});

	return {
		remainingQuizzes: remainingQuizzes,
		streamed: {
			ranking: getTopFiveRanking()
		}
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
                WHERE uq.user_id=${user.id} AND q.category_id = 2`;

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
