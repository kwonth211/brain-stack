<script>
	import { fade, fly } from 'svelte/transition';
	import { writable } from 'svelte/store';
	import QuizCategories from './QuizCategories.svelte';

	const store = writable('home');

	function goToQuizzes() {
		store.set('quizzes');
	}
</script>

{#if $store === 'home'}
	<div class="w-full" in:fly={{ x: 300, duration: 500 }} out:fly={{ x: -300, duration: 500 }}>
		<div
			class="text-center md:text-left font-bold text-cyan-700 text-4xl md:text-5xl mb-8 md:mb-16 w-full"
		>
			Brain Stack
		</div>
		<div class="flex flex-wrap items-center mr-auto">
			<button
				on:click={goToQuizzes}
				class="w-full md:w-auto text-center bg-cyan-400 hover:bg-cyan-500 mb-4 flex-none rounded-full text-white font-medium py-3 px-6 mr-8"
			>
				상식 채우러 가기
			</button>
			<a
				href="https://www.youtube.com/watch?v=Z3LrfdctOpU"
				target="_blank"
				class="w-full md:w-auto text-center bg-white hover:bg-cyan-300 mb-4 flex-none rounded-full text-cyan-800 font-medium py-3 px-6"
			>
				이어 하기
			</a>
		</div>
	</div>
{:else if $store === 'quizzes'}
	<!-- Your quizzes page content here -->
	<QuizCategories />
{/if}
