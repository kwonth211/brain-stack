<!-- QuizPage.svelte -->
<script lang="ts">
	import Header from '$components/Header.svelte';
	import { goto } from '$app/navigation';
	import CreateQuiz from '$lib/CreateQuiz.svelte';
</script>

<div style="height: 100%;">
	<Header
		onClick={() => {
			goto('/');
		}}>퀴즈 출제하기</Header
	>

	<CreateQuiz />
</div>
