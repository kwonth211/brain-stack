<!-- Quiz.svelte -->
<script lang="ts">
	import type { Quiz } from '../types/quiz';
	import ResultModal from './ResultModal.svelte';
	import Button from '$components/Button.svelte';
	import ProgressBar from '$components/ProgressBar.svelte';
	import { onMount } from 'svelte';
	import {} from 'svelte/transition';
	import { fade, fly } from 'svelte/transition';

	export let quiz: Quiz;
	export let onNext = () => {};
	export let quizzes: Quiz[];
	const options = [quiz.option1, quiz.option2, quiz.option3, quiz.option4];
	let selectedOption: number | null = null;

	let displayQuestion = '';
	let index = 0;

	onMount(() => {
		typeQuestion();
	});

	const typeQuestion = () => {
		if (index < quiz.question.length) {
			displayQuestion += quiz.question[index];
			index++;
			setTimeout(typeQuestion, 50);
		} else {
		}
	};

	let optionsShown: string[] = [];

	onMount(() => {
		typeQuestion();
		setTimeout(() => {
			optionsShown = options;
		}, quiz.question.length * 50);
	});

	let isModalOpen = false;
	let answerIsCorrect = false;

	const checkAnswer = (_selectedOption: number) => {
		if (selectedOption) {
			return;
		}

		answerIsCorrect = _selectedOption === quiz.answer;
		selectedOption = _selectedOption;

		isModalOpen = true;
	};
	const closeModal = () => {
		isModalOpen = false;
		// onNext();
	};

	$: getButtonClassName = (index: number) => {
		if (!selectedOption) {
			return '';
		}
		if (index + 1 === quiz.answer) {
			return 'correct';
		}
		if (index + 1 === quiz.answer && index + 1 === selectedOption) {
			return 'correct';
		} else if (index + 1 === selectedOption) {
			return 'incorrect';
		} else {
			return 'neutral';
		}
	};
</script>

<div in:fade class="container">
	<div class="status-wrapper">
		<div class="progressbar-container">
			<ProgressBar progress={20} />
			<div
				class={`${
					quiz.difficulty === 'Easy'
						? 'easy'
						: quiz.difficulty === 'Medium'
						? 'medium'
						: quiz.difficulty === 'Hard'
						? 'hard'
						: ''
				} difficulty-chip`}
			>
				{quiz.difficulty}
			</div>
		</div>
		{1}/{quizzes.length} 맞은문제/푼문제
	</div>
	<div class="question-container">
		<div class="question chat-style">
			<div class="q-mark">Q.</div>
			<span
				>{displayQuestion}
				<span class="blink" />
			</span>
		</div>
	</div>

	{#if selectedOption}
		<div
			class="next-button-wrapper"
			in:fade
			on:click={() => {
				setTimeout(() => {
					onNext();
				}, 500);
			}}
			on:keydown={() => {}}
		>
			>> 다음 문제
		</div>
	{/if}

	{#if isModalOpen}
		<ResultModal
			isCorrect={answerIsCorrect}
			explanation={quiz.explanation}
			close={closeModal}
			answer={quiz.answer}
		/>
	{/if}

	<div class="button-container">
		{#each optionsShown as option, index}
			<div style="width: 100%;" in:fly={{ y: 100, delay: index * 500 }}>
				<Button
					primary
					type="outlined"
					onclick={() => checkAnswer(index + 1)}
					classes={getButtonClassName(index)}
				>
					<div class="button-content">
						<span class="number">{index + 1}.</span>
						<span class="text">{option}</span>
					</div>
				</Button>
			</div>
		{/each}
	</div>
</div>

<style>
	.next-button-wrapper {
		position: absolute;
		right: 16px;
		top: 50%;
		transform: translateY(-50%);
		z-index: 2;
		padding: 8px 12px;
		cursor: pointer;
		transition: background-color 0.3s;
		color: #797979;
	}

	.question.chat-style {
		height: 382px;
		padding: 10px;
		border-radius: 15px;
		display: inline-flex;
		align-items: center;
		position: relative;
		box-sizing: border-box;
	}

	.blink {
		border-right: 4px solid rgba(0, 0, 0, 0.6);
		animation: blinking 1s infinite;
		height: 20px;
		vertical-align: middle; /* 이 부분 추가 */
		margin-bottom: 4px;
	}

	@keyframes blinking {
		0% {
			opacity: 0;
		}
		49% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
	}

	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: calc(100% - 39px);
		padding: 16px;
		box-sizing: border-box;
	}
	.question-container {
		color: #000;
		font-family: Pretendard;
		font-size: 22px;
		font-style: normal;
		font-weight: 500;
		line-height: 22px;
		letter-spacing: -0.408px;
		justify-content: flex-start; /* 추가 */
	}
	.question {
		word-break: break-word;
		position: relative;
		overflow: hidden;
	}
	.question span {
		display: inline-block;
	}
	.question-container .q-mark {
		color: #5387f7;
		font-weight: bold;

		margin-right: 15px;
	}
	.q-mark {
		flex-shrink: 0; /* 추가 */
	}

	.button-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 10px;
		width: 100%;
		gap: 8px;
		height: 100%;
		overflow: hidden;
	}
	.progressbar-container {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-bottom: 10px;
		width: 100%;
		gap: 8px;
	}
	.difficulty-chip {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 34px;
		height: 30px;
		border-radius: 12.5px;
		padding-left: 4px;
		padding-right: 4px;
		font-family: Pretendard;
		font-size: 11px;
		font-style: normal;
		font-weight: 400;
		line-height: 22px;
		border-radius: 8px;
	}
	.difficulty-chip.easy {
		background-color: #e8f5e9;
		color: #66bb6a;
	}
	.difficulty-chip.medium {
		background-color: #fff4e5;
		color: #ffa64d;
	}
	.difficulty-chip.hard {
		background-color: #ffeef0;
		color: #ff4c4c;
	}
	.status-wrapper {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.button-container :global(.btn) {
		min-height: 60px;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding: 10px;

		font-family: Pretendard;
		font-size: 15px;
		font-style: normal;
		font-weight: 400;
		line-height: 22px;
		letter-spacing: -0.408px;
		justify-content: flex-start;
		align-items: stretch;
	}
	.button-content {
		display: flex;
		align-items: center;
		width: 100%;
	}
	.button-container .number {
		width: 30px;
	}
	/* FIXME: important 없애기 */
	:global(.correct) {
		background-color: #5387f7 !important;
		color: white !important;
	}

	:global(.incorrect) {
		background-color: #ff7971 !important;
		color: white !important;
	}

	:global(.neutral),
	:global(.correct-neutral) {
		background-color: #c5c5c5 !important;
		color: white !important;
	}

	@keyframes buttonClick {
		0% {
			transform: translateY(-50%) scale(1);
		}
		50% {
			transform: translateY(-50%) scale(0.95);
		}
		100% {
			transform: translateY(-50%) scale(1);
		}
	}
	@keyframes slideRight {
		from {
			transform: translateY(-50%) translateX(10px);
			opacity: 0.5;
		}
		to {
			transform: translateY(-50%) translateX(20px);
			opacity: 1;
		}
	}

	.next-button-wrapper:active,
	.next-button-wrapper:hover {
		animation: slideRight 0.5s forwards;
	}
</style>
