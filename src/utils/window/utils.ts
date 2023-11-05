import { axios } from '$lib/axios';
import type { StorageQuizType } from './interface';

export const REMAIN_QUIZ_KEY = 'remainingQuizzes';

export const dequeueFromRemainingQuizzes = async ({
	categoryId
}: {
	categoryId?: number | null;
}) => {
	const remainingQuizzes = await getRemainingQuizzes({ categoryId });

	const dequeuedValue = remainingQuizzes.shift();

	localStorage.setItem(REMAIN_QUIZ_KEY, JSON.stringify(remainingQuizzes));
	return dequeuedValue;
};

export const getRemainingQuizzes = async ({ categoryId }: { categoryId?: number | null }) => {
	const remainingQuizzes = localStorage.getItem(REMAIN_QUIZ_KEY);
	if (!remainingQuizzes) {
		const { data } = await axios.get('/api/quiz/remain', {
			params: {
				categoryId
			}
		});
		const { remainingQuizzes } = data as { remainingQuizzes: StorageQuizType };

		localStorage.setItem(REMAIN_QUIZ_KEY, JSON.stringify(remainingQuizzes));

		return remainingQuizzes;
	}
	const result = JSON.parse(remainingQuizzes) as StorageQuizType;

	return categoryId ? result.filter((q) => q.category_id === categoryId) : result;
};

export const setRemainingQuizzes = (remainingQuizzes: StorageQuizType) => {
	localStorage.setItem(REMAIN_QUIZ_KEY, JSON.stringify(remainingQuizzes));
};

export const clearRemainingQuizzes = () => {
	localStorage.removeItem(REMAIN_QUIZ_KEY);
};
