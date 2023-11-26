import { updateCategoryRanking } from '$utils/server/utils';
import { json } from '@sveltejs/kit';
import { sql } from '@vercel/postgres';

export async function POST({ request, locals }) {
	const { quizId, answer } = await request.json();

	const session = await locals.getSession();
	const userEmail = session?.user?.email;
	if (!quizId || answer === undefined) {
		return json({ error: 'Bad Request.' }, { status: 400 });
	}

	const { rows: quizzes } = await sql`SELECT * FROM quizzes WHERE id=${quizId}`;

	const quiz = quizzes[0];
	const isCorrect = String(quiz.answer) === String(answer);
	const categoryId = quiz.category_id;

	if (!userEmail) {
		await sql`
			INSERT INTO user_quizzes (quiz_id, answer, is_correct, created_at)
			VALUES (${quizId}, ${answer}, ${isCorrect}, NOW())
		`;
		return json({ message: '퀴즈 결과가 저장되었습니다.' }, { status: 201 });
	}

	const { rows: users } = await sql`SELECT id FROM users WHERE email=${userEmail}`;
	const user = users[0];
	if (users.length === 0) {
		return json({ error: '유저를 찾을 수 없습니다.' }, { status: 404 });
	}
	const userId = user.id;

	const { rows: existingQuizzes } =
		await sql`SELECT * FROM user_quizzes WHERE user_id=${userId} AND quiz_id=${quizId}`;

	if (existingQuizzes.length > 0) {
		return json({ error: '이미 제출된 퀴즈입니다.' }, { status: 409 });
	}

	await sql`
        INSERT INTO user_quizzes (user_id, quiz_id, answer, is_correct, created_at)
        VALUES (${userId}, ${quizId}, ${answer}, ${isCorrect}, NOW())
    `;

	updateCategoryRanking(userId, categoryId, isCorrect);

	return json({ message: '퀴즈 결과가 저장되었습니다.' }, { status: 201 });
}
