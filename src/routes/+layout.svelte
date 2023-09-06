<!-- src/routes/_layout.svelte -->
<script>
	import { onMount } from 'svelte';
	import '../app.css';

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
</script>

<head>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
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
