import { SvelteKitAuth } from '@auth/sveltekit';
import GoogleProvider from '@auth/core/providers/google';
import KakaoProvider from '@auth/core/providers/kakao';
import NaverProvider from '@auth/core/providers/naver';
import {
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	KAKAO_CLIENT_ID,
	KAKAO_CLIENT_SECRET,
	NAVER_CLIENT_ID,
	NAVER_CLIENT_SECRET
} from '$env/static/private';
import axios from 'axios';
import Credentials from '@auth/core/providers/credentials';
import type { User } from './data/user';

export const handle = SvelteKitAuth({
	providers: [
		GoogleProvider({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET }),
		KakaoProvider({ clientId: KAKAO_CLIENT_ID, clientSecret: KAKAO_CLIENT_SECRET }),
		NaverProvider({ clientId: NAVER_CLIENT_ID, clientSecret: NAVER_CLIENT_SECRET }),
		Credentials({
			credentials: {
				email: { label: 'UserEmail' },
				password: { label: 'Password', type: 'password' },
				nickname: { label: 'Nickname' }
			},

			async authorize({ email, password }) {
				const response = await axios.post(
					'http://127.0.0.1:5173/api/auth/check',
					{
						email,
						password
					},
					{
						headers: { 'Content-Type': 'application/json' }
					}
				);

				if (response.status === 200) {
					const { user } = response.data as { user: User };
					return {
						id: String(user.id),
						name: user.name,
						email: user.email,
						nickname: 'test'
					};
				}

				return null;
			}
		})
	],
	callbacks: {
		async signIn({ user, account, profile }) {
			// custom credentials provider 일떄
			if (!profile) {
				return true;
			}

			await axios.post(
				'http://127.0.0.1:5173/api/auth/signin',
				{ profile: profile, account },
				{
					headers: { 'Content-Type': 'application/json' }
				}
			);

			return true;
		}
	}
});
