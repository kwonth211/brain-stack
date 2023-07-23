<!-- src/routes/_layout.svelte -->
<script>
	import '../app.css';
</script>

<main>
	<slot />
</main>

<style>
	:global(body) {
		margin: 0;
	}
	main {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		/* padding: 1em; */
		box-sizing: border-box;
	}
</style>
