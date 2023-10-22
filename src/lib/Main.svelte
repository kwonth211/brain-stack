<script>
	import { fade } from 'svelte/transition';
	import Footer from '$components/Footer.svelte';
	import QuizIcon from '$components/icons/QuizIcon.svelte';
	import { goto } from '$app/navigation';
	import KaKaoAddFit from '$components/KaKaoAddFit.svelte';
	import Header from '$components/Header.svelte';
	import CommonQuizIcon from '$components/icons/CommonQuizIcon.svelte';
	import CommonQuizIconReverse from '$components/icons/CommonQuizIconReverse.svelte';
	import NonSenseQuizIcon from '$components/icons/NonSenseQuizIcon.svelte';
	import NonSenseQuizReverseIcon from '$components/icons/NonSenseQuizReverseIcon.svelte';
	import Hamburger from '$components/icons/Hamburger.svelte';
	import DrawerHeader from '$components/DrawerHeader.svelte';
	import BalanceQuiz from '$components/BalanceQuiz.svelte';
	import VsIcon from '$components/VSIcon.svelte';
	import Lightning from '$components/icons/Lightning.svelte';

	// export let data;

	// const { user, totalQuizzes } = data;

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

	// const getCheerUpText = () => {
	// 	if (!totalQuizzes && totalQuizzes !== 0) {
	// 		return '';
	// 	}

	// 	if (totalQuizzes < 50) {
	// 		return lessThan50[Math.floor(Math.random() * lessThan50.length)];
	// 	} else if (totalQuizzes < 100) {
	// 		return lessThan100[Math.floor(Math.random() * lessThan100.length)];
	// 	} else {
	// 		return moreThan100[Math.floor(Math.random() * moreThan100.length)];
	// 	}
	// };

	const messages = [
		'<b>지식을 키워줄 퀴즈!</b><br />오늘도 지식을 함께 키워보아요.',
		'<b>지식의 향연!</b><br />새로운 지식의 세계를 함께 탐험해보세요.',
		'<b>오늘의 흥미진진한 퀴즈!</b><br />무슨 퀴즈가 준비되어 있는지 확인해보세요.',
		'<b>놓치면 후회할 퀴즈의 세계!</b><br />다양한 퀴즈로 지식을 늘려보세요.',
		'<b>당신을 위한 퀴즈!</b><br />함께 퀴즈를 즐겨보세요.',
		'<b>놀라운 퀴즈의 세계!</b><br />다양한 퀴즈로 당신의 지식을 테스트해보세요.',
		'<b>200여개의 퀴즈가 준비되어 있어요!</b><br />어떤 퀴즈부터 시작하실지 선택해보세요.'
	];

	const randomMessage = () => {
		const randomIndex = Math.floor(Math.random() * messages.length);
		return messages[randomIndex];
	};
</script>

<div in:fade class="container">
	<DrawerHeader
		hasBack={false}
		onClick={() => {
			goto('/');
		}}
	/>

	<div class="card-container">
		<div class="quiz-container">
			<div class="cheer-up-text">
				{@html randomMessage()}
				<!-- {getCheerUpText()} -->
			</div>
			<div
				class="common-sense-card"
				on:click={() => {
					// goto('/categories')
					goto('/common/start');
				}}
				on:keydown={() => {}}
			>
				<div class="quiz-content">
					<CommonQuizIcon />
					<div>상식 퀴즈</div>
					<CommonQuizIconReverse />
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
				<div class="high-quiz-content">
					<NonSenseQuizIcon />
					<div>넌센스 퀴즈</div>
					<NonSenseQuizReverseIcon />
				</div>
			</div>

			<!-- <div
				class="balance-quiz-card"
				on:click={() => {
					goto('/balance/start');
				}}
				on:keydown={() => {
					goto('/balance/start');
				}}
			>
				<BalanceQuiz />
		
			</div> -->

			<div
				class="balance-quiz-card"
				on:click={() => {
					goto('/balance/start');
				}}
				on:keydown={() => {
					goto('/balance/start');
				}}
			>
				<div class="balance-text-center">
					<div class="balance-text">밸런스</div>
					<div class="balance-quiz-text">&nbsp;퀴즈</div>
				</div>
				<div class="trapezoid-left" />
				<div class="trapezoid-right" />
				<VsIcon style="position: absolute;left: 26px;top: 40%;" />
				<Lightning style="position: absolute;right: 26px;top: 30%;" />
			</div>
		</div>
	</div>
	<div class="outer-container" />
	<!-- <KaKaoAddFit /> -->
	<Footer />
