import { getRemainingQuizzes } from '$utils/server/utils.js';
import { json } from '@sveltejs/kit';

export async function GET(request) {
	const session = await request.locals.getSession();
	const userEmail = session?.user?.email;
	const categoryId = request.url.searchParams.get('categoryId');

	try {
		const remainingQuizzes = await getRemainingQuizzes({
			userEmail,
			categoryId
		});
		return json({ remainingQuizzes }, { status: 200 });
	} catch (error) {
		return json({ error: '알수없는 오류가 발생했습니다,' }, { status: 500 });
	}
}
