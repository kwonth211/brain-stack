import { json } from '@sveltejs/kit';
import { sql } from '@vercel/postgres';
import OpenAI from 'openai';
import { OPEN_API_KEY } from '$env/static/private';

const openai = new OpenAI({
	apiKey: OPEN_API_KEY
});

export async function GET(request) {
	// path varaible 가져오기
	const quizId = request.params.id;

	try {
		const { rows: quizzes } = await sql`SELECT * FROM quizzes WHERE id=${quizId}`;
		const quiz = quizzes[0];
		if (!quiz) {
			return json({ error: '퀴즈를 찾을 수 없습니다.' }, { status: 404 });
		}

		const options = [quiz.option1, quiz.option2, quiz.option3, quiz.option4];
		const prompt = `${quiz.question} 의 정답이 ${
			options[quiz.answer - 1]
		}인 이유에대해서 정답에 대한 설명은 필요없고, 친절한말투로 이유에 대해서만 설명해주고 1~2문장으로 짧게 요약해서 설명해줘  `;
		const chatCompletion = await openai.chat.completions.create({
			messages: [
				{
					role: 'user',
					content: prompt
				}
			],
			model: 'gpt-3.5-turbo'
		});
		return json({ explanation: chatCompletion.choices[0].message.content }, { status: 200 });
	} catch (error) {
		return json({ error: '알수없는 오류가 발생했습니다,' }, { status: 500 });
	}
}
