<script lang="ts">
	import axios from 'axios';
	import type { Quiz } from '../types/quiz';
	import CheckAnimationIcon from './icons/CheckAnimationIcon.svelte';
	import CircleIcon from './icons/CircleIcon.svelte';
	import XIcon from './icons/XIcon.svelte';
	import Spinner from './Spinner.svelte';
	import TimerIcon from './icons/TimerIcon.svelte';
	import Button from './Button.svelte';

	let showCardBack = false;
	export let onNext: () => void;
	export let quiz: Quiz;
	export let isCorrect: boolean;
	export let answer: Quiz['answer'];
	export let isTimeout: boolean;
	let explanation: Quiz['explanation'];
	let loading = false;

	const toggleShowBack = async () => {
		showCardBack = !showCardBack;
		loading = true;
		try {
			const { data } = await axios.get(`/api/quiz/${quiz.id}/question`);
			explanation = data.explanation;
		} catch (error) {
			explanation = '설명을 불러오는데 실패했어요...';
		} finally {
			loading = false;
		}
	};
</script>

<div class="flip-box">
	<div class="flip-box-inner" class:flip-it={showCardBack}>
		<div class={isCorrect ? 'flip-box-front bounce' : 'flip-box-front shake'}>
			<div class="flip-box-content">
				<div>
					{#if isTimeout}
						<TimerIcon color="#ff7971" />
					{:else if isCorrect}
						<CircleIcon />
					{:else}
						<XIcon />
					{/if}
				</div>
				<div class={isCorrect ? 'correct-text' : 'incorrect-text'}>
					{isTimeout ? '시간초과!' : isCorrect ? '정답이에요!' : '오답이에요'}
				</div>
				<div class={'is-correct-sub-text'}>
					{isCorrect ? '잘했어요! 확인해볼까요?' : '괜찮아요. 지식이 생길거에요.'}
				</div>
				{#if quiz.category_id !== 999}
					<span
						class="more-info"
						on:keydown={() => {}}
						on:click={(e) => {
							toggleShowBack();
						}}>설명 보기</span
					>
				{/if}
			</div>
			<Button classes="next-button" primary={isCorrect} error={!isCorrect} onclick={onNext}
				>다음 문제</Button
			>
		</div>

		<div class="flip-box-back" class:conceal-answer={showCardBack}>
			<div class="flip-box-content">
				<div class={isCorrect ? 'correct-answer' : 'incorrect-answer'}>
					<CheckAnimationIcon
						animate={showCardBack}
						color={isCorrect ? 'var(--primary)' : '#ff7971'}
					/>
					정답은 {answer}번 이에요.
					<div class="manner-text">지식 +1</div>
				</div>
				<div class="description">
					{#if loading}
						AI에게 설명을 부탁하고 있어요...<Spinner
							size={20}
							color={isCorrect ? '#5387f7' : '#ff7971'}
						/>
					{:else}
						{explanation}
					{/if}
				</div>
			</div>
			<Button primary={isCorrect} error={!isCorrect} classes="next-button" onclick={onNext}
				>다음 문제</Button
			>
		</div>
	</div>
</div>

<style>
	.flip-box {
		background-color: transparent;
		width: 280px;
		height: 200px;
		perspective: 1000px;
		position: absolute;
		top: 23%;
	}
	.manner-text {
		position: absolute;
		right: 18px;
		text-align: right;
		color: black;
		font-family: Pretendard;
		font-size: 12px;
		font-style: normal;
		font-weight: 400;
		line-height: 16.5px; /* 137.5% */
		color: #818386;
	}

	.flip-box-inner {
		position: relative;
		width: 100%;
		height: 100%;
		text-align: center;
		transition: transform 0.4s;
		transform-style: preserve-3d;
	}
	.is-correct-sub-text {
		color: #7d7979;
		font-size: 14px;
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

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		font-family: Pretendard;
		font-size: 20px;
		font-style: normal;
		font-weight: 500;
		line-height: 22px; /* 122.222% */
		letter-spacing: -0.408px;
		background-color: white;
		height: auto;
		flex-shrink: 0;
		border-radius: 8px;
		background: #fff;
		box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.2);
	}

	.flip-box-front {
		color: black;
		display: flex;
		justify-content: center;
	}

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
		font-size: 14px;
		font-style: normal;
		font-weight: 500;
		line-height: 22px; /* 183.333% */
		letter-spacing: -0.408px;
		text-decoration: underline;
	}

	.description {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 3px;
		color: black;
		text-align: center;
		font-family: Pretendard;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: 16.5px; /* 137.5% */
		text-align: left;
	}
	.correct-answer {
		color: var(--primary);
	}
	.incorrect-answer {
		color: #ff7971;
	}
	.correct-answer,
	.incorrect-answer {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		font-size: 16px;
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
	.flip-box-content {
		display: flex;
		flex-direction: column;
		gap: 6px;
		width: 100%;
		padding: 15px;
		position: relative;
		box-sizing: border-box;
	}
	:global(.next-button) {
		height: 40px;
		border-radius: 0px 0px 8px 8px !important;
	}
</style>
