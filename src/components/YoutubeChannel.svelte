<script>
	import Youtube from './icons/Youtube.svelte';
	const url = 'https://youtube.com/@dual-brain?si=GRtLG2_s9U019agF';
</script>

<a href={url} target="_blank" class="youtube-button">
	<span class="emoji"><Youtube /></span>
	YouTube 채널 구경가기
</a>

<style>
	.youtube-button {
		display: inline-flex;
		align-items: center;
		background-color: #ff0000;
		color: #ffffff;
		padding: 5px;
		border-radius: 5px;
		text-decoration: none;
		font-family: 'Lato', sans-serif;
		font-size: 13px;
		width: 100%;
		box-sizing: border-box;
	}

	.emoji {
		margin-right: 10px;
	}
</style>
