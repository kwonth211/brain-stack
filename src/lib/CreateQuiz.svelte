<!-- CreateQuiz.svelte -->
<script lang="ts">
	import AdminConfirmModal from '$components/AdminConfirmModal.svelte';
	import Button from '$components/Button.svelte';
	import axios from 'axios';

	let question = '';
	let option1 = '';
	let option2 = '';
	let option3 = '';
	let option4 = '';
	let correctOption = '';
	let isModalOpen = false;

	const onClear = () => {
		question = '';
		option1 = '';
		option2 = '';
		option3 = '';
		option4 = '';
		correctOption = '';
	};

	const createQuiz = async () => {
		await axios.post('/api/quiz/create', {
			question,
			option1,
			option2,
			option3,
			option4,
			answer: correctOption
		});
		isModalOpen = true;
		onClear();
	};
	const closeModal = () => {
		isModalOpen = false;
	};
	$: disabled =
		question === '' ||
		option1 === '' ||
		option2 === '' ||
		option3 === '' ||
		option4 === '' ||
		correctOption === '';

	const handleChange = (e: Event) => {
		const value = (e.target as HTMLInputElement).value;

		if (isNaN(Number(value)) || ![1, 2, 3, 4].includes(Number(value))) {
			correctOption = '';
		}
	};
</script>

<div class="container">
	<div class="question-container">
		<input
			type="text"
			placeholder="퀴즈 문제를 입력해주세요."
			bind:value={question}
			autofocus
			class="question-input"
		/>
	</div>

	<div class="options-container">
		<input type="text" placeholder="옵션 1" bind:value={option1} class="option-input" />
		<input type="text" placeholder="옵션 2" bind:value={option2} class="option-input" />
		<input type="text" placeholder="옵션 3" bind:value={option3} class="option-input" />
		<input type="text" placeholder="옵션 4" bind:value={option4} class="option-input" />
	</div>

	<div class="correct-option-container">
		<input
			type="text"
			placeholder="정답 번호(1~4까지 입력해주세요)"
			maxlength="1"
			pattern="[1-4]"
			bind:value={correctOption}
			on:input={handleChange}
			class="correct-option-input"
		/>
		<Button onclick={createQuiz} classes="create-quiz-button" primary buttonType="submit" {disabled}
			>퀴즈 만들기</Button
		>
	</div>

	{#if isModalOpen}
		<AdminConfirmModal close={closeModal} />
	{/if}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: calc(100% - 39px);
		padding: 16px;
		box-sizing: border-box;
	}
	.question-input {
		height: 39px;
		border: none;
		width: 100%;
		font-size: 19px;
	}

	.question-container {
		width: 100%;
		height: 400px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.options-container {
		width: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		gap: 8px;
	}
	.correct-option-container {
		width: 100%;
		bottom: 0px;
		position: absolute;
		padding: 10px 17px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.option-input,
	.correct-option-input {
		width: 100%;
		font-family: Pretendard;
		font-size: 15px;
		border: 1px solid #ccc;
		border-radius: 34px;
		padding: 12px;
		box-sizing: border-box;
		font-weight: 400;
	}
	button {
		padding: 10px 20px;
		font-size: 16px;
		background-color: #5387f7;
		color: white;
		border: none;
		border-radius: 8px;
		cursor: pointer;
	}
	:global(.create-quiz-button) {
		height: var(--button-height);
	}
</style>
