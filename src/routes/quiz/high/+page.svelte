<!-- QuizPage.svelte -->
<script lang="ts">
	import Header from '$components/Header.svelte';
	import type { Quiz as QuizType } from '$types/quiz';
	import { writable } from 'svelte/store';
	import { goto } from '$app/navigation';
	import QuizComplete from '$components/QuizComplete.svelte';
	import HighQUiz from '$components/HighQuiz.svelte';

	export let data;
	const {
		unsolvedQuizzes,
		solvedCount: _solvedCount,
		totalCount,
		correctCount: _correctCount
	} = data;

	let solvedCount = _solvedCount ?? 0;
	let correctCount = _correctCount ?? 0;
	let showFeedbackModal = false;

	const handleFeedbackClick = () => {
		showFeedbackModal = true;
	};
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
		}}
		>넌센스 퀴즈
		<span
			style="position: absolute; top: 10px; right: 10px; cursor: pointer;"
			on:click={handleFeedbackClick}
			on:keydown={(e) => {
				if (e.key === 'Enter') {
					handleFeedbackClick();
				}
			}}
		/>
	</Header>

	{#if $currentQuiz}
		<HighQUiz
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
		<QuizComplete />
	{/if}

	{#if showFeedbackModal}
		<div
			style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center;"
		>
			<div style="background: white; padding: 20px; border-radius: 5px;">
				<h2>문제 신고하기</h2>
				<textarea placeholder="문제에 대한 설명을 입력해주세요." />
				<button on:click={() => (showFeedbackModal = false)}>제출</button>
			</div>
		</div>
	{/if}
</div>
