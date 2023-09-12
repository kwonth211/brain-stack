import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';
import path from 'path';
// import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			runtime: 'edge'
		}),
		// alias: {
		// 	$components: 'src/components'
		// }
		alias: {
			$components: path.resolve('./src/components'),
			$mock: path.resolve('./src/mocks'),
			$lib: path.resolve('./src/lib'),
			$types: path.resolve('./src/types')
		},
		// files: {
		// 	serviceWorker: 'src/service-worker.ts'
		// }
		serviceWorker: {
			register: false
		}
	}
};

export default config;
