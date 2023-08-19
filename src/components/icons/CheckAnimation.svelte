<script>
	export let animate = false;
</script>

<svg width="25" height="25" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
	<path
		d="M10 25 L20 35 L40 15"
		stroke="#5387f7"
		stroke-width="5"
		fill="none"
		id="checkmark"
		stroke-dasharray="60"
		stroke-dashoffset="60"
		class:animate
	/>
</svg>

<style>
	@keyframes drawCheck {
		from {
			stroke-dashoffset: 60;
		}
		to {
			stroke-dashoffset: 0;
		}
	}

	.animate {
		animation: drawCheck 0.5s forwards;
		animation-delay: 0.4s;
	}
</style>
