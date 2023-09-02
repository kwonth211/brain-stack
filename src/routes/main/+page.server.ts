import { json } from '@sveltejs/kit';
import { sql } from '@vercel/postgres';
import type { User } from '../../data/user';

export async function load({ locals, request }: { request: Request }) {
	const session = await locals.getSession();

	const { rows: existingUsers } = await sql`SELECT * FROM users WHERE email=${session.user.email}`;

	if (existingUsers.length === 0) {
		return json({ error: 'User not found' }, { status: 404 });
	}

	const user = existingUsers[0];

	return { user: user as User };
}
