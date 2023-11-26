<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	import IssueModal from '$components/IssueModal.svelte';
	import Quiz from '$components/Quiz.svelte';
	import QuizComplete from '$components/QuizComplete.svelte';
	import QuestionIcon from '$components/icons/QuestionIcon.svelte';
	import AdminFeedbackModal from '$components/AdminFeedbackModal.svelte';
	import axios from 'axios';
	import { page } from '$app/stores';
	import { CATEGORY } from '$types/categories';
	import { dequeueFromRemainingQuizzes, getRemainingQuizzes } from '$utils/window/utils';
	import { quizzes } from '$mock/quizzes.js';
	import DrawerHeader from '$components/DrawerHeader.svelte';
	import GoogleAdsense from '$lib/GoogleAdSense.svelte';

	export let data;
	// TODO rank구현
	$: rankings = [] as any;
	const {
		currentQuiz,
		solvedCount: _solvedCount,
		unSolvedCount: _unsolvedCount,
		correctCount: _correctCount,
		isAlreadySolved,
		userAnswer
	} = data;

	let solvedCount = _solvedCount ?? 0;
	let correctCount = _correctCount ?? 0;
	let unSolvedCount = _unsolvedCount ?? 0;
	let showFeedbackModal = false;
	let showAdminFeedbackModal = false;
	const categoryId = Number($page.url.searchParams.get('category') as keyof typeof CATEGORY);

	const handleNext = async () => {
		const nextQuiz = await dequeueFromRemainingQuizzes({
			categoryId
		});
		if (!nextQuiz) {
			goto('/quiz/complete', {
				replaceState: true
			});
			return;
		}
		const nextUrl = categoryId
			? `/quiz/${nextQuiz.id}?category=${categoryId}`
			: `/quiz/${nextQuiz.id}`;
		window.location.href = nextUrl;
	};
	const handleFeedbackClick = (e: MouseEvent | KeyboardEvent) => {
		e.stopPropagation();
		showFeedbackModal = true;
	};

	async function fetchRankings(categoryId: string) {
		// const params = categoryId !== '0' ? { categoryId } : {};
		// const response = await axios.get(`/api/ranking`, {
		// 	params
		// });
	}

	const pageTitle = currentQuiz?.question;
	const metaDescription = `${currentQuiz?.option1}, ${currentQuiz?.option2}, ${currentQuiz?.option3}, ${currentQuiz?.option4}. ${currentQuiz?.explanation}`;
	const quizCategory = CATEGORY[categoryId as unknown as keyof typeof CATEGORY] ?? '상식';

	onMount(async () => {
		await fetchRankings(String(categoryId));
	});
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={metaDescription} />

	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={metaDescription} />
	<!-- <script
		async
		src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3415763008354504"
		crossorigin="anonymous"
	></script> -->
</svelte:head>

<div style="height: 100%;">
	<!-- onBack={(e) => {
			e.stopPropagation();
			goto('/common/start');
		}} -->
	<DrawerHeader
		onClick={() => {
			goto('/');
		}}
		>{quizCategory} 퀴즈
	</DrawerHeader>

	{#if currentQuiz}
		<Quiz
			onNext={handleNext}
			{correctCount}
			{unSolvedCount}
			{isAlreadySolved}
			{userAnswer}
			ranking={rankings}
			onCheckAnswer={(isCorrect) => {
				solvedCount++;
				unSolvedCount--;

				if (isCorrect) {
					correctCount++;
				}
			}}
			quiz={currentQuiz}
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
						quizId: currentQuiz?.id,
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

	<GoogleAdsense />
</div>
