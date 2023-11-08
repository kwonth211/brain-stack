<script>
	import { fade } from 'svelte/transition';
	import Footer from '$components/Footer.svelte';
	import { goto } from '$app/navigation';
	import NonMemberModal from '$components/NonMemberModal.svelte';
	import Spinner from '$components/Spinner.svelte';
	import Header from '$components/Header.svelte';
	import Button from '$components/Button.svelte';
	import GoldenMedal from '$components/icons/GoldenMedal.svelte';
	import SilverMedal from '$components/icons/SilverMedal.svelte';
	import BronzeMedal from '$components/icons/BronzeMedal.svelte';
	import { page } from '$app/stores';

	export let data;
	let NonMemberModalOpen = false;
</script>

<svelte:head>
	<title>상식 퀴즈 - dual-brain</title>
	<meta
		name="description"
		content="상식 퀴즈를 풀어보세요. 상식 퀴즈를 풀면서 지식을 쌓아보세요."
	/>
</svelte:head>

<div in:fade class="container">
	<Header
		onBack={() => {
			goto('/');
		}}
		onClick={() => {
			goto('/');
		}}>상식퀴즈</Header
	>

	<div class="title-container">
		<!-- <CommonQuizIcon2 /> -->
		<div class="title">
			상식 게임
			<div class="sub-title">
				퀴즈를 통해 나의 지식을 확장하고, <br />
				랭킹 1등에 도전해보세요.
			</div>
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
							{rank.totalPoints}개 ({rank.userAccuracy.toFixed(0)}%)
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
				if (!$page?.data?.session?.user) {
					NonMemberModalOpen = true;
					return;
				}
				goto('/categories');
			}}>시작하기</Button
		>
	</div>

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
		margin-top: 50px;
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
