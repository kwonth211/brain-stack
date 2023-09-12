<script>
	import { dev } from '$app/environment';
</script>

<svelte:head>
	<script type="text/javascript" src="//t1.daumcdn.net/kas/static/ba.min.js" async></script>
</svelte:head>

<ins
	class="kakao_ad_area {dev ? 'dev-style' : ''}"
	style="display:none;"
	data-ad-unit="DAN-d7mkLib8r5bS0259"
	data-ad-width="320"
	data-ad-height="100"
/>

<style>
	.dev-style {
		background-color: red;
		display: block !important;
	}
</style>
