<!-- Input.svelte -->
<script>
	export let label = '';
	export let placeholder = '';
	export let type = 'text';
	let value = '';

	function handleInput(event) {
		value = event.target.value;
	}
</script>

<label class="label">
	{#if label}
		<div class="label-span">{label}</div>
	{/if}
	<input {placeholder} {type} {value} on:input={handleInput} />
</label>

<!-- Add your styles here. -->
<style>
	label {
		display: block;
		margin-bottom: 1rem;
	}
	div {
		display: block;
		margin-bottom: 0.5rem;
	}
	input {
		background-color: var(--gray);
		width: 100%;
		padding: 0.75rem;
		border: none;
		border-radius: 6px;
		font-size: val(--font-size);
		box-sizing: border-box;
		height: var(--height);
	}
</style>
