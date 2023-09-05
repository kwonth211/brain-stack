<!-- QuizPage.svelte -->
<script lang="ts">
	import Header from '$components/Header.svelte';
	import Quiz from '$components/Quiz.svelte';
	import type { Quiz as QuizType } from '../../types/quiz';
	import { writable } from 'svelte/store';
	import { goto } from '$app/navigation';

	export let data;
	const {
		unsolvedQuizzes,
		solvedCount: _solvedCount,
		totalCount,
		correctCount: _correctCount
	} = data;

	let solvedCount = _solvedCount ?? 0;
	let correctCount = _correctCount ?? 0;

	const currentQuiz = writable<QuizType | null>(null);

	let unsolvedIndexes = Array.from({ length: unsolvedQuizzes?.length ?? 0 }, (_, i) => i);

	const getRandomIndex = () => {
		const randomIndex = Math.floor(Math.random() * unsolvedIndexes.length);
		return unsolvedIndexes[randomIndex];
	};

	const initialIndex = getRandomIndex();
	currentQuiz.set(unsolvedQuizzes?.[initialIndex]);
	unsolvedIndexes = unsolvedIndexes.filter((index) => index !== initialIndex);

	const handleNext = () => {
		if (!unsolvedQuizzes || unsolvedIndexes.length === 0) {
			// goto('/result');
			// return;
			return;
		}

		const randomIndex = getRandomIndex();
		currentQuiz.set(null); // Add this line
		setTimeout(() => currentQuiz.set(unsolvedQuizzes[randomIndex]));
		unsolvedIndexes = unsolvedIndexes.filter((index) => index !== randomIndex);
	};
</script>

<div style="height: 100%;">
	<Header
		onClick={() => {
			goto('/main');
		}}>상식 퀴즈</Header
	>

	{#if $currentQuiz}
		<Quiz
			onNext={handleNext}
			{solvedCount}
			totalCount={totalCount ?? 0}
			correctCount={correctCount ?? 0}
			onCheckAnswer={(isCorrect) => {
				solvedCount++;

				if (isCorrect) {
					correctCount++;
				}
			}}
			quiz={$currentQuiz}
		/>
	{:else}
		<div>Loading...</div>
	{/if}
</div>
