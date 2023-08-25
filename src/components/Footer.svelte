<script>
	import { goto } from '$app/navigation';
	import Divider from './Divider.svelte';
	import { page } from '$app/stores';
	import HomeIcon from './icons/HomeIcon.svelte';
	import MyPageIcon from './icons/MyPageIcon.svelte';

	let active = 'home';
	page.subscribe((_page) => {
		const { id } = _page.route;
		if (id === '/main') {
			active = 'home';
		} else if (id === '/my-page') {
			active = 'myPage';
		}
	});
	// url 에서 정보 가져오기
	const goBack = () => {
		window.history.back();
	};
</script>

<footer class="footer">
	<div
		class={`icon-container ${active === 'home' ? 'active' : ''}`}
		on:keydown={() => {}}
		on:click={() => {
			goto('/main');
		}}
	>
		<HomeIcon color={active === 'home' ? '#5387F7' : '#BDBDBD'} />
		홈
	</div>
	<div
		class={`icon-container ${active === 'myPage' ? 'active' : ''}`}
		on:keydown={() => {}}
		on:click={() => {
			goto('/my-page');
		}}
	>
		<MyPageIcon color={active === 'myPage' ? '#5387F7' : '#BDBDBD'} />
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

		text-align: center;
		font-family: Pretendard;
		font-size: 11px;
		font-style: normal;
		font-weight: 500;
		line-height: 22px; /* 200% */
		letter-spacing: -0.408px;
		color: #828282;
	}
	.icon-container.active {
		color: #5387f7;
	}
</style>
