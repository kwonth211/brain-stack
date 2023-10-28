<script lang="ts">
	export let primary = false;
	export let type: 'filled' | 'outlined' = 'filled';
	export let error = false;
	export let white = false;
	export let gray = false;
	export let high = false;
	export let size = 'md';
	export let id: string | null = null;
	export let disabled = false;
	export let buttonType: 'button' | 'submit' | 'reset' = 'button';
	export let onclick = () => {};
	export let classes = '';
</script>

<button
	on:click={onclick}
	id={id ?? null}
	type={buttonType}
	class="{classes} btn {primary ? 'primary' : ''} {error ? 'error' : ''} {white
		? 'white'
		: ''} {size} {gray ? 'gray' : ''} {high ? 'high' : ''}
	
	{type === 'filled' ? 'filled' : ''}
	{type === 'outlined' ? 'outlined' : ''}
	{disabled ? 'disabled' : ''}
	"
>
	<slot />
</button>

<style>
	.btn {
		display: flex;
		color: white;
		text-decoration: none;
		text-align: center;
		transition: background-color 0.3s;
		justify-content: center;
		width: 100%;
		align-items: center;
		border-radius: 8px;
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
	.white {
		background-color: white;
		color: black;
		border: 1px solid #d4d4d4;
	}

	.primary.filled {
		background-color: #5387f7;
		color: white;
	}

	.primary.outlined {
		background-color: #eef3fe;
		/* background-color: whitesmoke; */
		/* border: 1px solid #5387f7; */
		color: #5387f7;
	}

	.secondary.filled {
		background-color: #ddd;
		color: black;
	}

	.secondary.outlined {
		background-color: white;
		border: 1px solid #ddd;
		color: #ddd;
	}
	.gray.filled {
		background-color: var(--gray);
		color: black;
	}
	.primary.disabled {
		background-color: #ddd;
		color: white;
	}
	.high.filled {
		background-color: var(--high);
		color: white;
	}
	.high.disabled {
		background-color: #ddd;
		color: white;
	}

	.error.filled {
		background-color: #ff7971;
		color: white;
	}
</style>
