<!-- QuizPage.svelte -->
<script lang="ts">
	import Header from '$components/Header.svelte';
	import Quiz from '$components/Quiz.svelte';
	import type { Quiz as QuizType } from '../../types/quiz';

	import { writable } from 'svelte/store';
	import { goto } from '$app/navigation';

	let quizIndex = 0;
	export let data;
	const { unsolvedQuizzes, solvedCount: _solvedCount, totalCount } = data;

	let solvedCount = _solvedCount ?? 0;
	const currentQuiz = writable<QuizType | null>(unsolvedQuizzes?.[quizIndex] ?? null);
	const handleNext = () => {
		if (!unsolvedQuizzes) {
			return;
		}
		quizIndex = (quizIndex + 1) % unsolvedQuizzes.length;
		currentQuiz.set(null); // Add this line
		setTimeout(() => currentQuiz.set(unsolvedQuizzes[quizIndex])); // And change this line

		solvedCount++;

		// if (solvedCount === totalCount) {
		// 	goto('/result');
	};
</script>

<div style="height: 100%;">
	<Header
		onClick={() => {
			goto('/main');
		}}>상식 퀴즈</Header
	>

	{#if $currentQuiz}
		<Quiz onNext={handleNext} {solvedCount} totalCount={totalCount ?? 0} quiz={$currentQuiz} />
	{:else}
		<div>Loading...</div>
	{/if}
</div>
