import { json } from '@sveltejs/kit';
import { sql } from '@vercel/postgres';

export async function POST({ request, cookies }) {
	const user = await request.json();
	const { name, email } = user;

	const { rows: existingUsers } = await sql`SELECT * FROM users WHERE email=${email}`;

	if (existingUsers.length === 0) {
		await sql`INSERT INTO users (email, name) VALUES (${email}, ${name})`;
	}

	return json({ user }, { status: 201 });
}
