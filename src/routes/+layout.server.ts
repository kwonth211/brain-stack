import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

const ONLY_ACCESS_USER_PATHS = ['/main', '/profile', '/my-page', '/quiz/create'];

export const load: LayoutServerLoad = async (event) => {
	const session = await event.locals.getSession();
	if (session && event.url.pathname === '/signin') {
		throw redirect(303, '/');
	}
	if (!session && ONLY_ACCESS_USER_PATHS.includes(event.url.pathname)) {
		throw redirect(303, '/signin');
	}

	if (event.url.pathname === '/main') {
		throw redirect(303, '/');
	}

	return {
		session
	};
};
