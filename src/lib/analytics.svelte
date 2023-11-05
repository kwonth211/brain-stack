<script lang="ts">
	import { page } from '$app/stores';
	$: {
		if (typeof window !== 'undefined' && typeof window?.gtag !== 'undefined') {
			window?.gtag('config', 'G-2DZ4BK8YB3', {
				page_title: document.title,
				page_path: $page.url.pathname
			});
		}
	}
</script>

<svelte:head>
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-2DZ4BK8YB3">
	</script>
	<script>
		window.dataLayer = window.dataLayer || [];

		function gtag() {
			dataLayer.push(arguments);
		}

		gtag('js', new Date());
		gtag('config', 'G-2DZ4BK8YB3');
	</script>
</svelte:head>
