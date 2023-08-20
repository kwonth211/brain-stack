<script lang="ts">
	import { fade } from 'svelte/transition';
	import Home from '$lib/Home.svelte';
</script>

<div class="container" in:fade>
	<Home on:click={() => {}} />

	<!-- {#each data?.cart as { id, quantity } (id)}
		<div>{id} - {quantity}</div>
	{/each} -->
	<!-- <Footer /> -->
</div>

<style>
	.container {
		height: 100%;
	}
</style>
