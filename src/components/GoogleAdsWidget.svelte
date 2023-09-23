<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		const _window = window as any;
		(_window.adsbygoogle = _window.adsbygoogle || []).push({});
	});
</script>

<div class="ads-widget-container">
	<ins
		class="adsbygoogle"
		style="display:block"
		data-ad-client="ca-pub-3415763008354504"
		data-ad-slot="3415763008354504"
		data-ad-format="auto"
		data-full-width-responsive="true"
	/>
</div>

<style>
	.ads-widget-container {
		width: 300px;
		height: 250px;
	}
</style>
