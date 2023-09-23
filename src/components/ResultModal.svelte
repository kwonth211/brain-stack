<script lang="ts">
	import type { Quiz } from '../types/quiz';

	import ResultCard from './ResultCard.svelte';
	export let isCorrect: boolean;
	export let close: () => void;
	export let answer: string;
	export let quiz: Quiz;
	let modal: EventTarget;
	export let explanation: Quiz['explanation'];
</script>

<div
	class="modal"
	bind:this={modal}
	on:keydown={() => {}}
	on:click={(e) => {
		if (e.target === modal) close();
	}}
>
	<ResultCard {answer} {isCorrect} {quiz} />
</div>

<style>
	.modal {
		position: fixed;
		bottom: 25%;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
