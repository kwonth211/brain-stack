<script>
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import NonMemberModal from '$components/NonMemberModal.svelte';
	import Spinner from '$components/Spinner.svelte';

	import Button from '$components/Button.svelte';
	import GoldenMedal from '$components/icons/GoldenMedal.svelte';
	import SilverMedal from '$components/icons/SilverMedal.svelte';
	import BronzeMedal from '$components/icons/BronzeMedal.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { dequeueFromRemainingQuizzes } from '$utils/window/utils';
	import Modal from '$components/Modal.svelte';
	import QuizCompleteNormal from '$components/QuizCompleteNormal.svelte';
	import Footer from '$components/Footer.svelte';
	import DrawerHeader from '$components/DrawerHeader.svelte';

	export let data;
	let NonMemberModalOpen = false;
	const { remainingQuizzes } = data;
	const allQuizResolved = remainingQuizzes.length === 0;
	let CompleteModalOpen = allQuizResolved;

	onMount(() => {
		localStorage.setItem('remainingQuizzes', JSON.stringify(remainingQuizzes));
	});
</script>

<svelte:head>
	<title>사자성어 퀴즈 - dual-brain</title>
	<meta name="description" content="사자성어 퀴즈를 풀어보세요, 많이 풀수록 랭킹에 올라갑니다." />
</svelte:head>

<div in:fade class="container">
	<DrawerHeader
		onClick={() => {
			goto('/');
		}}>사자성어 퀴즈</DrawerHeader
	>

	<div class="title-container">
		<div class="title">
			사자성어 게임
			<div class="sub-title">사자상어, 누가 더 잘 알고 있을까요?</div>
		</div>
	</div>

	<div class="card-container">
		<div>랭킹</div>
		<div class="create-container">
			{#await data.streamed.ranking}
				<div class="spinner-container">
					<Spinner />
				</div>
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
							{rank.totalCorrect}개 ({Number(rank.userAccuracy).toFixed(0)}%)
						</div>
					</div>
				{/each}
			{/await}
		</div>
	</div>
	<div class="start-container">
		{#if !allQuizResolved}
			<Button
				primary
				classes="start"
				onclick={async () => {
					if (!$page?.data?.session?.user) {
						NonMemberModalOpen = true;
						return;
					}
					const quiz = await dequeueFromRemainingQuizzes({
						categoryId: 13
					});
					if (!quiz) {
						goto(`/quiz/complete?category=13`);
						return;
					}
					goto(`/quiz/${quiz.id}?category=13`);
				}}>시작하기</Button
			>
		{/if}
	</div>

	{#if CompleteModalOpen}
		<Modal
			close={() => {
				CompleteModalOpen = false;
			}}
		>
			<QuizCompleteNormal title={`🎉 대단해요 🎉<br/>사자성어 문제를 모두 해결했어요`} />
		</Modal>
	{/if}

	{#if NonMemberModalOpen}
		<NonMemberModal
			onConfirm={() => {
				NonMemberModalOpen = false;
				goto('/categories');
			}}
			close={() => {
				NonMemberModalOpen = false;
			}}
		/>
	{/if}
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
		flex: 0.4;
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
		height: 100%;
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
		height: 100%;
	}
	.isMe {
		background-color: #a2bdf8;
		color: white;
	}
	.title-container {
		display: flex;
	}
	.title {
		display: flex;
		flex-direction: column;
		padding-left: 17px;
		gap: 4px;
		margin-top: 25px;
		box-sizing: border-box;
		color: #424242;
		font-family: Pretendard;
		font-size: 21px;
		font-style: normal;
		font-weight: 700;
		line-height: 22px; /* 88% */
		letter-spacing: -0.408px;
	}

	.sub-title {
		color: #424242;
		font-family: Pretendard;
		font-size: 14px;
		font-style: normal;
		font-weight: 500;
		line-height: 17px; /* 88% */
		letter-spacing: -0.408px;
	}
	.start-container {
		margin: 20px 30px;
	}
	:global(.start) {
		width: 100%;
		height: var(--button-height);
	}
	.spinner-container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}
</style>
