<script>
	export let progress = 0;
</script>

<div class="progress-bar">
	<div class="progress-gauge" style="width: {progress}%" />
</div>

<style>
	.progress-bar {
		width: 100%;
		height: 14px;
		background-color: #dfe9fe;
		border-radius: 9px;
		overflow: hidden;
	}

	.progress-gauge {
		height: 100%;
		background-color: #5387f7;
		width: 0;
		transition: width 0.4s ease-out;
	}
</style>
