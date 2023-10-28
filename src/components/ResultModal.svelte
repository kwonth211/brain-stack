<script lang="ts">
	import type { Quiz } from '../types/quiz';

	import ResultCard from './ResultCard.svelte';
	export let isCorrect: boolean;
	export let close: () => void;
	export let answer: string;
	export let quiz: Quiz;
	export let isTimeout: boolean;
	export let onNext: () => void;
	let modal: EventTarget;
</script>

<div
	class="modal"
	bind:this={modal}
	on:keydown={() => {}}
	on:click={(e) => {
		if (e.target === modal) close();
	}}
>
	<ResultCard {answer} {isCorrect} {onNext} {isTimeout} {quiz} />
</div>

<style>
	.modal {
		position: fixed;
		bottom: 15%;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 100;
		background: rgba(0, 0, 0, 0.4);
	}
</style>
