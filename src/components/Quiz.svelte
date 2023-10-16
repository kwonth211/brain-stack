<!-- Quiz.svelte -->
<script lang="ts">
	import type { Quiz } from '../types/quiz';
	import ResultModal from './ResultModal.svelte';
	import Button from '$components/Button.svelte';
	import ProgressBar from '$components/ProgressBar.svelte';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { axios } from '$lib/axios';
	import { page } from '$app/stores';
	import DividerVertical from './DividerVertical.svelte';
	import ShareIcon from './icons/ShareIcon.svelte';
	import ShareModal from './ShareModal.svelte';

	export let quiz: Quiz;

	export let onNext = () => {};
	export let onCheckAnswer = (isCorrect: boolean) => {};
	export let unSolvedCount: number;
	export let correctCount: number;
	export let isAlreadySolved: boolean;
	export let userAnswer: string | null;
	const options = [quiz.option1, quiz.option2, quiz.option3, quiz.option4];
	let selectedOption: string | null = null;
	let shareModalOpen = false;
	let correctRate: number | null = null;
	let loadingNext = false;
	let showGoogleAdModal = false;

	let timeLimit = 15 * 100;
	let remainingTime = timeLimit;
	let timerInterval: NodeJS.Timer;

	let displayQuestion = '';
	let index = 0;
	$: isShortTime = remainingTime <= 500;

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
			if (isAlreadySolved && userAnswer) {
				checkAnswer(userAnswer);
				return;
			}
			//FIXME 임시 처리
			setTimeout(() => {
				startTimer();
			}, 2000);
		}, quiz.question.length * 50);
	});

	const startTimer = () => {
		timerInterval = setInterval(() => {
			remainingTime -= 1;
			if (remainingTime <= 0) {
				checkAnswer('timeout');
			}
		}, 10);
	};
	let isModalOpen = false;
	let answerIsCorrect = false;
	let answerIsTimeout = false;

	const checkAnswer = async (_selectedOption: string) => {
		loadingNext = true;
		clearInterval(timerInterval);

		if (selectedOption) {
			return;
		}
		if (_selectedOption === 'timeout') {
			answerIsTimeout = true;
		}
		answerIsCorrect = _selectedOption === quiz.answer;

		isModalOpen = true;

		selectedOption = _selectedOption;
		try {
			if (!isAlreadySolved) {
				await axios.post('/api/quiz', {
					userEmail: $page.data.session?.user?.email,
					quizId: quiz.id,
					answer: _selectedOption
				});
			}
		} catch (error) {
		} finally {
			loadingNext = false;
		}
		onCheckAnswer(answerIsCorrect);
	};
	const closeModal = () => {
		isModalOpen = false;
	};

	$: getButtonClassName = (index: number) => {
		const quizNumber = Number(quiz.answer);
		if (!selectedOption) {
			return '';
		}
		if (index + 1 === quizNumber) {
			return 'correct';
		}
		if (index + 1 === quizNumber && index + 1 === Number(selectedOption)) {
			return 'correct';
		} else if (index + 1 === Number(selectedOption)) {
			return 'incorrect';
		} else {
			return 'neutral';
		}
	};

	const loadCorrectRate = async () => {
		try {
			const response = await axios.get(`/api/quiz/${quiz.id}`);
			correctRate = response.data.correctRate ?? 0;
		} catch (error) {
			console.error('Failed to load correct rate:', error);
		}
	};

	$: if (quiz) {
		loadCorrectRate();
	}
</script>

<!--  -->

