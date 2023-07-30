<script lang="ts">
	import { fly } from 'svelte/transition';
	let categories = [
		'한국 상식',
		'세계 상식',
		'역사',
		'문화와 예술',
		'과학과 기술',
		'지리',
		'스포츠',
		'영화와 TV',
		'문학',
		'음악',
		'현대 사회'
	];
	function loadQuiz(category: any) {
		// TODO: Implement the function that loads quizzes based on the category
	}
</script>

<div class="w-full" in:fly={{ x: 100, duration: 500 }} out:fly={{ x: -300, duration: 500 }}>
	<div class="flex flex-wrap items-center mr-auto">
		{#each categories as category (category)}
			<button
				on:click={() => loadQuiz(category)}
				class="w-full md:w-auto text-center bg-cyan-400 hover:bg-cyan-500 mb-4 flex-none rounded-full text-white font-medium py-3 px-6 mr-8"
			>
				{category}
			</button>
		{/each}
		<a
			href="https://www.youtube.com/watch?v=Z3LrfdctOpU"
			target="_blank"
			class="w-full md:w-auto text-center bg-white hover:bg-cyan-300 mb-4 flex-none rounded-full text-cyan-800 font-medium py-3 px-6"
		>
			Learn how it's built
		</a>
	</div>
</div>
