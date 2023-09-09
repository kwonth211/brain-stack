<script>
	export let progress = 0;
	export let primary = false;
	export let high = false;
</script>

<div class={high ? 'progress-bar high' : 'progress-bar'}>
	<div
		class="progress-gauge {primary ? 'primary' : ''} {high ? 'high' : ''}"
		style="width: {progress}%"
	/>
</div>

<style>
	.progress-bar {
		width: 100%;
		height: 14px;
		background-color: #dfe9fe;
		border-radius: 9px;
		overflow: hidden;
		margin-bottom: 1px;
	}

	.progress-bar.high {
		background-color: #dffcfe;
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
</style>
