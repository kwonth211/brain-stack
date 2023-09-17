import { sql } from '@vercel/postgres';
import { json } from '@sveltejs/kit';

export async function GET(request) {
	const quizId = request.params.id;

	if (!quizId) {
		return json({ error: 'quizId is required' }, { status: 400 });
	}

	try {
		const { rows: correctAnswers } =
			await sql`SELECT COUNT(*) as correct_count FROM user_quizzes WHERE is_correct=true AND quiz_id=${quizId}`;
		const { rows: totalAnswers } =
			await sql`SELECT COUNT(*) as total_count FROM user_quizzes WHERE quiz_id=${quizId}`;

		const totalAnswer = Number(totalAnswers[0].total_count);
		const correctAnswer = Number(correctAnswers[0].correct_count);

		if (totalAnswer === 0) {
			return json({ correctRate: 0 }, { status: 200 });
		}

		const correctRate = (correctAnswer / totalAnswer) * 100;

		return json({ correctRate: correctRate.toFixed(2) }, { status: 200 });
	} catch (error: unknown) {
		if (error instanceof Error) {
			return json({ error: error.message }, { status: 500 });
		}
	}
}
