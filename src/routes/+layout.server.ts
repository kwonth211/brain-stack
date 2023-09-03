import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { dev } from '$app/environment';
import { inject } from '@vercel/analytics';

inject({ mode: dev ? 'development' : 'production' });

const ONLY_ACCESS_USER_PATHS = ['/main', '/profile', '/my-page', '/quiz/create'];

export const load: LayoutServerLoad = async (event) => {
	const session = await event.locals.getSession();
	if (session && event.url.pathname === '/') {
		throw redirect(303, '/main');
	}
	if (!session && ONLY_ACCESS_USER_PATHS.includes(event.url.pathname)) {
		throw redirect(303, '/');
	}

	return {
		session
	};
};
