export type User = {
	id: number;
	name: string;
	email: string;
	type: 'google' | 'kakao' | 'email' | 'naver';
	nickname: string | null;
};
