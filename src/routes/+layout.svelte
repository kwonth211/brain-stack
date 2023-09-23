<!-- src/routes/_layout.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import { pwaInfo } from 'virtual:pwa-info';
	import GoogleAdsense from '$lib/GoogleAdSense.svelte';
	import { writable } from 'svelte/store';

	const documentHeight = () => {
		if (typeof window === 'undefined') {
			return;
		}

		const doc = document.documentElement;

		doc.style.setProperty('--doc-height', `${window.innerHeight}px`);
	};
	onMount(() => {
		documentHeight();
		window?.addEventListener('resize', documentHeight);
	});

	onMount(async () => {
		if (pwaInfo) {
			const { registerSW } = await import('virtual:pwa-register');

			registerSW({
				immediate: true,
				onRegistered(r: unknown) {
					// uncomment following code if you want check for updates
					// r && setInterval(() => {
					//    console.log('Checking for sw update')
					//    r.update()
					// }, 20000 /* 20s for testing purposes */)
				},
				onRegisterError(error: unknown) {
					console.log('SW registration error', error);
				}
			});
		}
	});

	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';
	export const promotionEnabled = writable(true);
</script>

<GoogleAdsense enabled={$promotionEnabled} />
<head>
	{@html webManifest}
</head>
<main>
	<slot />
</main>

<style>
	:global(body),
	:global(html) {
		height: 100vh;
		height: var(--doc-height);
		margin: 0;
	}
	main {
		height: 100%;
		position: relative;
	}
</style>
