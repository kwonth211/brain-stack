<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { CATEGORY } from '$types/categories';

	const categoryId = $page.url.searchParams.get('category') as keyof typeof CATEGORY;
	function launchFireworks() {
		const container = document.querySelector('.completed-container');

		const numParticles = 100;

		for (let i = 0; i < numParticles; i++) {
			const particle = document.createElement('div');
			particle.className = 'particle';
			container?.appendChild(particle);

			const angle = Math.random() * 360;
			const distance = Math.random() * 100 + 50;

			const x = Math.cos(angle * (Math.PI / 180)) * distance;
			const y = Math.sin(angle * (Math.PI / 180)) * distance;

			particle.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;

			// setTimeout(() => {
			// 	particle.remove();
			// }, 2000);
		}
	}
	onMount(() => {
		launchFireworks();
	});

	// if (!categoryId) {
	// 	goto('/main');
	// }
</script>

<div class="completed-container">
	<!-- <div class="confetti" style="left: 10%; top: 20%; animation-delay: 0.2s;">🎉</div>
	<div class="confetti" style="right: 10%; bottom: 20%; animation-delay: 0.4s;">🎉</div>
	<div class="confetti" style="left: 50%; top: 50%; animation-delay: 0.6s;">🎉</div>
	<div class="confetti" style="right: 50%; bottom: 50%; animation-delay: 0.8s;">🎉</div> -->
	<div class="completed-text">
		축하합니다🎉 <br />{CATEGORY[categoryId] ?? '모든'} 문제를 모두 해결했어요.
	</div>
	<button
		on:click={() => {
			goto('/categories');
		}}
	>
		🚀 다른 유형 퀴즈 풀러 가기 🚀</button
	>
</div>

<style>
	.completed-container {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: calc(100% - var(--header-height));
		overflow: hidden;
	}

	.completed-text {
		font-size: 24px;
		margin-bottom: 20px;
		z-index: 1;
		animation: fadeIn 1s;
		text-align: center;
	}

	button {
		padding: 10px 20px;
		background-color: var(--primary);
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		animation: fadeIn 1.5s;
	}

	@keyframes explode {
		0% {
			transform: scale(0.7) translateY(0);
			opacity: 0;
		}
		50% {
			transform: scale(1.5) translateY(-50px);
			opacity: 1;
		}
		100% {
			transform: scale(1) translateY(-100px);
			opacity: 0;
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(50px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.particle {
		position: absolute;
		width: 5px;
		height: 5px;
		background-color: rgba(255, 255, 255, 0.7);
		border-radius: 50%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		animation: particleFade 2s forwards;
		background-color: red;
		z-index: 1000;
		width: 10px;
		height: 10px;
	}

	@keyframes particleFade {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>
