import { sql } from '@vercel/postgres';

export const getRemainingQuizzes = async ({
	categoryId,
	solvedQuizzes
}: {
	solvedQuizzes: any[];
	categoryId?: string | null;
}) => {
	const conditions = [`category_id != 12`];

	const values = [];

	if (categoryId) {
		conditions.push(`category_id=$${values.length + 1}`);
		values.push(categoryId);
	}

	if (solvedQuizzes.length > 0) {
		const quizIds = solvedQuizzes.map((q) => q.quiz_id);
		conditions.push(`id NOT IN (${quizIds.map((_, i) => `$${values.length + i + 1}`).join(', ')})`);
		values.push(...quizIds);
	}

	let remainingQuizQuery = `SELECT * FROM quizzes `;
	if (conditions.length > 0) {
		remainingQuizQuery += `WHERE ${conditions.join(' AND ')} `;
	}

	const { rows: remainingQuizzes } = await sql.query(remainingQuizQuery, values);

	return remainingQuizzes;
};

export const getSolvedQuizzes = async ({
	categoryId,
	userId
}: {
	categoryId?: string | null;
	userId?: string | null;
}) => {
	const { rows: solvedQuizzes } = categoryId
		? await sql`SELECT quiz_id, is_correct, answer FROM user_quizzes WHERE user_id = (SELECT id FROM users WHERE email=${userId}) AND quiz_id IN (SELECT id FROM quizzes WHERE category_id=${categoryId})`
		: await sql`SELECT quiz_id, is_correct, answer FROM user_quizzes WHERE user_id = (SELECT id FROM users WHERE email=${userId})`;

	return solvedQuizzes;
};
export const getTopTenRanking = async () => {
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

	return rankingData;
};
