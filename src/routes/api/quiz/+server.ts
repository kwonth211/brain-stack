import { json } from '@sveltejs/kit';
import { sql } from '@vercel/postgres';

// TODO: Point 추가
export async function POST({ request }: { request: Request }) {
	const { userEmail, quizId, answer } = await request.json();

	if (!quizId || answer === undefined) {
		return json({ error: 'Bad Request.' }, { status: 400 });
	}

	const { rows: quizzes } = await sql`SELECT * FROM quizzes WHERE id=${quizId}`;

	const isCorrect = String(quizzes[0].answer) === String(answer);

	if (!userEmail) {
		await sql`
			INSERT INTO user_quizzes (quiz_id, answer, is_correct, created_at)
			VALUES (${quizId}, ${answer}, ${isCorrect}, NOW())
		`;
		return json({ message: '퀴즈 결과가 저장되었습니다.' }, { status: 201 });
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
        INSERT INTO user_quizzes (user_id, quiz_id, answer, is_correct, created_at)
        VALUES (${user_id}, ${quizId}, ${answer}, ${isCorrect}, NOW())
    `;

	return json({ message: '퀴즈 결과가 저장되었습니다.' }, { status: 201 });
}
