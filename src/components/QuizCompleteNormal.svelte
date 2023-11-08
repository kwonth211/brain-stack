<script lang="ts">
	import { goto } from '$app/navigation';

	export let title = '';
</script>

<div class="completed-container">
	<div class="completed-text">
		{@html title}
	</div>
	<div class="button-container">
		<button
			on:click={() => {
				goto('/');
			}}
		>
			🚀 다른 유형 퀴즈 풀러 가기 🚀</button
		>
	</div>
</div>

<style>
	.completed-container {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		width: 230px;
		height: 150px;
		padding: 8px;
		border-radius: 6px;
		background-color: white;
	}
	.button-container {
		display: flex;
	}

	.completed-text {
		font-size: 17px;
		z-index: 1;
		animation: fadeIn 1s;
		text-align: center;
		margin-bottom: 20px;
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
</style>
