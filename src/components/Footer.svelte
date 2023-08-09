<script>
	import Divider from './Divider.svelte';
	import BackIcon from './icons/BackIcon.svelte';
	import HomeIcon from './icons/HomeIcon.svelte';
	import MyPageIcon from './icons/MyPageIcon.svelte';

	const goBack = () => {
		window.history.back();
	};
</script>

<footer class="footer">
	<div class="icon-container">
		<HomeIcon />
		홈
	</div>
	<div class="icon-container">
		<MyPageIcon />
		마이페이지
	</div>
</footer>
<Divider />

<style>
	.footer {
		width: 100%;
		background-color: white;
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 70px;
		border-top: 1px solid #e0e0e0;
		bottom: 0px;
		position: absolute;
	}
	.icon-container {
		display: flex;
		flex-direction: column;
		align-items: center;

		color: #5387f7;
		text-align: center;
		font-family: Pretendard;
		font-size: 11px;
		font-style: normal;
		font-weight: 500;
		line-height: 22px; /* 200% */
		letter-spacing: -0.408px;
	}
</style>
