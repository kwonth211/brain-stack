<script>
	export let primary = false; // a prop to define button type
	export let white = false; // a prop to define button type
	export let size = 'md'; // a prop to define button size
	export let onclick = () => {}; // Add this line to export onclick function
</script>

<button
	on:click={onclick}
	class="btn {primary ? 'btn-primary' : ''} {white ? 'btn-white' : ''} {size}"
>
	<slot />
</button>

<style>
	.btn {
		display: inline-block;
		color: white;
		text-decoration: none;
		text-align: center;
		transition: background-color 0.3s;
		width: 100%;
		border-radius: 8px;
		height: var(--height);
		font-size: val(--font-size);
		border: none;
	}
	.btn.sm {
		font-size: 14px;
	}
	.btn.md {
		font-size: 16px;
	}
	.btn.lg {
		font-size: 20px;
	}
	.btn-white {
		background-color: white;
		color: black;
		border: 1px solid #d4d4d4;
	}
	.btn-primary {
		background-color: var(--primary);
	}
	.btn-primary:hover {
		background-color: darken(var(--primary), 10%);
	}
	.btn-secondary {
		background-color: #ddd;
	}
	.btn-secondary:hover {
		background-color: #bbb;
	}
</style>
