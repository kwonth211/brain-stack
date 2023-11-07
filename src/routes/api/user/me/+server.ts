import { json } from '@sveltejs/kit';
import { sql } from '@vercel/postgres';
import type { User } from '../../../../types/user';

export async function PATCH({ request, locals }) {
	const session = await locals.getSession();
	const email = session?.user?.email;
	const { nickname } = (await request.json()) as Partial<User>;

	if (!email || !nickname) {
		return json({ error: 'Bad Request.' }, { status: 400 });
	}

	const { rows: existingUsers } = await sql`SELECT * FROM users WHERE email=${email}`;

	if (existingUsers.length === 0) {
		return json({ error: '존재하지 않는 이메일 주소입니다.' }, { status: 404 });
	}

	let query = `UPDATE users SET `;
	const paramsToUpdate: string[] = [];
	const values: string[] = [];

	if (nickname) {
		paramsToUpdate.push(`nickname=$${paramsToUpdate.length + 1}`);
		values.push(nickname);
	}

	query += paramsToUpdate.join(', ');
	query += ` WHERE email=$${paramsToUpdate.length + 1}`;
	values.push(email);

	if (paramsToUpdate.length > 0) {
		await sql.query(query, values);
	}

	return json({ message: '유저 정보가 성공적으로 업데이트되었습니다.' }, { status: 200 });
}
