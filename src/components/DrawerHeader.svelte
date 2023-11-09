<script>
	import { goto } from '$app/navigation';
	import Divider from './Divider.svelte';
	import BackIcon from './icons/BackIcon.svelte';
	import Hamburger from './icons/Hamburger.svelte';

	export let hasBack = true;
	export let onClick = () => {
		// goto('/main');
	};
	const goBack = () => {
		window.history.back();
	};
</script>

<header class="header" on:click={onClick} on:keydown={() => {}}>
	<div class="container">
		<slot />
		<!-- <Hamburger /> -->
	</div>
	<Divider />
</header>
<div class="header-placeholder" />

<style>
	.header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background-color: white;
		z-index: 1000; /* Ensure the header is above other elements */
	}
	.container {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		height: var(--header-height);
		padding-left: 10px;
		padding-right: 21px;
	}
	.header-placeholder {
		height: var(--header-height);
	}
</style>
