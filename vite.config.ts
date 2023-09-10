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
		plugins: [
			sveltekit(),
			// SvelteKitPWA({
			// 	includeAssets: ['favicon.ico', 'favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
			// 	manifest: {
			// 		name: 'dual-brain',
			// 		short_name: 'dual-brain',
			// 		start_url: '/',
			// 		scope: '/',
			// 		icons: [
			// 			{
			// 				src: '/favicon.png',
			// 				sizes: '192x192',
			// 				type: 'image/png'
			// 			},
			// 			{
			// 				src: '/favicon.png',
			// 				sizes: '384x384',
			// 				type: 'image/png'
			// 			}
			// 		],
			// 		theme_color: '#5387f7',
			// 		background_color: '#5387f7',
			// 		display: 'standalone'
			// 	}
			// })
			SvelteKitPWA({
				srcDir: './src',
				mode: 'development',
				strategies: 'generateSW',
				scope: '/',
				base: '/',
				manifest: {
					short_name: 'dual-brain',
					name: 'dual-brain',
					start_url: '/',
					scope: '/',
					display: 'standalone',
					theme_color: '#ffffff',
					background_color: '#ffffff',
					icons: [
						{
							src: '/pwa-192x192.png',
							sizes: '192x192',
							type: 'image/png'
						},
						{
							src: '/pwa-512x512.png',
							sizes: '512x512',
							type: 'image/png'
						},
						{
							src: '/pwa-512x512.png',
							sizes: '512x512',
							type: 'image/png',
							purpose: 'any maskable'
						}
					]
				},

				devOptions: {
					enabled: true,
					suppressWarnings: process.env.SUPPRESS_WARNING === 'true',
					type: 'module',
					navigateFallback: '/'
				},
				// if you have shared info in svelte config file put in a separate module and use it also here
				kit: {}
			})
		]
	};
});
