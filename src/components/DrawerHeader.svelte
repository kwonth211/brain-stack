<script lang="ts">
	import Divider from './Divider.svelte';
	import Hamburger from './icons/Hamburger.svelte';
	import { slide } from 'svelte/transition';
	import SettingsIcon from './icons/SettingsIcon.svelte';
	import MyQuizIcon from './icons/MyQuizIcon.svelte';
	import CreateQuizIcon from './icons/CreateQuizIcon.svelte';
	import { goto } from '$app/navigation';
	import BuyCoffee from '$components/BuyCoffee.svelte';
	import SendIcon from './icons/SendIcon.svelte';

	let menuOpen = false;

	export let onClick: () => void;
	const handleOpenerClick = (e: Event) => {
		e.stopPropagation();
		menuOpen = !menuOpen;
	};
</script>

<header class="header">
	<div class="container">
		<div class="title">
			<span on:click={onClick} on:keydown={() => {}}>
				<slot />
			</span>
		</div>
		<div class="hamburger-container">
			<Hamburger onClick={handleOpenerClick} />
		</div>
	</div>
	<Divider />

	{#if menuOpen}
		<div
			class="overlay"
			on:click={() => {
				menuOpen = false;
			}}
			on:keydown={(e) => {
				if (e.key === 'Escape') {
					menuOpen = false;
				}
			}}
		/>
		<nav transition:slide={{ axis: 'x' }}>
			<!-- <div class="menu-section top">
				<ul>
					<li>나의 닉네임</li>
				</ul>
			</div> -->
			<div class="menu-section middle">
				<ul>
					<li
						on:click={() => {
							goto('/my-page');
						}}
						on:keydown={(e) => {
							if (e.key === 'Enter') {
								goto('/my-page');
							}
						}}
					>
						<MyQuizIcon /> 나의 기록
					</li>
					<li
						on:click={() => {
							goto('/profile');
						}}
						on:keydown={(e) => {
							if (e.key === 'Enter') {
								goto('/profile');
							}
						}}
					>
						<SettingsIcon />설정
					</li>
					<li
						on:click={() => {
							goto('/quiz/create');
						}}
						on:keydown={(e) => {
							if (e.key === 'Enter') {
								goto('/quiz/create');
							}
						}}
					>
						<CreateQuizIcon />퀴즈 만들기
					</li>
				</ul>
			</div>
			<div class="menu-section bottom">
				<ul>
					<li
						on:click={() => {
							goto('/feedback');
						}}
						on:keydown={(e) => {
							if (e.key === 'Enter') {
								goto('/feedback');
							}
						}}
					>
						<SendIcon />
						의견 보내기
					</li>

					<!-- <li><QuestionIcon style="margin-left: 2px;" />듀얼 브레인이란?</li> -->
					<li style="flex-direction: column; position:relative;">
						<BuyCoffee />
					</li>
				</ul>
			</div>
		</nav>
	{/if}
</header>
<div class="header-placeholder" />

<style>
	.header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background-color: white;
		z-index: 1000; /* Ensure the header is above other elements */
	}
	.container {
		display: flex;
		align-items: center;
		justify-content: center;
		height: var(--header-height);
		padding-left: 10px;
	}
	.header-placeholder {
		height: var(--header-height);
	}
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 9;
	}

	nav {
		position: fixed;
		top: 0;
		right: 0;
		width: 50%;
		background-color: #fff;
		box-shadow: -2px 0px 5px rgba(0, 0, 0, 0.2);
		z-index: 10;
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: space-between;
	}

	ul {
		list-style: none;
		padding: 0;
	}

	li {
		padding: 10px 10px;
		display: flex;

		align-items: center;
		gap: 5px;
		white-space: nowrap;

		& > svg {
			margin-bottom: 3px;
		}
	}

	.title {
		width: 100%;
		text-align: center;
		color: #000;
		text-align: center;
		font-family: Pretendard;
		font-size: 17px;
		font-style: normal;
		font-weight: 600;
		line-height: normal;
	}
	.hamburger-container {
		position: absolute;
		right: 10px;
		top: 50%;
		transform: translateY(-50%);
	}
</style>
