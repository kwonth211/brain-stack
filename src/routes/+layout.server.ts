import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const session = await event.locals.getSession();
	if (session && event.url.pathname === '/') {
		throw redirect(303, '/main');
	}
	if (!session && event.url.pathname !== '/main') {
		throw redirect(303, '/');
	}

	return {
		session
	};
};
