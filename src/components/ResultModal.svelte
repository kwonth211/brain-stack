<script lang="ts">
	import type { Quiz } from '../types/quiz';
	import CircleIcon from './icons/CircleIcon.svelte';
	import XIcon from './icons/XIcon.svelte';
	import { slide } from 'svelte/transition';

	export let isCorrect: boolean;
	export let close: () => {};
	export let answer: number;
	let modal: EventTarget;
	let showExplanation = false;
	export let explanation: Quiz['explanation'];

	function toggleExplanation() {
		showExplanation = !showExplanation;
	}
</script>

<div
	class="modal"
	bind:this={modal}
	on:keydown={() => {}}
	on:click={(e) => {
		if (e.target === modal) close();
	}}
>
	<div class={isCorrect ? 'correct bounce' : 'incorrect shake'}>
		<div>
			{#if isCorrect}
				<CircleIcon />
			{:else}
				<XIcon />
			{/if}
		</div>
		<div class={isCorrect ? 'correct-text' : 'incorrect-text'}>
			{isCorrect ? '정답입니다!' : '오답입니다!'}
			{#if !isCorrect}
				<div class="correct-answer">정답은 {answer}번 이에요.</div>
			{/if}
		</div>

		{#if !showExplanation}
			<span
				class="more-info"
				on:keydown={() => {}}
				on:click={(e) => {
					toggleExplanation();
				}}>설명보기</span
			>
		{/if}
		{#if showExplanation}
			<div transition:slide|local class="description">
				{explanation}
			</div>
			<span
				class="close-button"
				on:keydown={() => {}}
				on:click={(e) => {
					close();
				}}>닫기</span
			>
		{/if}
	</div>
</div>

<style>
	.close-button {
		bottom: 7px;
		color: #858585;
		font-family: Pretendard;
		font-size: 12px;
		font-style: normal;
		font-weight: 300;
		line-height: 22px; /* 183.333% */
		letter-spacing: -0.408px;
		text-decoration: underline;
	}
	.description {
		color: #858585;
		text-align: center;
		font-family: Pretendard;
		font-size: 12px;
		font-style: normal;
		font-weight: 300;
		line-height: 16.5px; /* 137.5% */
	}
	.correct-answer {
		color: #ff7971;
		font-size: 14px;
		margin-top: 5px;
	}
	.more-info {
		color: #858585;
		font-family: Pretendard;
		font-size: 12px;
		font-style: normal;
		font-weight: 300;
		line-height: 22px; /* 183.333% */
		letter-spacing: -0.408px;
		text-decoration: underline;
	}
	.incorrect-text {
		color: #ff7971;
	}
	.correct-text {
		color: #5387f7;
	}
	.modal {
		position: fixed;
		bottom: 25%;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		border-radius: 8px;
	}

	.correct,
	.incorrect {
		position: relative;
		padding: 15px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;

		font-family: Pretendard;
		font-size: 18px;
		font-style: normal;
		font-weight: 500;
		line-height: 22px; /* 122.222% */
		letter-spacing: -0.408px;
		background-color: white;

		width: 160px;
		min-height: 106px;
		height: auto;
		flex-shrink: 0;
		border-radius: 8px;
		background: #fff;
		box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.2);
		gap: 5px;
	}

	button {
		margin-top: 20px;
		padding: 10px 20px;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}

	@keyframes bounce {
		0%,
		20%,
		50%,
		80%,
		100% {
			transform: translateY(0);
		}
		40% {
			transform: translateY(-30px);
		}
		60% {
			transform: translateY(-15px);
		}
	}

	@keyframes shake {
		10%,
		90% {
			transform: translate3d(-1px, 0, 0);
		}
		20%,
		80% {
			transform: translate3d(2px, 0, 0);
		}
		30%,
		50%,
		70% {
			transform: translate3d(-4px, 0, 0);
		}
		40%,
		60% {
			transform: translate3d(4px, 0, 0);
		}
	}

	.bounce {
		animation: bounce 1s;
	}

	.shake {
		animation: shake 0.8s;
	}
</style>
