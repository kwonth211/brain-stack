<!-- Quiz.svelte -->
<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { Quiz } from '../types/quiz';
	import ResultModal from './ResultModal.svelte';
	import Button from '$components/Button.svelte';
	import ProgressBar from '$components/ProgressBar.svelte';
	import { onMount } from 'svelte';

	export let quiz: Quiz;
	const options = [quiz.option1, quiz.option2, quiz.option3, quiz.option4];

	let displayQuestion = '';
	let index = 0;

	onMount(() => {
		typeQuestion();
	});

	let cursor: HTMLElement; // 추가한 부분

	const typeQuestion = () => {
		if (index < quiz.question.length) {
			displayQuestion += quiz.question[index];
			index++;
			setTimeout(typeQuestion, 50);
		} else {
			// cursor.style.display = 'none'; // 타이핑이 끝나면 커서 숨기기
		}
	};

	let isModalOpen = false;
	let answerIsCorrect = false;

	const checkAnswer = (_selectedOption: number) => {
		answerIsCorrect = _selectedOption === quiz.answer;
		isModalOpen = true;
	};
</script>

<div in:fade class="container">
	<div class="status-wrapper">
		<div class="progressbar-container">
			<ProgressBar progress={20} />
			<div class="grade-chip">현재 {3}등</div>
		</div>
		{1}/{10} 맞은 개수 {1}개
	</div>
	<div class="question-container">
		<div class="question chat-style">
			<div class="q-mark">Q.</div>
			<span
				>{displayQuestion}
				<span class="blink" bind:this={cursor} />
			</span>
		</div>
	</div>

	{#if isModalOpen}
		<ResultModal
			isCorrect={answerIsCorrect}
			explanation={quiz.explanation}
			close={() => (isModalOpen = false)}
			answer={quiz.answer}
		/>
	{/if}

	<div class="button-container">
		{#each options as option, index}
			<Button primary type="outlined" onclick={() => checkAnswer(index + 1)}>
				<div class="button-content">
					<span class="number">{index + 1}.</span>
					<span class="text">{option}</span>
				</div>
			</Button>
		{/each}
	</div>
</div>

<style>
	.question.chat-style {
		padding: 10px;
		border-radius: 15px;
		display: inline-flex;
		align-items: center;
		position: relative;
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

	@keyframes fadein {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.container {
		/* animation: fadein 0.2s; */
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: calc(100vh - 82px);
		padding: 16px;
	}
	.question-container {
		flex: 1;
		display: flex;
		flex-direction: row;
		align-items: center;
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
		justify-content: space-between;
		align-items: center;
		margin-top: 2rem;
		margin-bottom: 10px;
		width: 100%;
		gap: 8px;
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
	.grade-chip {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 61px;
		height: 24px;
		flex-shrink: 0;
		border-radius: 12.5px;
		border: 0.5px solid #ff7971;

		color: #ff7971;
		font-family: Pretendard;
		font-size: 12px;
		font-style: normal;
		font-weight: 400;
		line-height: 22px;
		letter-spacing: -0.408px;
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
</style>
