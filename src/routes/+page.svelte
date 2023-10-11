<script lang="ts">
	import Main from '$lib/Main.svelte';
	import { fade } from 'svelte/transition';
</script>

<div class="container" in:fade>
	<Main />
</div>

<style>
	.container {
		height: 100%;
	}
</style>
