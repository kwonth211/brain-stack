import { getRemainingQuizzes, getTopFiveRanking } from '$utils/server/utils';

const categoryId = '1';
export async function load({ locals }) {
	const session = await locals.getSession();
	const userEmail = session?.user?.email;

	const remainingQuizzes = await getRemainingQuizzes({
		userEmail,
		categoryId
	});

	return {
		remainingQuizzes: remainingQuizzes,
		streamed: {
			ranking: getTopFiveRanking({
				categoryId
			})
		}
	};
}
