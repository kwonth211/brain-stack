<script lang="ts">
	import { goto } from '$app/navigation';
	import Header from '$components/Header.svelte';
</script>

<div style="height: 100%;">
	<Header
		onClick={() => {
			goto('/');
		}}
		>밸런스 퀴즈
		<!-- <span
			style="position: absolute; top: 7px; right: 10px; cursor: pointer;"
			on:click={handleFeedbackClick}
			on:keydown={(e) => {
				if (e.key === 'Enter') {
					handleFeedbackClick(e);
				}
			}}
		>
			<QuestionIcon />
		</span> -->
	</Header>
	준비중..
</div>
