<!-- QuizPage.svelte -->
<script lang="ts">
	import Header from '$components/Header.svelte';
	import Quiz from '$components/Quiz.svelte';
	import { writable } from 'svelte/store';
	import { goto } from '$app/navigation';
	import CreateQuiz from '$lib/CreateQuiz.svelte';

	let quizIndex = 0;
	export let data;
</script>

<div style="height: 100%;">
	<Header
		onClick={() => {
			goto('/main');
		}}>퀴즈 만들기</Header
	>

	<CreateQuiz />
</div>

<style>
	.content {
		height: 100%;
	}
</style>
