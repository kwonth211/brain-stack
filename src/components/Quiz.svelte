<!-- Quiz.svelte -->
<script lang="ts">
	import { fade } from 'svelte/transition';
	import Button from '$components/Button.svelte';
	import ProgressBar from '$components/ProgressBar.svelte';
	export let quiz: any = null;
	export let onclick = () => {};
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
		<div class="q-mark">Q.</div>
		<div class="question">{quiz.question}</div>
	</div>
	<div class="button-container">
		{#each quiz.answers as answer, index}
			<Button primary {onclick}>
				<div class="button-content">
					<span class="number">{index + 1}.</span>
					<span class="text">{answer}</span>
				</div>
			</Button>
		{/each}
	</div>
</div>

<style>
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
	}
	.question {
		word-break: break-word;
	}
	.question-container .q-mark {
		color: #5387f7;
		font-weight: bold;
		margin-bottom: 10px;
		margin-right: 15px;
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
		background-color: #5387f7;
		color: #ffffff;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding: 10px;

		color: #fff;
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
