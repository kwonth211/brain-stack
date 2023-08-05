<script lang="ts">
	import { fade } from 'svelte/transition';
	import Home from '$lib/Home.svelte';
</script>

<div class="container">
	<div in:fade>
		<Home on:click={() => {}} />
	</div>

	<!-- {#each data?.cart as { id, quantity } (id)}
		<div>{id} - {quantity}</div>
	{/each} -->
	<!-- <Footer /> -->
</div>

<style>
</style>
