<script lang="ts">
	let scriptTag: any;

	$: if (scriptTag)
		scriptTag.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
</script>

<svelte:head>
	<script data-ad-client="ca-pub-3415763008354504" async bind:this={scriptTag}></script>
</svelte:head>