</div>

<style>
	.balance-text-center {
		position: absolute;
		left: 49%;
		top: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		z-index: 1;
	}
	.balance-text {
		color: black;
	}
	.balance-quiz-text {
		color: white;
	}
	.container {
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: #dfe9fe;
	}
	.quiz-content {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		color: #fff;
		font-family: Pretendard;
		font-size: 16px;
		font-style: normal;
		font-weight: 700;
		line-height: 22px; /* 137.5% */
		letter-spacing: -0.408px;
	}

	.high-quiz-content {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		color: #5387f7;
		font-family: Pretendard;
		font-size: 16px;
		font-style: normal;
		font-weight: 700;
		line-height: 22px; /* 137.5% */
		letter-spacing: -0.408px;
	}
	.quiz-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100%;
		background-color: #dfe9fe;
		padding-left: 40px;
		padding-right: 40px;
		gap: 10px;
		margin-bottom: 50px;
	}

	.common-sense-card {
		width: 100%;
		height: 121px;
		flex-shrink: 0;
		border-radius: 15px;
		justify-content: center;
		background: #5387f7;
		padding-left: 20px;
		padding-right: 20px;
		color: white;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		z-index: 2;
	}
	.high-sense-card {
		border-radius: 15px;
		width: 100%;
		height: 121px;
		flex-shrink: 0;
		color: white;
		display: flex;
		flex-direction: column;
		justify-content: center;
		box-sizing: border-box;
		padding-right: 20px;
		padding-left: 20px;
		z-index: 2;
		background-color: #dfe9fe;
	}

	.outer-container {
		width: 100%;
		height: 66%;
		bottom: 0;
		position: absolute;
		border-radius: 212.5px 212.5px 0px 0px;
		background: #f1f6ff;
	}
	.card-container {
		display: flex;
		flex-direction: column;
		background-color: white;
		height: 100%;
		background: #fff;
		gap: 10px;
	}
	.cheer-up-text {
		font-size: 15px;
		font-style: normal;
		letter-spacing: -0.108px;
		line-height: 18px;
		margin-top: 3px;
		font-weight: 400;

		color: #000;
		font-family: Pretendard;
		font-size: 21px;
		font-style: normal;
		line-height: 27px;
		letter-spacing: -0.408px;
		margin-bottom: 12px;
	}

	.balance-quiz-card {
		position: relative;
		height: 121px;
		border-radius: 15px;
		position: relative;
		background-color: #ffe27a; /* 이것은 뒷면의 사다리꼴 색상입니다. */
		overflow: hidden;
		z-index: 2;
	}

	.trapezoid-left {
		content: '';
		display: block;
		width: 60%; /* 왼쪽 사다리꼴의 너비를 조정하여 절반에 가깝게 만듭니다. */
		height: 100%;
		background-color: #ffe27a;
		clip-path: polygon(0% 0%, 100% 0%, 0% 100%, 0% 100%);
		position: absolute;
		top: 0;
		left: 0;
	}

	.trapezoid-right {
		content: '';
		display: block;
		width: 60%; /* 오른쪽 사다리꼴의 너비를 조정하여 절반에 가깝게 만듭니다. */
		height: 100%;
		background-color: #5387f7;
		clip-path: polygon(100% 0%, 100% 258%, 0% 0%, 100% 0%);
		position: absolute;
		top: 0;
		right: 0;
	}
</style>
