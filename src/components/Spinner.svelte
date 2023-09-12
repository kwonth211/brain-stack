<script>
	export let size = 40;
	export let color = '#5387f7';
</script>

<div class="spinner" style="width: {size}px; height: {size}px; --color: {color}" />

<style>
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.spinner {
		border: 4px solid rgba(255, 255, 255, 0.1);
		border-radius: 50%;
		border-top: 4px solid var(--color);
		border-right: 4px solid var(--color);
		animation: spin 1s cubic-bezier(0.42, 0, 0.58, 1) infinite; /* cubic-bezier를 사용하여 부드러운 가속도 적용 */
	}
</style>
