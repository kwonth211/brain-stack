<script>
	export let title = '';
	export let description = '';
	export let image = '';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />

	{#if image}
		<meta property="og:image" content={image} />
		<meta property="twitter:image" content={image} />
	{/if}
</svelte:head>
