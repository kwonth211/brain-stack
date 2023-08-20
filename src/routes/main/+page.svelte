<script>
	import { fade } from 'svelte/transition';
	import Footer from '$components/Footer.svelte';
	import QuizIcon from '$components/icons/QuizIcon.svelte';
	import { goto } from '$app/navigation';
</script>

<div in:fade class="container">
	<div class="outer-container">
		<div class="title">홍길동님,</div>
		<div class="content">총 50개의 퀴즈를 푸셨어요! <br /> 아주 잘하고 있습니다!</div>
	</div>
	<div class="card-container">
		<div class="quiz-container">
			<div>내가 만들기</div>
			<div class="create-container">
				<div class="create-quiz-card">퀴즈 만들기</div>
				<div class="create-quiz-card">질문 생성하기</div>
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
			<div class="high-sense-card">
				<span style="font-size: 55px;">🗣️</span>
				<div class="quiz-content">
					<div>아재 퀴즈</div>
					<QuizIcon color="#5387F7" />
				</div>
			</div>
		</div>
	</div>
	<Footer />
</div>

<style>
	.container {
		height: 100vh;
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
		background: #dae6ff;
		width: 100%;
		height: 121px;
		flex-shrink: 0;
		color: #5387f7;
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
		margin: 100px 10px 10px 15px;
		gap: 10px;
	}
	.card-container {
		display: flex;
		flex-direction: column;
		padding: 15px;
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
</style>
