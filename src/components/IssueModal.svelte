<script lang="ts">
	import Button from './Button.svelte';
	import QuestionIcon from './icons/QuestionIcon.svelte';
	let modal: EventTarget;
	let value = '';
	export let onClose: () => void;
	export let onSubmit: (value: string) => void;
	const handleSubmit = async () => {
		if (!value) return;
		onSubmit(value);
	};
</script>

<div
	class="modal"
	bind:this={modal}
	on:keydown={(e) => {
		if (e.key === 'Escape') {
			onClose();
		}
	}}
	on:click={(e) => {
		if (e.target === modal) {
			onClose();
		}
	}}
>
	<div class="modal-container">
		<div class="title">
			피드백 보내기
			<QuestionIcon style="margin-bottom:2px;" />
		</div>
		<textarea
			class="quiz-subscription"
			placeholder="퀴즈에 대한 자세한 설명과 개선 제안을 알려주세요."
			bind:value
		/>
		<Button primary classes="quiz-submit-button" disabled={!value} onclick={handleSubmit}
			>제출</Button
		>
	</div>
</div>

<style>
	.title {
		display: flex;
		align-items: center;
		gap: 2px;
		font-size: 20px;
		font-weight: 600;
		margin-bottom: 10px;
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
		background: rgba(0, 0, 0, 0.4);
	}
	.quiz-subscription {
		width: 100%;
		height: 166px;
		border-radius: 6px;
		border-color: #bdbdbd;
		padding: 10px;
		box-sizing: border-box;
	}
	:global(.quiz-submit-button) {
		height: 40px;
	}
	.modal-container {
		gap: 10px;
		height: fit-content;
		padding: 15px;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: white;
	}
</style>
