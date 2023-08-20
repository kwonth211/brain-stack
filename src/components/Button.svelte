<script lang="ts">
	export let primary = false;
	export let type: 'filled' | 'outlined' = 'filled';
	export let white = false;
	export let gray = false;
	export let size = 'md';
	export let id: string | null = null;
	export let onclick = () => {};
	export let classes = '';
</script>

<button
	on:click={onclick}
	id={id ?? null}
	class="{classes} btn {primary ? 'primary' : ''} {white ? 'white' : ''} {size} {gray ? 'gray' : ''}
	
	{type === 'filled' ? 'filled' : ''}
	{type === 'outlined' ? 'outlined' : ''}
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
</style>
