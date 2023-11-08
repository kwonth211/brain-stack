<script>
	import { fade } from 'svelte/transition';
	import Footer from '$components/Footer.svelte';
	import { goto } from '$app/navigation';

	import DrawerHeader from '$components/DrawerHeader.svelte';

	const lessThan50 = [
		'천천히 시작하는 것도 중요해요. 계속해서 더 많은 퀴즈를 풀어보면 더 많은 것을 배울 수 있어요!',
		'모든 여정은 첫 걸음부터 시작되니까요. 조금씩 더 많은 퀴즈를 풀어보면 어느새 전문가가 될 거에요.',
		'아직 시작 단계일 뿐이에요. 계속 노력하면 더 많은 성취를 이룰 수 있을 거에요!'
	];

	const lessThan100 = [
		'조금만 더 도전해서 퀴즈왕이 되어보세요!',
		'이미 꽤나 많은 퀴즈를 풀어보셨군요! 계속 노력하면 더 좋은 결과가 있을 거에요.',
		'이미 꽤나 많은 퀴즈를 풀어보셨군요! 다음 목표는 100개를 넘어서는 것이에요!'
	];

	const moreThan100 = [
		'아주 잘하고 있어요!',
		'와우, 정말 열심히 하셨군요! 이런 노력이면 분명 큰 성과를 얻을 수 있을 거에요.',
		'와우, 100개 이상의 퀴즈를 풀었다니 대단해요! 이제는 퀴즈의 달인이라고 불러도 될 것 같네요.'
	];

	const messages = [
		'<b>지식을 키워줄 퀴즈!</b><br />오늘도 지식을 함께 키워보아요.',
		'<b>지식의 향연!</b><br />새로운 지식의 세계를 함께 탐험해보세요.',
		'<b>오늘의 흥미진진한 퀴즈!</b><br />무슨 퀴즈가 준비되어 있는지 확인해보세요.',
		'<b>놓치면 후회할 퀴즈의 세계!</b><br />다양한 퀴즈로 지식을 늘려보세요.',
		'<b>당신을 위한 퀴즈!</b><br />함께 퀴즈를 즐겨보세요.',
		'<b>놀라운 퀴즈의 세계!</b><br />다양한 퀴즈로 당신의 지식을 테스트해보세요.',
		'<b>300여개의 퀴즈가 준비되어 있어요!</b><br />어떤 퀴즈부터 시작하실지 선택해보세요.'
	];

	const randomMessage = () => {
		const randomIndex = Math.floor(Math.random() * messages.length);
		return messages[randomIndex];
	};

	const quizList = [
		{
			title: '상식 Brain',
			icon: '🧠',
			path: '/common/start'
		},
		{
			title: '넌센스 Brain',
			icon: '💫',
			path: '/quiz/high'
		},
		{
			title: '사자성어 Brain',
			icon: '📖',
			path: '/idiom/start'
		},
		{
			title: '동물 Brain',
			icon: '🐶',
			path: '/animal/start'
		}
	];
</script>

<div in:fade class="container">
	<DrawerHeader
		hasBack={false}
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
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #dfe9fe;
		min-height: 100vh;
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
		overflow-y: auto;
		padding-bottom: 70px;
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
		margin-top: 90px;
	}
</style>
