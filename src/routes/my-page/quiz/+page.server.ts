import { sql } from '@vercel/postgres';

export async function load(event) {
	const session = await event.locals.getSession();
	if (!session?.user) {
		throw new Error('Unauthorized');
	}

	const { rows: existingUsers } = await sql`SELECT * FROM users WHERE email=${session.user.email}`;
	if (existingUsers.length === 0) {
		throw new Error('User not found');
	}

	const user = existingUsers[0];
	const userId = user.id;

	let query = `
		SELECT 
			uq.*, 
			q.*, 
			q.answer AS quiz_answer, 
			uq.answer AS user_answer
		FROM user_quizzes uq
		JOIN quizzes q ON uq.quiz_id = q.id
		WHERE uq.user_id=${userId}
	`;

	const conditions: string[] = [];
	if (event.url.searchParams.has('in-correct')) {
		conditions.push('uq.is_correct = false');
	} else if (event.url.searchParams.has('correct')) {
		conditions.push('uq.is_correct = true');
	}

	if (conditions.length > 0) {
		query += ' AND ' + conditions.join(' AND ');
	}

	const { rows: totalQuizzes } = await sql.query(query);

	return {
		totalQuizzes
	};
}
