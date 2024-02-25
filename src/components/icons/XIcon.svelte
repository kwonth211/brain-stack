<script>
	export let size = 24;
	export let color = '#FF7971';
	export let onClick = () => {};
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	on:click={onClick}
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
>
	<path d="M2 2.5L21.5 22" stroke={color} stroke-width="4" stroke-linecap="round" />
	<path d="M21.5 2.5L2 22" stroke={color} stroke-width="4" stroke-linecap="round" />
</svg>
