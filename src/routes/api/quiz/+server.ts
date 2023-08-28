import { json } from '@sveltejs/kit';
import { sql } from '@vercel/postgres';

export async function POST({ request }: { request: Request }) {
	const { userEmail, quizId, answer, isCorrect, point } = await request.json();
	// const { userId, quizId, answer, isCorrect, point } = request.body;

	if (!userEmail || !quizId || answer === undefined || isCorrect === undefined || !point) {
		return json({ error: 'Bad Request.' }, { status: 400 });
	}

	const { rows: users } = await sql`SELECT id FROM users WHERE email=${userEmail}`;
	if (users.length === 0) {
		return json({ error: '유저를 찾을 수 없습니다.' }, { status: 404 });
	}
	const user_id = users[0].id;

	const { rows: existingQuizzes } =
		await sql`SELECT * FROM user_quizzes WHERE user_id=${user_id} AND quiz_id=${quizId}`;
	if (existingQuizzes.length > 0) {
		return json({ error: '이미 제출된 퀴즈입니다.' }, { status: 409 });
	}

	await sql`
        INSERT INTO user_quizzes (user_id, quiz_id, answer, is_correct, point, created_at)
        VALUES (${user_id}, ${quizId}, ${answer}, ${isCorrect}, ${point}, NOW())
    `;

	return json({ message: '퀴즈 결과가 저장되었습니다.' }, { status: 201 });
}
