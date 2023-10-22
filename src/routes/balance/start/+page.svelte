<script lang="ts">
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import NonMemberModal from '$components/NonMemberModal.svelte';
	import Header from '$components/Header.svelte';
	import Button from '$components/Button.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	export let data;
	let NonMemberModalOpen = false;

	let chart;

	onMount(() => {
		let chart = document.getElementById('myChart') as any;
		const ctx = chart?.getContext('2d');
		chart = new Chart(ctx, {
			type: 'pie',
			data: {
				labels: ['빵과 커피', '밥과 국'],
				datasets: [
					{
						data: [55, 45],
						backgroundColor: ['#5387F7', '#DFE9FE']
					}
				]
			},
			options: {
				responsive: false,
				plugins: {
					legend: {
						position: 'bottom',
						align: 'start'
					}
				}
			}
		});
	});
</script>

<svelte:head>
	<title>밸런스 퀴즈 - dual-brain</title>
	<meta
		name="description"
		content="밸런스 퀴즈를 통해 나의 선호와 다른 사람의 선호를 비교해보세요."
	/>
</svelte:head>

<div in:fade class="container">
	<Header
		onClick={() => {
			goto('/');
		}}>밸런스퀴즈</Header
	>

	<div class="title">
		밸런스 게임
		<div class="sub-title">퀴즈를 통해 나의 선호도를 파악하고,<br /> 다른 사람과 비교해보세요</div>
	</div>

	<div class="card-container">
		<div class="stats-title">아침식사로 선호하는 메뉴는?</div>
		<div class="stats-sub-title">빵과 커피 55%, 밥과 국45%</div>
		<canvas id="myChart" width="250" height="250" />

		<div class="create-container" />
	</div>
	<div class="start-container">
		<Button
			primary
			classes="start"
			onclick={() => {
				if (!$page?.data?.session?.user) {
					NonMemberModalOpen = true;
					return;
				}
				goto('/categories');
			}}>시작하기</Button
		>
	</div>

	<!-- <KaKaoAddFit /> -->

	{#if NonMemberModalOpen}
		<NonMemberModal
			onConfirm={() => {
				goto('/balance/1');
				NonMemberModalOpen = false;
			}}
			close={() => {
				NonMemberModalOpen = false;
			}}
		/>
	{/if}
</div>

<style>
	.container {
		height: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
		background-color: rgba(83, 135, 247, 0.19);
		gap: 7px;
	}

	.create-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
	}

	.card-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 15px;
		background-color: white;
		margin-left: 15px;
		margin-right: 15px;
		border-radius: 16px;
		background: #fff;
		max-height: 360px;
	}

	.title {
		display: flex;
		flex-direction: column;
		padding-left: 17px;
		gap: 4px;
		margin-top: 50px;
		box-sizing: border-box;
		color: #424242;
		font-family: Pretendard;
		font-size: 21px;
		font-style: normal;
		font-weight: 700;
		line-height: 22px; /* 88% */
		letter-spacing: -0.408px;
	}
	.sub-title {
		color: #424242;
		font-family: Pretendard;
		font-size: 14px;
		font-style: normal;
		font-weight: 500;
		line-height: 17px; /* 88% */
		letter-spacing: -0.408px;
	}
	.start-container {
		margin: 20px 30px;
	}
	:global(.start) {
		width: 100%;
		height: var(--button-height);
	}
	.stats-title {
		color: #000;
		font-family: Pretendard;
		font-size: 16px;
		font-style: normal;
		font-weight: 500;
		letter-spacing: -0.408px;
	}
	.stats-sub-title {
		color: #9d9d9d;
		font-family: Pretendard;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		letter-spacing: -0.408px;
	}
</style>
