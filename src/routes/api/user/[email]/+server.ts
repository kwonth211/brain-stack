import { json } from '@sveltejs/kit';
import { sql } from '@vercel/postgres';

export async function PATCH({ request, params, ...rest }: { request: Request }) {
	const { email } = params;
	const { name, nickname } = (await request.json()) as Partial<User>;

	const { rows: existingUsers } = await sql`SELECT * FROM users WHERE email=${email}`;

	if (existingUsers.length === 0) {
		return json({ error: '존재하지 않는 이메일 주소입니다.' }, { status: 404 });
	}

	let query = `UPDATE users SET `;
	let paramsToUpdate = [];
	let values = [];

	if (name) {
		paramsToUpdate.push(`name=$${paramsToUpdate.length + 1}`);
		values.push(name);
	}
	if (nickname) {
		paramsToUpdate.push(`nickname=$${paramsToUpdate.length + 1}`);
		values.push(nickname);
	}

	query += paramsToUpdate.join(', ');
	query += ` WHERE email=$${paramsToUpdate.length + 1}`;
	values.push(email);

	if (paramsToUpdate.length > 0) {
		await sql.query(query, values);
		console.log(query);
		console.log(values);
	}

	return json({ message: '유저 정보가 성공적으로 업데이트되었습니다.' }, { status: 200 });
}
