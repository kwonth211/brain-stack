<script lang="ts">
	import type { Quiz } from '$types/quiz';
	import Divider from './Divider.svelte';
	import Input from './Input.svelte';
	import ModalCloseIcon from './icons/ModalCloseIcon.svelte';

	export let close: () => void;
	export let quiz: Quiz;
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
	<div class="modal-content">
		<div class="modal-close">
			<ModalCloseIcon
				onClick={() => {
					close();
				}}
			/>
		</div>
		<div class="title">공유하기</div>
		<Divider />
		<Input placeholder="https://" value={`https://dual-brain.com/quiz/${quiz.id}`} />
	</div>
</div>

<style>
	.title {
		display: flex;
		align-items: center;
		gap: 2px;
		font-weight: 600;
		color: #000;
		text-align: center;
		font-family: Pretendard;
		font-size: 18px;
		font-style: normal;
		text-align: center;
		justify-content: center;
		line-height: 126.336%; /* 25.267px */
	}
	.modal {
		position: fixed;
		bottom: 25%;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 100;
		background: rgba(0, 0, 0, 0.4);
	}
	.modal-content {
		gap: 10px;
		height: fit-content;
		width: 240px;
		padding: 15px;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: white;
	}
	.modal-close {
		display: flex;
		justify-content: flex-end;
	}
</style>
