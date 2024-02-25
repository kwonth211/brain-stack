<script lang="ts">
	import Button from './Button.svelte';
	import { goto } from '$app/navigation';

	export let close: () => void;
	export let onConfirm: () => void;
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
	<div class="container">
		<p>잠깐! 퀴즈의 진행 상황은 <br />저장되지 않아요. <br /><br />그래도 계속 진행하시겠어요?</p>
		<div class="button-container">
			<Button
				classes="cancel"
				gray
				size="sm"
				type="filled"
				onclick={() => {
					onConfirm();
				}}>계속</Button
			>
			<Button
				classes="submit"
				primary
				size="sm"
				onclick={() => {
					close();
					goto('/signin');
				}}>로그인</Button
			>
		</div>
	</div>
</div>

<style>
	.modal {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.4); /* 뒷 배경에 약간의 어두움 추가 */
		max-width: var(--max-width);
		margin: 0 auto;
		right: 0px;
	}
	.container {
		width: 200px;
		padding: 20px;
		background-color: white;
		border-radius: 8px;
		box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.2);
		text-align: center;

		font-family: Pretendard;
		font-size: 15px;
		font-style: normal;
		font-weight: 500;
	}
	p {
		margin-bottom: 20px;
	}
	.button-container {
		display: flex;
		justify-content: flex-end;
		float: right;
		gap: 10px;
		width: 130px;
		height: 39px;
	}
	:global(.submit) {
		width: 160px !important;
		height: 39px;
	}
</style>
