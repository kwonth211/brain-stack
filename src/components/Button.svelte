<script lang="ts">
	export let primary = false; // a prop to define button type
	export let type: 'filled' | 'outlined' = 'filled';
	export let white = false; // a prop to define button type
	export let size = 'md'; // a prop to define button size
	export let id: string | null = null;
	export let onclick = () => {}; // Add this line to export onclick function
	export let classes = '';
</script>

<button
	on:click={onclick}
	id={id ?? null}
	class="{classes} btn {primary ? 'btn-primary' : ''} {white ? 'btn-white' : ''} {size}
	
	{type === 'filled' ? 'btn-filled' : ''}
	{type === 'outlined' ? 'btn-outlined' : ''}
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
		width: 100%;
		align-items: center;
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

	.btn-primary.btn-filled {
		background-color: #5387f7;
		color: white;
	}

	/* Primary Outlined */
	.btn-primary.btn-outlined {
		background-color: #eef3fe;
		/* background-color: whitesmoke; */
		/* border: 1px solid #5387f7; */
		color: #5387f7;
	}

	/* Secondary Filled (default) */
	.btn-secondary.btn-filled {
		background-color: #ddd; /* 이 값은 예시입니다. 실제 디자인에 따라 변경해야 할 수 있습니다. */
		color: black; /* 이 값은 예시입니다. 실제 디자인에 따라 변경해야 할 수 있습니다. */
	}

	/* Secondary Outlined */
	.btn-secondary.btn-outlined {
		background-color: white; /* 이 값은 예시입니다. 실제 디자인에 따라 변경해야 할 수 있습니다. */
		border: 1px solid #ddd; /* 이 값은 예시입니다. 실제 디자인에 따라 변경해야 할 수 있습니다. */
		color: #ddd; /* 이 값은 예시입니다. 실제 디자인에 따라 변경해야 할 수 있습니다. */
	}
</style>
