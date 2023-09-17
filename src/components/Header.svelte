<script>
	import { goto } from '$app/navigation';
	import Divider from './Divider.svelte';
	import BackIcon from './icons/BackIcon.svelte';
	export let onClick = () => {
		goto('/main');
	};
	const goBack = () => {
		window.history.back();
	};
</script>

<header class="header" on:click={onClick} on:keydown={() => {}}>
	<div class="container">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="back-icon" on:click={goBack}>
			<BackIcon />
		</div>
		<div class="title">
			<slot />
		</div>
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
		height: var(--header-height);
		padding-left: 10px;
		padding-right: 10px;
	}
	.title {
		width: 100%;
		text-align: center;
		color: #000;
		text-align: center;
		font-family: Pretendard;
		font-size: 17px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}
	.header-placeholder {
		height: var(--header-height);
	}
</style>
