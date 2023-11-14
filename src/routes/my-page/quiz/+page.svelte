<!-- QuizPage.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import MyQuizCard from '$components/MyQuizCard.svelte';
	import DrawerHeader from '$components/DrawerHeader.svelte';

	export let data;

	const { totalQuizzes } = data;
</script>

<div style="height: 100%;">
	<DrawerHeader
		onClick={() => {
			goto('/my-page');
		}}>푼 퀴즈</DrawerHeader
	>

	<div class="my-quiz-card-container">
		{#each totalQuizzes as { id, question, quiz_answer, user_answer, category_id, is_correct, option1, option2, option3, option4 } (id)}
			<MyQuizCard
				{question}
				{category_id}
				quizAnswer={quiz_answer}
				userAnswer={user_answer}
				isCorrect={is_correct}
				{option1}
				{option2}
				{option3}
				{option4}
			/>
		{/each}
	</div>
	<!-- <MyQuiz /> -->
</div>

<style>
	.my-quiz-card-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 20px;
		gap: 7px;
	}
</style>
