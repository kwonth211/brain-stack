import { sql } from '@vercel/postgres';

export async function load(event) {
	const categoryId = event.url.searchParams.get('category');
	const session = await event.locals.getSession();
	const userId = session?.user?.email;

	try {
		const { rows: solvedQuizzes } = categoryId
			? await sql`SELECT quiz_id, is_correct FROM user_quizzes WHERE user_id = (SELECT id FROM users WHERE email=${userId}) AND quiz_id IN (SELECT id FROM quizzes WHERE category_id=${categoryId})`
			: await sql`SELECT quiz_id, is_correct FROM user_quizzes WHERE user_id = (SELECT id FROM users WHERE email=${userId})`;

		let query = `SELECT * FROM quizzes`;
		const conditions: string[] = [];
		const values: string[] = [];

		if (categoryId) {
			conditions.push(`category_id=$${values.length + 1}`);
			values.push(categoryId);
		}

		conditions.push('category_id != 12');

		if (solvedQuizzes.length > 0) {
			const quizIds = solvedQuizzes.map((q) => q.quiz_id);
			conditions.push(
				`id NOT IN (${quizIds.map((_, i) => `$${values.length + i + 1}`).join(', ')})`
			);
			values.push(...quizIds);
		}

		if (conditions.length > 0) {
			query += ' WHERE ' + conditions.join(' AND ');
		}

		const { rows: unsolvedQuizzes } = await sql.query(query, values);
		const totalCount = solvedQuizzes.length + unsolvedQuizzes.length;
		const correctQuiz = solvedQuizzes.filter((q) => q.is_correct);
		return {
			solvedCount: solvedQuizzes.length,
			totalCount: totalCount,
			unsolvedQuizzes: unsolvedQuizzes,
			correctCount: correctQuiz.length
		};
	} catch (error: unknown) {
		if (error instanceof Error) {
			throw new Error(error.message);
		}
	}
}
