import { getPopularQuizzes } from '$utils/server/quiz/utils.js';
import { getRemainingQuizzes } from '$utils/server/utils';

import { error, json } from '@sveltejs/kit';

export async function load({ locals, params }) {
	const session = await locals.getSession();
	const category = params.category as keyof typeof categoryMap;
	const userEmail = session?.user?.email;

	const categoryMap = {
		common: 0,
		science: 1,
		history: 2,
		sport: 4,
		tech: 6,
		geography: 8,
		idiom: 13,
		animal: 14
	};
	const categoryId = categoryMap[category];
	const categoryNameMap = {
		common: '전체',
		science: '과학',
		history: '역사',
		sport: '스포츠',
		tech: '기술',
		geography: '지리',
		idiom: '사자성어',
		animal: '동물'
	};

	if (categoryMap[category] === undefined) {
		throw error(404, {
			message: 'Not found'
		});
	}

	return {
		name: categoryNameMap[category],
		categoryId,
		streamed: {
			remainingQuizzes: getRemainingQuizzes({
				userEmail,
				categoryId: String(categoryMap[category])
			}),
			popularQuizzes: getPopularQuizzes(categoryMap[category] ?? 0)
		}
	};
}
