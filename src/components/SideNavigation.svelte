<script>
	import { slide } from 'svelte/transition';
	let menuOpen = false;
</script>

<button on:click={() => (menuOpen = !menuOpen)}>
	{menuOpen ? '메뉴 닫기' : '메뉴 열기'}
</button>

{#if menuOpen}
	<nav transition:slide>
		<ul>
			<li>나의 닉네임</li>
			<li>나의 기록</li>
			<li>설정</li>
			<li>의견 보내기</li>
			<li>커피 사주기</li>
			<li>듀얼 브레인이란?</li>
			<li>언어설정: 한국어</li>
		</ul>
	</nav>
{/if}

<style>
	button {
		/* 버튼 스타일 */
	}
</style>
