import { sveltekit } from '@sveltejs/kit/vite';
import dotenvExpand from 'dotenv-expand';
import { loadEnv, defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig(({ mode }) => {
	if (mode === 'development') {
		const env = loadEnv(mode, process.cwd(), '');
		dotenvExpand.expand({ parsed: env });
	}

	return {
		plugins: [sveltekit(), SvelteKitPWA({})]
	};
});
