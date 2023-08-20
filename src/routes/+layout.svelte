<!-- src/routes/_layout.svelte -->
<script>
	import '../app.css';
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
		height: 100%;
		margin: 0;
	}
	main {
		height: 100%;
	}
</style>
