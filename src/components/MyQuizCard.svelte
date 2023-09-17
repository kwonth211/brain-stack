<script lang="ts">
	import { slide, scale } from 'svelte/transition';
	import Info from './icons/Info.svelte';
	let isOpen = false;
	export let question: string;
	export let isCorrect: boolean;
	export let userAnswer: number;
	export let quizAnswer: number;
	export let option1: string;
	export let option2: string;
	export let option3: string;
	export let category_id: number;
	export let option4: string;

	let showAnswer = false;

	$: getOptionClass = (index: number) => {
		if (!showAnswer) return '';
		if (index + 1 === Number(quizAnswer)) return 'correct-option';
		if (index + 1 === Number(userAnswer)) return 'incorrect-option';
		return '';
	};
</script>

<div
	class="my-quiz-card {isCorrect ? 'my-correct' : 'my-inCorrect'}"
	on:click={() => {
		isOpen = !isOpen;
		showAnswer = false;
	}}
	on:keydown={() => {}}
>
	<div class="title">
		<div class="title-question">{question}</div>
		<div class="view-info">
			<Info />
		</div>
	</div>

	{#if isOpen}
		<div class="details" transition:slide>
			{#if option1}
				<div class={`option ${getOptionClass(0)}`}>1. {option1}</div>
			{/if}
			{#if option2}
				<div class={`option ${getOptionClass(1)}`}>2. {option2}</div>
			{/if}
			{#if option3}
				<div class={`option ${getOptionClass(2)}`}>3. {option3}</div>
			{/if}
			{#if option4}
				<div class={`option ${getOptionClass(3)}`}>4. {option4}</div>
			{/if}
			{#if category_id === 12 && showAnswer}
				<div>입력한 답: {userAnswer}</div>
				<div>정답: {quizAnswer}</div>
			{/if}
			<div
				class="view-answer"
				on:keydown={() => {}}
				on:click={(e) => {
					e.stopPropagation();
					showAnswer = true;
				}}
			>
				{#if !showAnswer}
					정답보기
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	.my-quiz-card {
		width: 100%;
		text-align: left;
		flex-shrink: 0;
		border-radius: 10px;
		padding: 15px;
		box-sizing: border-box;
		position: relative;
		cursor: pointer;
	}
	.title {
		color: #000;
		font-family: Pretendard;
		font-size: 14px;
		font-style: normal;
		font-weight: 500;
		line-height: 22px; /* 137.5% */
		letter-spacing: -0.408px;
		display: flex;
		justify-content: space-between;
	}
	.my-correct {
		background: #dfe9fe;
	}
	.my-inCorrect {
		background: #f8f4f4;
	}
	.info-icon {
		position: absolute;
		right: 10px;
		top: 50%;
		transform: translateY(-50%);
		cursor: pointer;
	}
	.details {
		color: #838383;
		font-family: Pretendard;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: 22px; /* 157.143% */
		letter-spacing: -0.408px;
	}
	.user-answer-text {
		color: black;
	}
	.title-question {
		flex: 0.75;
	}
	.view-info {
		text-align: right;
		color: black;
		flex: 0.25;
	}
	.view-answer {
		text-align: right;
		color: black;
		flex: 0.25;
	}

	.option {
		margin-top: 10px;
		transition: background-color 0.5s;
	}

	.correct-option {
		color: var(--primary);
	}

	.incorrect-option {
		color: var(--wrong);
	}
</style>
