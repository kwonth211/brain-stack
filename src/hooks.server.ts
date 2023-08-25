import { SvelteKitAuth } from '@auth/sveltekit';
import GoogleProvider from '@auth/core/providers/google';
import KakaoProvider from '@auth/core/providers/kakao';
import {
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	KAKAO_CLIENT_ID,
	KAKAO_CLIENT_SECRET
} from '$env/static/private';
import axios from 'axios';
// import { type Adapter } from '@auth/core/adapters';

export const handle = SvelteKitAuth({
	providers: [
		GoogleProvider({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET }),
		KakaoProvider({ clientId: KAKAO_CLIENT_ID, clientSecret: KAKAO_CLIENT_SECRET })
	],
	callbacks: {
		async signIn({ user, account, profile }) {
			await axios.post(
				'http://127.0.0.1:5173/api/auth/signin',
				{ user: profile },
				{
					headers: { 'Content-Type': 'application/json' }
				}
			);

			return true;
		}
	}
});
