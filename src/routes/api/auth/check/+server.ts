import { json } from '@sveltejs/kit';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';

export async function POST({ request }: { request: Request }) {
	const { email, password } = await request.json();

	const { rows: existingUsers } = await sql`SELECT * FROM users WHERE email=${email}`;

	if (existingUsers.length === 0) {
		return json({ error: 'User not found' }, { status: 404 });
	}

	const user = existingUsers[0];

	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		return json({ error: 'Invalid password' }, { status: 401 });
	}

	return json({ user }, { status: 200 });
}
