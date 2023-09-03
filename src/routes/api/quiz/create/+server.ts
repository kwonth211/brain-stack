import { json } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import { NAVER_LOGIN_ID, NAVER_LOGIN_PW } from '$env/static/private';

export async function POST({ request }: { request: Request }) {
	const { question, option1, option2, option3, option4, answer } = await request.json();

	if (!question || !option1 || !option2 || !option3 || !option4 || !answer) {
		return json({ error: '모든 필드를 입력해주세요.' }, { status: 400 });
	}

	const transporter = nodemailer.createTransport({
		service: 'Naver',
		auth: {
			user: NAVER_LOGIN_ID,
			pass: NAVER_LOGIN_PW
		}
	});

	// todo 실제 유저인지 파악하기

	const mailOptions = {
		from: 'kwonth211@naver.com',
		to: 'kwonth211@naver.com',
		subject: '퀴즈를 누군가가 요청했어요.',
		text: `새로운 퀴즈가 생성되었습니다.\n\n문제: ${question}\n옵션1: ${option1}\n옵션2: ${option2}\n옵션3: ${option3}\n옵션4: ${option4}\n정답: ${answer}`
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
			return json({ error: '메일을 보내는 데 실패했습니다.' }, { status: 500 });
		} else {
			console.log('Email sent: ' + info.response);
		}
	});

	return json({ message: '관리자에게 메일이 발송되었습니다.' }, { status: 201 });
}
