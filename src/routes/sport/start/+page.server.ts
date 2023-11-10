import { getRemainingQuizzes, getTopFiveRanking } from '$utils/server/utils';

const categoryId = '4';

export async function load({ locals }) {
	const session = await locals.getSession();
	const userEmail = session?.user?.email;

	const remainingQuizzes = await getRemainingQuizzes({
		userEmail,
		categoryId: categoryId
	});

	return {
		remainingQuizzes: remainingQuizzes,
		streamed: {
			ranking: getTopFiveRanking({ categoryId: categoryId })
		}
	};
}
