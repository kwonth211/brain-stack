<!-- QuizPage.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import Header from '$components/Header.svelte';
	import Quiz from '$components/Quiz.svelte';
	import { writable } from 'svelte/store';
	import { quizzes } from '$mock/quizzes.ts';
	let quiz = null;
	let quizIndex = 0;
	const currentQuiz = writable<any>(quizzes[quizIndex]);
	const fetchQuiz = async () => {};

	const submitAnswer = async (answerId: number) => {
		// TODO: Implement this function to submit the answer to the backend
		// and get the next quiz
	};

	onMount(async () => {
		quiz = await fetchQuiz();
	});

	const selectAnswer = () => {
		quizIndex = (quizIndex + 1) % quizzes.length;
		currentQuiz.set(null); // Add this line
		setTimeout(() => currentQuiz.set(quizzes[quizIndex])); // And change this line
	};
</script>

<div>
	<Header>상식 퀴즈</Header>

	<div class="content">
		{#if $currentQuiz}
			<Quiz onclick={selectAnswer} quiz={$currentQuiz} />
		{:else}
			<div>Loading...</div>
		{/if}
	</div>
</div>

<style>
</style>
