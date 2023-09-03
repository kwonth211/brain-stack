<script lang="ts">
	import AdminConfirmCard from './AdminConfirmCard.svelte';
	export let close: () => void;
	let modal: EventTarget;
</script>

<div
	class="modal"
	bind:this={modal}
	on:keydown={() => {}}
	on:click={(e) => {
		if (e.target === modal) close();
	}}
>
	<AdminConfirmCard />
</div>

<style>
	.modal {
		position: fixed;
		bottom: 25%;
		left: -15px;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
