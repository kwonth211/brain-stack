<script>
	import { fade } from 'svelte/transition';
	import Home from '$lib/Home.svelte';
</script>

<div class="container">
	<div in:fade>
		<Home on:click={() => {}} />
	</div>
	<!-- <Footer /> -->
</div>

<style>
</style>
