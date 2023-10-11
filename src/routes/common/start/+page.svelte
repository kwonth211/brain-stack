<script>
	import { fade } from 'svelte/transition';
	import Footer from '$components/Footer.svelte';
	import { goto } from '$app/navigation';
	import DotIcon from '$components/icons/DotIcon.svelte';
	import DividerVertical from '$components/DividerVertical.svelte';
	import KaKaoAddFit from '$components/KaKaoAddFit.svelte';
	import NextIcon from '$components/icons/NextIcon.svelte';
	import KaKaoMiniAddFit from '$components/KaKaoMiniAddFit.svelte';
	import Spinner from '$components/Spinner.svelte';
	import Header from '$components/Header.svelte';
	import CommonQuizIcon2 from '$components/icons/CommonQuizIcon2.svelte';
	import CommonQuizIconReverse2 from '$components/icons/CommonQuizIcon2Reverse.svelte';
	import Button from '$components/Button.svelte';
	import GoldenMedal from '$components/icons/GoldenMedal.svelte';
	import SilverMedal from '$components/icons/SilverMedal.svelte';
	import BronzeMedal from '$components/icons/BronzeMedal.svelte';
	export let data;
	const { streamed } = data;
</script>

<div in:fade class="container">
	<Header
		onClick={() => {
			goto('/');
		}}>상식퀴즈</Header
	>

	<div class="title">
		<CommonQuizIcon2 />
		상식 퀴즈
		<CommonQuizIconReverse2 />
	</div>

	<div class="card-container">
		<div>랭킹</div>
		<div class="create-container">
			{#await data.streamed.ranking}
				<Spinner />
			{:then value}
				{#each value as rank, index}
					<div class="ranking-list-item" class:isMe={rank.userId === 'user.id'}>
						<div class="rank">
							{#if index === 0}
								<GoldenMedal />
							{:else if index === 1}
								<SilverMedal />
							{:else if index === 2}
								<BronzeMedal />
							{:else}
								{index + 1}
							{/if}
						</div>
						<div class="rank-name">{rank.userNickname}</div>
						<div class="correct-ratio" class:isMe={rank.userId === 'user.id'}>
							정답률 {Number(rank.userAccuracy)?.toFixed?.(0)}%
						</div>
					</div>
				{/each}
			{/await}
		</div>
	</div>
	<div class="start-container">
		<Button
			primary
			classes="start"
			onclick={() => {
				goto('/categories');
			}}>시작하기</Button
		>
	</div>

	<!-- <KaKaoAddFit /> -->
</div>

<style>
	.rank {
		text-align: center;
		font-family: Pretendard;
		font-size: 17px;
		font-style: normal;
		font-weight: 600;
		line-height: 22px; /* 95.652% */
		letter-spacing: -0.408px;
		flex: 0.12;
		margin-right: 5px;
	}

	.rank-name {
		font-family: Pretendard;
		font-size: 13px;

		font-style: normal;
		flex: 2;
		font-weight: 600;
		line-height: 22px; /* 122.222% */
		letter-spacing: -0.408px;
	}
	.correct-ratio {
		color: rgba(104, 104, 104, 0.6);
		font-family: Pretendard;
		font-size: 13px;
		font-style: normal;
		font-weight: 400;
		line-height: 22px; /* 169.231% */
		letter-spacing: -0.408px;
		text-align: right;
		/* position: absolute;
		right: 10px; */
		flex: 1;
	}
	.user-name {
		color: #000;
		font-family: Pretendard;
		font-size: 23px;
		font-style: normal;
		font-weight: 700;
		line-height: 22px; /* 95.652% */
		letter-spacing: -0.408px;
	}
	.user-rank {
		color: #5387f7;
		font-family: Pretendard;
		font-size: 15px;
		font-style: normal;
		font-weight: 400;
		line-height: 22px; /* 146.667% */
		letter-spacing: -0.408px;
		display: flex;
		align-items: center;
		gap: 4px;
	}
	.quiz-card-wrapper {
		width: 100%;
		gap: 3px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.user-card {
		margin-top: 40px;
		height: 118px;
		border-radius: 16px;
		background: #fff;
		margin-left: 15px;
		margin-right: 15px;
		display: flex;
		justify-content: center;
		flex-direction: column;
		padding: 15px;
		box-sizing: border-box;
		gap: 9px;
		position: relative;
	}
	.quiz-card {
		height: 65px;
		border-radius: 16px;
		background: #fff;
		margin: 0px 15px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		padding: 13px;
	}
	.container {
		height: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
		background-color: rgba(83, 135, 247, 0.19);
		gap: 7px;
	}

	.create-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
	}
	.ranking-list-item {
		position: relative;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		align-items: center;
		width: 100%;
		height: 59px;
		flex-shrink: 0;
		border-radius: 10px;
		background: #f3f4f6;
		padding: 10px;
		box-sizing: border-box;
	}

	.card-container {
		display: flex;
		flex-direction: column;
		padding: 15px;
		background-color: white;
		margin-left: 15px;
		margin-right: 15px;
		border-radius: 16px;
		background: #fff;
		gap: 10px;
		max-height: 360px;
	}
	.isMe {
		background-color: #a2bdf8;
		color: white;
	}
	.title {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 19px;
		margin-top: 50px;
		margin-bottom: 20px;
		box-sizing: border-box;

		color: #424242;
		font-family: Pretendard;
		font-size: 21px;
		font-style: normal;
		font-weight: 700;
		line-height: 22px; /* 88% */
		letter-spacing: -0.408px;
	}
	.start-container {
		margin: 20px 30px;
	}
	:global(.start) {
		width: 100%;
		height: var(--button-height);
	}
</style>
