<script lang="ts">
	export let onClick: () => void;
</script>

<svg
	on:click={onClick}
	on:keydown={(e) => {
		if (e.key === 'Enter') {
			onClick();
		}
	}}
	width="46"
	height="45"
	viewBox="0 0 56 55"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	><circle cx="27.9877" cy="27.2651" r="27.2651" fill="#03CF5D" /><path
		d="M32.3731 28.1318L23.242 14.9517H15.6744V39.5782H23.6023V26.3981L32.7334 39.5782H40.3009V14.9517H32.3731V28.1318Z"
		fill="white"
	/></svg
>
