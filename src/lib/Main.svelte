<script>
	import { fade } from 'svelte/transition';
	import Footer from '$components/Footer.svelte';
	import { goto } from '$app/navigation';
	import DrawerHeader from '$components/DrawerHeader.svelte';
	import YoutubeModal from '$components/YoutubeModal.svelte';
	import { onMount } from 'svelte';

	const messages = [
		'<b>지식을 키워줄 퀴즈!</b><br />오늘도 지식을 함께 키워보아요.',
		'<b>지식의 향연!</b><br />새로운 지식의 세계를 함께 탐험해보세요.',
		'<b>오늘의 흥미진진한 퀴즈!</b><br />무슨 퀴즈가 준비되어 있는지 확인해보세요.',
		'<b>놓치면 후회할 퀴즈의 세계!</b><br />다양한 퀴즈로 지식을 늘려보세요.',
		'<b>당신을 위한 퀴즈!</b><br />함께 퀴즈를 즐겨보세요.',
		'<b>놀라운 퀴즈의 세계!</b><br />다양한 퀴즈로 당신의 지식을 테스트해보세요.',
		'<b>500여개의 퀴즈가 준비되어 있어요!</b><br />어떤 퀴즈부터 시작하실지 선택해보세요.'
	];

	const randomMessage = () => {
		const randomIndex = Math.floor(Math.random() * messages.length);
		return messages[randomIndex];
	};
	let isYoutubeModalOpen = false;
	onMount(() => {
		const showModal = sessionStorage.getItem('isYoutubeModalShown');
		if (!showModal) {
			isYoutubeModalOpen = true;
		}
	});

	const quizList = [
		{
			title: '종합 Brain',
			icon: '🧠',
			path: '/common/start'
		},
		{
			title: '과학 Brain',
			icon: '🔬',
			path: '/science/start'
		},
		{
			title: '역사 Brain',
			icon: '📜',
			path: '/history/start'
		},
		{
			title: '사자성어 Brain',
			icon: '📖',
			path: '/idiom/start'
		},
		{
			title: '지리 Brain',
			icon: '🌍',
			path: '/geography/start'
		},
		{
			title: '기술 및 컴퓨터 Brain',
			icon: '💻',
			path: '/tech/start'
		},
		{
			title: '동물 Brain',
			icon: '🐶',
			path: '/animal/start'
		},
		{
			title: '스포츠 Brain',
			icon: '🏃‍♂️',
			path: '/sport/start'
		}
	];
</script>

<div in:fade class="container">
	<DrawerHeader
		onClick={() => {
			goto('/');
		}}
	/>

	<div class="quiz-container">
		<div class="cheer-up-text">
			{@html randomMessage()}
		</div>
		<div class="card-container">
			{#each quizList as quiz}
				<div
					class="common-sense-card"
					on:click={() => {
						goto(quiz.path);
					}}
					on:keydown={() => {
						goto(quiz.path);
					}}
				>
					<div class="quiz-content">
						<div class="icon-content">{quiz.icon}</div>

						<div>{quiz.title}</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
	{#if isYoutubeModalOpen}
		<YoutubeModal
			close={() => {
				isYoutubeModalOpen = false;
				sessionStorage.setItem('isYoutubeModalShown', 'true');
			}}
		/>
	{/if}
	<Footer />
</div>

<style>
	.icon-content {
		position: absolute;
		left: 20px;
		font-size: 30px;
	}
	.container {
		position: relative;
		display: flex;
		flex-direction: column;
		background-color: #dfe9fe;
		padding-bottom: var(--footer-height);
	}
	.quiz-content {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		position: relative;
		font-family: Pretendard;
		font-size: 18px;
		font-style: normal;
		font-weight: 700;
		line-height: 22px;
		letter-spacing: -0.408px;
		flex: 1;
		overflow: auto;
	}

	.quiz-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100%;
		background-color: #dfe9fe;
		padding-left: 14px;
		padding-right: 14px;
		gap: 10px;
		flex: 1;
		padding-bottom: 50px;
	}

	.common-sense-card {
		width: 100%;
		height: 121px;
		flex-shrink: 0;
		border-radius: 15px;
		justify-content: center;
		background: white;
		color: black;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	}

	.card-container {
		display: flex;
		gap: 10px;
		flex-direction: column;
	}
	.cheer-up-text {
		font-size: 21px;
		font-weight: 400;
		color: #5a5a5a;
		font-family: 'Pretendard', sans-serif;
		line-height: 1.3;
		letter-spacing: 0.5px;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
		border-radius: 4px;
		padding: 10px;
		display: inline-block;
		margin-top: 20px;
	}
</style>
