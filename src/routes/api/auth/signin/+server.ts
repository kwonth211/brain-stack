import { json } from '@sveltejs/kit';
import { sql } from '@vercel/postgres';

export async function POST({ request, cookies }) {
	const { user, account } = await request.json();
	const { id, name, email } = user;

	let userId = null;
	if (email) {
		userId = email;
	} else if (id) {
		userId = id;
	}

	if (!userId) {
		return json({ user }, { status: 404 });
	}

	const { rows: existingUsers } = await sql`SELECT * FROM users WHERE email=${userId}`;
	if (existingUsers.length === 0) {
		await sql`INSERT INTO users (email, name, type) VALUES (${userId}, ${name ?? ''}, ${
			account.provider
		})`;
	}

	return json({ user }, { status: 201 });
}
