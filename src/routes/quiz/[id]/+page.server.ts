import type { Quiz } from '$types/quiz.js';
import { getRemainingQuizzes, getSolvedQuizzes, getAllRanking } from '$utils/server/utils.js';
import { error } from '@sveltejs/kit';
import { sql } from '@vercel/postgres';

export async function load({ url, params, locals }) {
	const quizId = Number(params.id);

	const categoryId = url.searchParams.get('category');
	const session = await locals.getSession();
	const userEmail = session?.user?.email;

	const { rows: currentQuiz } = await sql`SELECT * FROM quizzes WHERE id=${quizId}`;

	if (categoryId === '999' && !session?.user) {
		throw error(404, {
			message: 'Not found'
		});
	}
	if (currentQuiz.length === 0) {
		throw error(404, {
			message: 'Not found'
		});
	}
	const solvedQuizzes = await getSolvedQuizzes({
		categoryId,
		userId: userEmail
	});

	const remainingQuizzes = await getRemainingQuizzes({
		categoryId,
		userEmail
	});

	const correctCount = solvedQuizzes.filter((q) => q.is_correct).length;
	return {
		currentQuiz: currentQuiz[0] as Quiz,
		unSolvedCount: remainingQuizzes.length,
		isAlreadySolved: solvedQuizzes.some((q) => q.quiz_id === quizId),
		userAnswer: solvedQuizzes.find((q) => q.quiz_id === quizId)?.answer,
		solvedCount: solvedQuizzes.length,
		correctCount: correctCount
	};
}
