<script lang="ts">
	import type { Quiz } from '../types/quiz';
	import CircleIcon from './icons/CircleIcon.svelte';
	import XIcon from './icons/XIcon.svelte';

	let showCardBack = false;
	export let isCorrect: boolean;
	export let answer: Quiz['answer'];
	export let explanation: Quiz['explanation'];

	const toggleShowBack = () => (showCardBack = !showCardBack);
</script>

<div class="flip-box">
	<div class="flip-box-inner" class:flip-it={showCardBack}>
		<div class={isCorrect ? 'flip-box-front bounce' : 'flip-box-front shake'}>
			<div>
				{#if isCorrect}
					<CircleIcon />
				{:else}
					<XIcon />
				{/if}
			</div>
			<div class={isCorrect ? 'correct-text' : 'incorrect-text'}>
				{isCorrect ? '정답입니다!' : '오답입니다!'}
			</div>
			<span
				class="more-info"
				on:keydown={() => {}}
				on:click={(e) => {
					toggleShowBack();
				}}>설명보기</span
			>
		</div>

		<div class="flip-box-back" class:conceal-answer={showCardBack}>
			<div class="correct-answer">정답은 {answer}번 이에요.</div>
			<div class="description">
				{explanation}
			</div>
		</div>
	</div>
</div>

<style>
	.flip-box {
		background-color: transparent;
		width: 200px;
		height: 100px;
		perspective: 1000px; /* Remove this if you don't want the 3D effect */
	}

	.flip-box-inner {
		position: relative;
		width: 100%;
		height: 100%;
		text-align: center;
		transition: transform 0.4s;
		transform-style: preserve-3d;

		/* // */
	}

	.flip-it {
		transform: rotateY(-180deg);
	}

	.flip-box-front,
	.flip-box-back {
		position: absolute;
		width: 100%;
		height: 100%;
		-webkit-backface-visibility: hidden; /* Safari */
		backface-visibility: hidden;
		background: #fff;
		box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.2);

		padding: 15px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		border-radius: 8px;

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

	/* Style the front side */
	.flip-box-front {
		color: black;
		display: flex;
		justify-content: center;
	}

	/* Style the back side */
	.flip-box-back {
		display: flex;
		justify-content: center;
		align-items: center;
		color: black;
		transform: rotateY(180deg);
	}

	.more-info {
		color: rgb(69, 68, 68);
		font-family: Pretendard;
		font-size: 12px;
		font-style: normal;
		font-weight: 500;
		line-height: 22px; /* 183.333% */
		letter-spacing: -0.408px;
		text-decoration: underline;
	}

	.description {
		color: black;
		text-align: center;
		font-family: Pretendard;
		font-size: 12px;
		font-style: normal;
		font-weight: 400;
		line-height: 16.5px; /* 137.5% */
	}
	.correct-answer {
		color: #ff7971;
		font-size: 14px;
		margin-top: 5px;
	}

	.incorrect-text {
		color: #ff7971;
	}
	.correct-text {
		color: #5387f7;
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
