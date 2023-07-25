<script>
	import Button from '$components/Button.svelte';
	import Header from '$components/Header.svelte';
	import ProgressBar from '$components/ProgressBar.svelte';
	import { fade } from 'svelte/transition';
</script>

<div in:fade>
	<Header>상식 퀴즈</Header>

	<div class="content">
		<div class="status-wrapper">
			<div class="progressbar-container">
				<ProgressBar progress={20} />
				<div class="grade-chip">현재 3등</div>
			</div>
			1/10 맞은 개수 1개
		</div>
		<div class="question-container">
			<div class="q-mark">Q.</div>
			<div class="question">물이 얼었을 때 부피가 커지는 이유는 무엇일까요?</div>
		</div>
		<div class="button-container">
			<Button primary>
				<div class="button-content">
					<span class="number">1.</span>
					<span class="text">물분자가 결합할 때 공간을 차지하기 때문</span>
				</div>
			</Button>
			<Button primary>
				<div class="button-content">
					<span class="number">2.</span>
					<span class="text">물분자가 고체 상태에서 더 빠르게 움직이기 때문</span>
				</div>
			</Button>
			<Button primary>
				<div class="button-content">
					<span class="number">3.</span>
					<span class="text">물이 얼면서 생기는 열이 부피를 늘리기 때문</span>
				</div>
			</Button>
		</div>
	</div>
</div>

<style>
	.content {
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

	.button-container .text {
	}
</style>
