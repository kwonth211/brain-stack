<script lang="ts">
	import { fade } from 'svelte/transition';
	import Footer from '$components/Footer.svelte';
	import { goto } from '$app/navigation';
	import NonMemberModal from '$components/NonMemberModal.svelte';
	import Spinner from '$components/Spinner.svelte';
	import { onMount } from 'svelte';
	import Button from '$components/Button.svelte';
	import { page } from '$app/stores';
	import DrawerHeader from '$components/DrawerHeader.svelte';
	import PlayIcon from '$components/icons/PlayIcon.svelte';
	import { dequeueFromRemainingQuizzes } from '$utils/window/utils.js';

	export let data;
	const { categoryId } = data;
	let NonMemberModalOpen = false;

	function startQuiz(quizId: string) {}

	onMount(() => {
		data.streamed.remainingQuizzes.then((remainingQuizzes) => {
			localStorage.setItem('remainingQuizzes', JSON.stringify(remainingQuizzes));
		});
	});
</script>

<svelte:head>
	<title>인기 있는 퀴즈 - dual-brain</title>
	<meta name="description" content="가장 인기 있는 상식 퀴즈를 확인하고 도전해보세요." />
</svelte:head>

<div in:fade class="container">
	<DrawerHeader
		onClick={() => {
			goto('/');
		}}
	>
		듀얼브레인
	</DrawerHeader>

	<div class="title-container">
		<!-- <div class="title">🌟{data.name}에서 가장 인기있는 퀴즈는 무엇일까요?🌟</div> -->
		<div class="title">🚀 실시간 인기 {data.name} 퀴즈 🚀</div>
	</div>

	<div class="card-container">
		<div class="create-container">
			{#await data.streamed?.popularQuizzes}
				<div class="spinner-container">
					<Spinner />
				</div>
			{:then quizzes}
				{#each quizzes as quiz, index}
					<div class="ranking-list-item">
						<div class="rank">
							{index + 1}
						</div>
						<div class="rank-name">{quiz.question}</div>
						<div
							class="play-button"
							on:click={() => {
								const quizId = quiz.quizId;
								const queryPram = categoryId ? `?category=${categoryId}` : '';
								if (!$page?.data?.session?.user) {
									NonMemberModalOpen = true;
									return;
								}
								goto(`/quiz/${quizId}${queryPram}`);
							}}
							on:keydown={(e) => {}}
						>
							<PlayIcon />
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
			onclick={async () => {
				if (!$page?.data?.session?.user) {
					NonMemberModalOpen = true;
					return;
				}
				const quiz = await dequeueFromRemainingQuizzes({
					categoryId
				});
				const queryPram = categoryId ? `?category=${categoryId}` : '';
				if (!quiz) {
					goto(`/quiz/complete${queryPram}`);
					return;
				}
				goto(`/quiz/${quiz.id}${queryPram}`);

				// goto('/categories');
			}}
		>
			시작하기
		</Button>
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
	}
	.play-button {
		position: absolute;
		right: 10px;
	}

	.rank-name {
		font-family: Pretendard;
		font-size: 12px;
		font-style: normal;
		font-weight: 600;
		line-height: 22px; /* 122.222% */
		letter-spacing: -0.408px;
		text-overflow: ellipsis;
		padding-right: 30px;
		overflow: hidden;
		text-align: left;
		white-space: pre;
		z-index: 0;
	}

	.container {
		height: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
		background-color: rgba(83, 135, 247, 0.19);
	}

	.create-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		gap: 10px;
	}
	.ranking-list-item {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		height: 40px;
		flex-shrink: 0;
		border-radius: 10px;
		box-sizing: border-box;
		gap: 5px;
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
		max-height: 400px;
		height: 100%;
		overflow: scroll;
		margin-top: 15px;
	}
	.card-container::-webkit-scrollbar {
		display: none;
	}
	.isMe {
		background-color: #a2bdf8;
		color: white;
	}
	.title-container {
		display: flex;
		justify-content: center;
		padding-right: 16px;
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
		font-size: 18px;
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
