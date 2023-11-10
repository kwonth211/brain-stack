<script lang="ts">
	import { fade } from 'svelte/transition';
	import Footer from '$components/Footer.svelte';
	import { goto } from '$app/navigation';
	import DotIcon from '$components/icons/DotIcon.svelte';
	import DividerVertical from '$components/DividerVertical.svelte';
	import KaKaoAddFit from '$components/KaKaoAddFit.svelte';
	import NextIcon from '$components/icons/NextIcon.svelte';
	import Spinner from '$components/Spinner.svelte';
	import { onMount } from 'svelte';
	import type { User } from '$types/user';
	import axios from 'axios';

	export let data;
	let user: User | null = null;
	let userAccuracy: string | null = null;
	let userCorrectAnswers: number | null = null;
	let userIncorrectAnswers: number | null = null;
	const { streamed } = data;

	const { ranking } = streamed;

	onMount(async () => {
		const response = await axios.get('/api/user/me');
		user = response.data.user;
		const rankResolved = await ranking;

		const userStatistics = rankResolved.find((ranking) => ranking.userId === user?.id);

		if (!userStatistics) {
			return;
		}
		userCorrectAnswers = userStatistics?.totalCorrect;
		userIncorrectAnswers = userStatistics?.totalAttempts - userStatistics?.totalCorrect;
		userAccuracy = userStatistics?.userAccuracy.toFixed(2);
	});
</script>

<div in:fade class="container">
	<div
		class="user-card"
		on:keydown={() => {}}
		on:click={(e) => {
			e.stopPropagation();
			goto('/my-page/quiz');
		}}
	>
		<div class="user-name">
			<a
				style="color: inherit;width: fit-content"
				href="/profile"
				on:click={(e) => {
					e.stopPropagation();
				}}>{user?.nickname ?? '-'}</a
			>
		</div>

		<div class="user-rank">
			랭킹
			{#await data.streamed.ranking}
				??위
			{:then value}
				{value?.findIndex((ranking) => ranking.userId === user?.id) + 1}위
			{/await}

			<DotIcon /> 정답률 {userAccuracy ?? 0}%
		</div>
		<div
			class="next-icon-wrapper"
			on:click={(e) => {
				e.stopPropagation();
				goto('/my-page/quiz');
			}}
			on:keydown={() => {}}
		>
			<NextIcon />
		</div>
	</div>
	<div class="quiz-card">
		<div class="quiz-card-wrapper">
			<div class="correct-quiz-text">맞은 퀴즈</div>
			<div
				class="correct-quiz-count"
				on:click={() => {
					goto('/my-page/quiz?correct');
				}}
				on:keydown={() => {}}
			>
				{userCorrectAnswers ?? 0}
			</div>
		</div>
		<DividerVertical />
		<div class="quiz-card-wrapper">
			<div class="incorrect-quiz-text">틀린 퀴즈</div>
			<div
				class="incorrect-quiz-count"
				on:click={() => {
					goto('/my-page/quiz?in-correct');
				}}
				on:keydown={() => {}}
			>
				{userIncorrectAnswers ?? 0}
			</div>
		</div>
	</div>
	<div class="card-container">
		<div>랭킹</div>
		<div class="create-container">
			{#await data.streamed.ranking}
				<Spinner />
			{:then value}
				{#each value as rank, index}
					<div class="ranking-list-item" class:isMe={rank.userId === user?.id}>
						<div class="rank">{index + 1}</div>
						<div class="rank-name">{rank.userNickname}</div>
						<div class="correct-ratio" class:isMe={rank.userId === user?.id}>
							<!-- 맞은문제 {rank.userAccuracy.toFixed(0)}% / 정답률 {rank.userAccuracy.toFixed(0)}% -->
							{rank.totalCorrect}개 ({rank.userAccuracy.toFixed(0)}%)
						</div>
					</div>
				{/each}
			{/await}
		</div>
	</div>
	<KaKaoAddFit />
	<Footer />
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
		flex: 0.1;
		margin-right: 5px;
	}

	.rank-name {
		font-family: Pretendard;
		font-size: 12px;
		font-style: normal;
		flex: 0.9;
		font-weight: 600;
		line-height: 22px; /* 122.222% */
		letter-spacing: -0.408px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: pre;
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
		flex: 0.3;
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
		overflow: scroll;
		flex-direction: column;
		padding: 15px;
		background-color: white;
		margin-left: 15px;
		margin-right: 15px;
		border-radius: 16px;
		background: #fff;
		gap: 10px;
		max-height: 400px;
	}
	.next-icon-wrapper {
		position: absolute;
		right: 20px;
		top: 20px;
	}
	.correct-quiz-count {
		color: #5387f7;
		font-family: Pretendard;
		font-size: 22px;
		font-style: normal;
		text-decoration: underline;
		font-weight: 600;
		line-height: 22px; /* 100% */
		letter-spacing: -0.408px;
	}
	.correct-quiz-text {
		color: #727272;
		font-family: Pretendard;
		font-size: 15px;
		font-style: normal;
		font-weight: 400;
		line-height: 22px; /* 146.667% */
		letter-spacing: -0.408px;
	}
	.incorrect-quiz-text {
		color: #727272;
		font-family: Pretendard;
		font-size: 15px;
		font-style: normal;
		font-weight: 400;
		line-height: 22px; /* 146.667% */
		letter-spacing: -0.408px;
	}
	.incorrect-quiz-count {
		color: #ff7971;
		font-family: Pretendard;
		font-size: 22px;
		font-style: normal;
		font-weight: 600;
		text-decoration: underline;
		line-height: 22px; /* 100% */
		letter-spacing: -0.408px;
	}
	.isMe {
		background-color: #5387f7;
		color: white;
	}
</style>
