import type { Quiz } from '$types/quiz.js';
import { getRemainingQuizzes, getSolvedQuizzes, getTopTenRanking } from '$utils/server/utils.js';
import { error } from '@sveltejs/kit';
import { sql } from '@vercel/postgres';

export async function load({ url, params, locals }) {
	const quizId = Number(params.id);

	const categoryId = url.searchParams.get('category');
	const session = await locals.getSession();
	const userId = session?.user?.email;

	const { rows: currentQuiz } = await sql`SELECT * FROM quizzes WHERE id=${quizId}`;

	if (currentQuiz.length === 0) {
		throw error(404, {
			message: 'Not found'
		});
	}
	const solvedQuizzes = await getSolvedQuizzes({
		categoryId,
		userId
	});

	const remainingQuizzes = await getRemainingQuizzes({
		categoryId,
		solvedQuizzes
	});
	const nextQuizzes = remainingQuizzes.filter((q) => q.id !== quizId);

	const nextQuiz = nextQuizzes[Math.floor(Math.random() * nextQuizzes.length)];

	const correctCount = solvedQuizzes.filter((q) => q.is_correct).length;
	return {
		currentQuiz: currentQuiz[0] as Quiz,
		nextQuiz: nextQuiz as Quiz,
		isAlreadySolved: solvedQuizzes.some((q) => q.quiz_id === quizId),
		userAnswer: solvedQuizzes.find((q) => q.quiz_id === quizId)?.answer,
		unSolvedCount: remainingQuizzes.length,
		solvedCount: solvedQuizzes.length,
		correctCount: correctCount,
		streamed: {
			ranking: getTopTenRanking()
		}
	};
}
