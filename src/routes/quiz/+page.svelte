<!-- QuizPage.svelte -->
<script lang="ts">
	import Header from '$components/Header.svelte';
	import Quiz from '$components/Quiz.svelte';
	import { writable } from 'svelte/store';
	let quizIndex = 0;
	export let data;
	const { quizzes } = data;
	const currentQuiz = writable<any>(quizzes[quizIndex]);

	const submitAnswer = async (answerId: number) => {};

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
