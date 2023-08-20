<!-- QuizPage.svelte -->
<script lang="ts">
	import Header from '$components/Header.svelte';
	import Quiz from '$components/Quiz.svelte';
	import { writable } from 'svelte/store';
	import { goto } from '$app/navigation';

	let quizIndex = 0;
	export let data;
	const { quizzes } = data;
	const currentQuiz = writable<any>(quizzes[quizIndex]);

	const submitAnswer = async (answerId: number) => {};

	const handleNext = () => {
		quizIndex = (quizIndex + 1) % quizzes.length;
		currentQuiz.set(null); // Add this line
		setTimeout(() => currentQuiz.set(quizzes[quizIndex])); // And change this line
	};
</script>

<div style="height: 100%;">
	<Header
		onClick={() => {
			goto('/main');
		}}>상식 퀴즈</Header
	>

	{#if $currentQuiz}
		<Quiz onNext={handleNext} {quizzes} quiz={$currentQuiz} />
	{:else}
		<div>Loading...</div>
	{/if}
</div>

<style>
	.content {
		height: 100%;
	}
</style>
