<!-- Input.svelte -->
<script lang="ts">
	export let label = '';
	export let placeholder = '';
	export let type = 'text';
	export let value: string = '';
	export let error = '';
	export let classes = '';
	export let style = '';
	export let disabled = false;
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function handleInput(event: Event) {
		const inputElement = event.target as HTMLInputElement;
		value = inputElement.value;
		dispatch('input', value);
	}
</script>

<label class="label">
	{#if label}
		<div class="label-span">{label}</div>
	{/if}
	<input
		{placeholder}
		{type}
		{value}
		on:input={handleInput}
		class="{classes} {error ? 'error' : ''} {disabled ? 'disabled' : ''}"
		{style}
		{disabled}
	/>
	{#if error}
		<div class="error-message">{error}</div>
	{/if}
</label>

<!-- Add your styles here. -->
<style>
	label {
		display: block;
		/* margin-bottom: 1rem; */
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
		height: var(--input-height);
	}
	input.error {
		border: 1px solid red;
	}
	.error-message {
		margin-top: 5px;
		width: 100%;
		color: red;
		font-size: 0.75rem;
		display: block;
	}
	.disabled {
		background-color: #dcdcdc;
		pointer-events: none;
		cursor: not-allowed;
	}
</style>
