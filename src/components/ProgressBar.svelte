<script>
	export let progress = 0;
	export let primary = false;
	export let wrong = false;
	export let high = false;
	export let isShake = false;
</script>

<div class={'progress-bar'} class:high class:wrong class:shake-animation={isShake}>
	<div
		class="progress-gauge {primary ? 'primary' : ''} {high ? 'high' : ''} {wrong ? 'wrong' : ''}"
		style="width: {progress}%"
	/>
</div>

<style>
	.progress-bar {
		flex: 1;
		width: 100%;
		height: 11px;
		background-color: #dfe9fe;
		border-radius: 9px;
		overflow: hidden;
		margin-bottom: 1px;
	}

	.progress-bar.high {
		background-color: #dffcfe;
	}
	.progress-bar.wrong {
		background-color: #ffccc9;
	}

	.progress-gauge {
		height: 100%;
		width: 0;
		transition: width 0.4s ease-out;
	}
	.primary {
		background-color: var(--primary);
	}
	.high {
		background-color: var(--high);
	}
	.wrong {
		background-color: var(--wrong);
	}

	@keyframes shake {
		0% {
			transform: translateX(1px);
		}
		25% {
			transform: translateX(-1px);
		}
		50% {
			transform: translateX(1px);
		}
		75% {
			transform: translateX(-1px);
		}
		100% {
			transform: translateX(1px);
		}
	}

	.shake-animation {
		animation: shake 0.5s;
		animation-iteration-count: infinite;
	}
</style>
