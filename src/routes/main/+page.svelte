<script>
	import { fade } from 'svelte/transition';
	import Footer from '$components/Footer.svelte';
	import QuizIcon from '$components/icons/QuizIcon.svelte';
	import { goto } from '$app/navigation';
	import KaKaoAddFit from '$components/KaKaoAddFit.svelte';
	import KaKaoMiniAddFit from '$components/KaKaoMiniAddFit.svelte';

	export let data;

	const { user, totalQuizzes } = data;

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

	const getCheerUpText = () => {
		if (!totalQuizzes && totalQuizzes !== 0) {
			return '';
		}

		if (totalQuizzes < 50) {
			return lessThan50[Math.floor(Math.random() * lessThan50.length)];
		} else if (totalQuizzes < 100) {
			return lessThan100[Math.floor(Math.random() * lessThan100.length)];
		} else {
			return moreThan100[Math.floor(Math.random() * moreThan100.length)];
		}
	};
</script>

<div in:fade class="container">
	<div class="outer-container">
		<div class="title">{user?.nickname ?? '회원'} 님,</div>
		<div class="content">
			총 <span class="total-quiz">{totalQuizzes}</span>개의 퀴즈를 푸셨어요<br />
			<div class="cheer-up-text">
				<!-- {getCheerUpText()} -->
			</div>
		</div>
	</div>
	<div class="card-container">
		<div class="quiz-container">
			<div class="create-container">
				<div
					class="create-quiz-card"
					on:click={() => {
						goto('/quiz/create');
					}}
					on:keydown={() => {
						goto('/quiz/create');
					}}
				>
					퀴즈 출제하기
				</div>
			</div>
			<div class="select-quiz">퀴즈 고르기</div>
			<div
				class="common-sense-card"
				on:click={() => {
					goto('/categories');
				}}
				on:keydown={() => {}}
			>
				<span style="font-size: 55px;">💡</span>
				<div class="quiz-content">
					<div>상식 퀴즈</div>
					<QuizIcon />
				</div>
			</div>
			<div
				class="high-sense-card"
				on:click={() => {
					goto('/quiz/high');
				}}
				on:keydown={() => {
					goto('/quiz/high');
				}}
			>
				<span style="font-size: 55px;">🙃</span>
				<div class="quiz-content">
					<div>넌센스 퀴즈</div>
					<QuizIcon color="white" />
				</div>
			</div>
		</div>
	</div>
	<KaKaoAddFit />
	<Footer />
</div>

<style>
	.container {
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: rgba(83, 135, 247, 0.19);
	}
	.quiz-content {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.quiz-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100%;
		gap: 10px;
		margin-bottom: 50px;
	}
	.select-quiz {
		margin-top: 10px;
	}
	.create-container {
		display: flex;
		flex-direction: row;
		gap: 10px;
	}
	.create-quiz-card {
		width: 100%;
		border-radius: 10px;
		background: #f3f4f6;
		height: 59px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #434343;
		text-align: center;
		font-family: Pretendard;
		font-size: 16px;
		font-style: normal;
		font-weight: 500;
		line-height: 22px; /* 137.5% */
		letter-spacing: -0.408px;
	}
	.common-sense-card {
		width: 100%;
		height: 121px;
		flex-shrink: 0;
		border-radius: 15px;
		background: #5387f7;
		color: white;
		display: flex;
		justify-content: flex-end;
		flex-direction: column;
		box-sizing: border-box;
		padding-bottom: 15px;
		padding-left: 15px;
	}
	.high-sense-card {
		border-radius: 15px;
		background: var(--high);
		width: 100%;
		height: 121px;
		flex-shrink: 0;
		color: white;
		display: flex;
		justify-content: flex-end;
		flex-direction: column;
		box-sizing: border-box;
		padding-bottom: 15px;
		padding-left: 15px;
	}
	.outer-container {
		display: flex;
		flex-direction: column;
		margin: 40px 10px 10px 15px;
		gap: 10px;
	}
	.card-container {
		display: flex;
		flex-direction: column;
		padding: 15px 15px 0px 15px;
		background-color: white;
		margin-left: 15px;
		margin-right: 15px;
		height: 100%;
		border-radius: 27px 27px 0px 0px;
		background: #fff;
		gap: 10px;
	}
	.title {
		color: #000;
		font-family: Pretendard;
		font-size: 23px;
		font-style: normal;
		font-weight: 700;
		line-height: 22px; /* 95.652% */
		letter-spacing: -0.408px;
	}
	.content {
		color: #000;
		font-family: Pretendard;
		font-size: 18px;
		font-style: normal;
		font-weight: 300;
		line-height: 22px;
		letter-spacing: -0.408px;
	}
	.total-quiz {
		font-weight: 700;
		color: var(--primary);
	}
	.cheer-up-text {
		color: #000;
		font-family: Pretendard;
		font-size: 15px;
		font-style: normal;
		letter-spacing: -0.108px;
		line-height: 18px;
		margin-top: 3px;
		font-weight: 400;
	}
</style>