<div in:fade class="container">
	<div class="status-wrapper">
		<div class="quiz-info-wrapper">
			<div class="correct-text">
				남은 개수 <div class="remain-text-count">{unSolvedCount}개</div>
			</div>
			<DividerVertical height={'60%'} />
			<div class="correct-text">
				맞은 개수 <div class="correct-text-count">{correctCount}개</div>
			</div>
			<DividerVertical height={'60%'} />
			<div class="correct-text">
				현재 등수 <div class="rank-text">? 등</div>
			</div>
			<!-- {#if correctRate !== null}
				
			{/if} -->
		</div>
		<div class="progressbar-container">
			<div class="remain-time-text" class:isShortTime>남은시간</div>
			<!-- <ProgressBar primary progress={(solvedCount / totalCount) * 100} /> -->
			<ProgressBar
				primary={!isShortTime}
				wrong={isShortTime}
				progress={(remainingTime / timeLimit) * 100}
				isShake={isShortTime && remainingTime > 0}
			/>
		</div>

		<div
			class="bottom-container"
			on:keydown={() => {}}
			on:click={() => {
				shareModalOpen = true;
			}}
		>
			<div class="correct-rate">
				정답률 {#if correctRate === null}
					<span class="correct-rate-text">??%</span>
				{:else}
					<span class="correct-rate-text">{correctRate}%</span>
				{/if}
			</div>
			<div class="share-container">
				<ShareIcon style="margin-top:3px;" />
				공유하기
			</div>
		</div>
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

	{#if selectedOption && !loadingNext}
		<div
			class="next-button-wrapper"
			in:fade
			on:click={() => {
				onNext();
				// setTimeout(() => {
				// }, 500);
			}}
			on:keydown={() => {}}
		>
			>> 다음 문제
		</div>
	{/if}

	{#if isModalOpen}
		<ResultModal
			isCorrect={answerIsCorrect}
			isTimeout={answerIsTimeout}
			explanation={quiz.explanation}
			close={closeModal}
			{quiz}
			answer={quiz.answer}
		/>
	{/if}

	{#if shareModalOpen}
		<ShareModal
			{quiz}
			close={() => {
				shareModalOpen = false;
			}}
		/>
	{/if}

	<div class="button-container">
		{#each optionsShown as option, index}
			<div style="width: 100%;" in:fly={{ y: 100, delay: index * 500 }}>
				<Button
					primary
					type="outlined"
					onclick={() => {
						if (isAlreadySolved) {
							return;
						}

						checkAnswer(String(index + 1));
					}}
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
		padding: 8px 12px;
		cursor: pointer;
		transition: background-color 0.3s;
		color: #797979;
		z-index: 2;
	}

	.question.chat-style {
		padding: 10px;
		border-radius: 15px;
		line-height: 1;
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
		justify-content: space-between;
		align-items: center;
		overflow: scroll;
		padding: 16px;
		box-sizing: border-box;
		height: calc(100% - 32px);
	}
	.question-container {
		color: #000;
		font-family: Pretendard;
		font-size: 22px;
		font-style: normal;
		font-weight: 500;
		line-height: 17px;
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
		justify-content: center;
		width: 100%;
		gap: 8px;
		height: 45%;

		overflow: hidden;
	}
	.progressbar-container {
		display: flex;
		margin-top: 7px;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100%;
		gap: 8px;
	}

	.status-wrapper {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.button-container :global(.btn) {
		min-height: 55px;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding: 10px;

		font-family: Pretendard;
		font-size: 14px;
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

	.count-text {
		color: #858585;
		font-family: Pretendard;
		font-size: 15px;
		font-style: normal;
		font-weight: 400;
		line-height: 22px; /* 146.667% */
		letter-spacing: -0.408px;
		display: flex;
		gap: 5px;
		align-items: center;
	}
	.correct-text {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 13px;
		margin-bottom: 2px;

		color: #858585;
		font-family: Pretendard;
		font-size: 11px;
		font-style: normal;
		line-height: 14px;
		letter-spacing: -0.408px;
	}
	.correct-text-count {
		color: #5387f7;
		font-family: Pretendard;
		font-size: 13px;
		font-style: normal;
		font-weight: 600;
		letter-spacing: -0.408px;
	}
	.rank-text {
		color: #ff7971;
		font-family: Pretendard;
		font-size: 13px;
		font-style: normal;
		font-weight: 600;
		letter-spacing: -0.408px;
	}
	.remain-text-count {
		color: #717171;
		text-align: center;
		font-family: Pretendard;
		font-size: 13px;
		font-style: normal;
		font-weight: 600;
		letter-spacing: -0.408px;
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
	.correct-rate {
	}

	.quiz-info-wrapper {
		/* padding: 8px 0px;
		box-sizing: border-box; */
		display: flex;
		align-items: center;
		gap: 40px;
		justify-content: center;
		border-radius: 4px;
		background: rgba(223, 233, 254, 0.51);
		height: 42px;
	}
	.remain-time-text {
		color: #5387f7;
		font-family: Pretendard;
		font-size: 12px;
		font-style: normal;
		font-weight: 500;
		line-height: 22px; /* 183.333% */
		letter-spacing: -0.408px;
	}

	.isShortTime {
		color: var(--wrong);
	}
	.bottom-container {
		display: flex;
		gap: 5px;
		justify-content: space-between;
		color: #999;
		font-family: Pretendard;
		font-size: 12px;
		font-style: normal;
		font-weight: 500;
		line-height: 22px; /* 183.333% */
		letter-spacing: -0.408px;
	}
	.share-container {
		display: flex;
		gap: 5px;
	}
	.correct-rate-text {
		font-weight: 500;
	}
</style>
