import { json } from '@sveltejs/kit';
import { sql } from '@vercel/postgres';
import axios from 'axios';

export async function POST({ request, cookies }) {
	const { profile, account } = await request.json();

	const { id, name: oAuthName, email, response } = profile;

	let userId = null;
	let name = null;
	let nickname = null;
	if (email) {
		userId = email;
	} else if (id) {
		userId = id;
	} else if (account?.providerAccountId) {
		userId = account.providerAccountId;
	}

	if (oAuthName) {
		name = oAuthName;
	}

	// naver format
	if (response) {
		if (response.nickname) {
			nickname = response.nickname;
		}
		if (response.name) {
			name = response.name;
		}
	}

	if (!userId) {
		return json({ user: profile }, { status: 404 });
	}

	const { rows: existingUsers } = await sql`SELECT * FROM users WHERE email=${userId}`;
	if (existingUsers.length === 0) {
		if (!nickname) {
			const randomNicknameResponse = await axios.get(
				'https://nickname.hwanmoo.kr/?format=json&count=2'
			);

			if (randomNicknameResponse.data.words) {
				nickname = randomNicknameResponse.data.words[0];
			}
		}

		await sql`INSERT INTO users (email, name, nickname, type) VALUES (${userId}, ${name ?? ''}, ${
			nickname ?? ''
		}, ${account.provider})`;
	}

	return json({ user: profile }, { status: 201 });
}
