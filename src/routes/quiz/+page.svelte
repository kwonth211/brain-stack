<!-- QuizPage.svelte -->
<script lang="ts">
	import Header from '$components/Header.svelte';
	import Quiz from '$components/Quiz.svelte';
	import type { Quiz as QuizType } from '../../types/quiz';
	import { writable } from 'svelte/store';
	import { goto } from '$app/navigation';
	import QuizComplete from '$components/QuizComplete.svelte';
	import QuestionIcon from '$components/icons/QuestionIcon.svelte';
	import IssueModal from '$components/IssueModal.svelte';
	import AdminFeedbackModal from '$components/AdminFeedbackModal.svelte';
	import axios from 'axios';

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
	let showAdminFeedbackModal = false;
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
			currentQuiz.set(null); // Add this line
			return;
		}

		const randomIndex = getRandomIndex();
		currentQuiz.set(null); // Add this line
		setTimeout(() => currentQuiz.set(unsolvedQuizzes[randomIndex]));
		unsolvedIndexes = unsolvedIndexes.filter((index) => index !== randomIndex);
	};

	const handleFeedbackClick = (e: MouseEvent | KeyboardEvent) => {
		e.stopPropagation();
		showFeedbackModal = true;
	};
</script>

<div style="height: 100%;">
	<Header
		onClick={() => {
			goto('/');
		}}
		>상식 퀴즈
		<span
			style="position: absolute; top: 7px; right: 10px; cursor: pointer;"
			on:click={handleFeedbackClick}
			on:keydown={(e) => {
				if (e.key === 'Enter') {
					handleFeedbackClick(e);
				}
			}}
		>
			<QuestionIcon />
		</span>
	</Header>

	{#if $currentQuiz}
		<Quiz
			onNext={handleNext}
			correctCount={correctCount ?? 0}
			unSolvedCount={unsolvedQuizzes?.length ?? 0}
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
		<IssueModal
			onClose={() => {
				showFeedbackModal = false;
			}}
			onSubmit={async (value) => {
				try {
					showFeedbackModal = false;
					await axios.post('/api/feedback/create', {
						quizId: $currentQuiz?.id,
						content: value
					});
					showAdminFeedbackModal = true;
				} catch (error) {}
			}}
		/>
	{/if}

	{#if showAdminFeedbackModal}
		<AdminFeedbackModal
			close={() => {
				showAdminFeedbackModal = false;
			}}
		/>
	{/if}
</div>
