<script lang="ts">
	import { onMount } from 'svelte';
	import Spinner from '$components/Spinner.svelte';
	import DrawerHeader from '$components/DrawerHeader.svelte';
	import Footer from '$components/Footer.svelte';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import GoldenMedal from '$components/icons/GoldenMedal.svelte';
	import SilverMedal from '$components/icons/SilverMedal.svelte';
	import BronzeMedal from '$components/icons/BronzeMedal.svelte';
	import { axios } from '$lib/axios.js';

	const clientCategory = {
		'0': '종합',
		'1': '과학',
		'2': '역사',
		'3': '엔터테인먼트',
		'4': '스포츠',
		'5': '문학',
		'6': '기술 및 컴퓨터',
		'7': '예술',
		'8': '지리',
		'9': '요리',
		'10': '비즈니스 & 경제',
		'11': '철학',
		'12': '넌센스',
		'13': '사자성어',
		'14': '동물'
	};
	$: rankings = [] as {
		userNickname: string;
		totalCorrect: number;
		userAccuracy: number;
	}[];
	let isLoading = true;

	let categories = Object.entries(clientCategory).map(([key, value]) => ({
		label: value,
		value: key
	}));

	let selectedCategory = '0';

	onMount(async () => {
		await fetchRankings('0');
	});

	async function fetchRankings(categoryId: string) {
		isLoading = true;
		const params = categoryId !== '0' ? { categoryId } : {};
		const response = await axios.get(`/api/ranking`, {
			params
		});
		rankings = response.data;
		isLoading = false;
	}

	const handleCategoryChange = (event: Event) => {
		const target = event.target as HTMLSelectElement;

		const categoryId = target?.value;
		selectedCategory = categoryId;
		fetchRankings(categoryId);
	};
</script>

<div in:fade class="container">
	<DrawerHeader onClick={() => goto('/')}>랭킹</DrawerHeader>

	<div class="title-container">
		<div class="title">
			랭킹 Brain
			<div class="sub-title">최고의 Brain 누구일까요?</div>
		</div>
	</div>

	<div class="table-container">
		<div class="filter-container">
			<select on:change={handleCategoryChange} value={selectedCategory}>
				{#each categories as category}
					<option value={category.value}>{category.label}</option>
				{/each}
			</select>
		</div>

		{#if isLoading}
			<div class="spinner-container"><Spinner /></div>
		{:else}
			<table class="ranking-table">
				<thead>
					<tr>
						<th />
						<th>닉네임</th>
						<th>맞은개수</th>
						<th>정답률</th>
					</tr>
				</thead>

				<tbody>
					{#each rankings as rank, index}
						<tr>
							<td>
								{#if index === 0}
									<GoldenMedal />
								{:else if index === 1}
									<SilverMedal />
								{:else if index === 2}
									<BronzeMedal />
								{:else}
									{index + 1}
								{/if}
							</td>
							<td>{rank.userNickname}</td>
							<td>{rank.totalCorrect}</td>
							<td>{Number(rank.userAccuracy).toFixed(2)}%</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
	</div>

	<Footer />
</div>

<style>
	.spinner-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 80%;
		width: 100%;
	}
	.container {
		position: relative;
		display: flex;
		flex-direction: column;
		background-color: #dfe9fe;
		height: 100%;
		font-family: 'Pretendard', sans-serif;
	}
	.table-container {
		position: relative;
		margin-top: 10px;
		margin-left: 10px;
		margin-right: 10px;
		border-radius: 15px; /* Rounded corners for the table */
		background: white;
		height: 60%;
		padding-bottom: var(--footer-height);
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		font-size: 12px;
		font-family: 'Pretendard', sans-serif;
		overflow-y: scroll;
	}
	.ranking-table {
		width: 100%;
		border-collapse: collapse;
		border-radius: 15px; /* Rounded corners for the table */
	}
	.ranking-table th {
		color: black;
	}
	.ranking-table th,
	.ranking-table td {
		padding: 8px;
		border-top: 1px solid #f1f1f1;
		border-bottom: 1px solid #f1f1f1;
		text-align: left;
	}
	.ranking-table td:nth-child(2),
	th:nth-child(2) {
		text-align: left;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 150px;
	}
	.ranking-table td:nth-child(1),
	th:nth-child(1) {
		text-align: center;
	}
	.filter-container {
		margin: 15px 0;
		text-align: center;
	}
	select {
		padding: 5px 10px;
		border-radius: 5px;
		border: 1px solid #ccc;
		background-color: #f8f8f8;
	}

	.title-container {
		display: flex;
	}
	.title {
		display: flex;
		flex-direction: column;
		padding-left: 17px;
		gap: 4px;
		margin-top: 25px;
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
</style>
