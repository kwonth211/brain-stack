<!-- QuizPage.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import CreateQuiz from '$lib/CreateQuiz.svelte';
	import DrawerHeader from '$components/DrawerHeader.svelte';
</script>

<div style="height: 100%;">
	<DrawerHeader
		onClick={() => {
			goto('/');
		}}>퀴즈 출제하기</DrawerHeader
	>

	<CreateQuiz />
</div>
