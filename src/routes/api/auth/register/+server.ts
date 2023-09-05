import { json } from '@sveltejs/kit';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import axios from 'axios';

export async function POST({ request }: { request: Request }) {
	const { name, email, password } = await request.json();

	if (!email || !password || !name) {
		return json({ error: '모든 필드를 입력해주세요.' }, { status: 400 });
	}

	const { rows: existingUsers } = await sql`SELECT * FROM users WHERE email=${email}`;
	let nickname = null;

	if (existingUsers.length > 0) {
		return json({ error: '이미 사용 중인 이메일 주소입니다.' }, { status: 409 });
	}

	const randomNicknameResponse = await axios.get(
		'https://nickname.hwanmoo.kr/?format=json&count=2'
	);

	if (randomNicknameResponse.data.words) {
		nickname = randomNicknameResponse.data.words[0];
	}

	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(password, saltRounds);

	await sql`INSERT INTO users (email, name, password, type, nickname) VALUES (${email}, ${name}, ${hashedPassword}, 'email', ${
		nickname ?? ''
	})`;

	return json({ message: '회원 가입이 완료되었습니다.' }, { status: 201 });
}
