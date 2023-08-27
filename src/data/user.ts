export type User = {
	id: number;
	email: string;
	name: string;
	type: 'google' | 'kakao' | 'email';
	nickname: string | null;
};
