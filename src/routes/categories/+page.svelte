<!-- 
1	과학	물리학, 화학, 생물학 등과 같은 특정 과학 분야에 초점을 맞춥니다.
2	역사	세계 역사, 국가별 역사, 중요한 사건과 인물 등에 관한 질문을 포함합니다.
3	엔터테인먼트	음악, 영화, 텔레비전, 연예인 등 엔터테인먼트 산업과 관련된 주제입니다.
4	스포츠	다양한 스포츠, 팀, 선수, 경기 규칙 등에 관한 질문을 다룹니다.
5	문학	작가, 작품, 장르, 문학 용어 등 문학과 관련된 질문을 포함합니다.
6	기술 및 컴퓨터	프로그래밍, 하드웨어, 소프트웨어, 인터넷 기술 등과 관련된 주제입니다.
7	예술	미술, 조각, 음악, 연극 등 다양한 예술 분야에 관한 질문을 포함합니다.
8	지리	세계의 나라, 도시, 지형, 기후 등 지리와 관련된 주제입니다.
9	요리	음식, 재료, 요리 기술, 세계 음식 문화 등 요리와 관련된 질문을 다룹니다.
10	비즈니스 & 경제	경영, 마케팅, 경제 원리 등 비즈니스와 경제에 관한 질문입니다.
11	철학 이 유형의 퀴즈는 유명한 철학자, 철학적 주제, 철학적 개념 등에 대한 질문을 포함합니다.

10 -->
<script>
	export let data;
	import { goto } from '$app/navigation';
	import AdsWidget from '$components/AdsWidget.svelte';
	import Header from '$components/Header.svelte';
	import Seo from '$lib/Seo.svelte';
	const { categories } = data;
</script>

<Seo
	title="퀴즈 카테고리 - dual-brain"
	description="다양한 퀴즈 카테고리를 탐색하고 원하는 주제로 퀴즈를 시작하세요. 과학, 역사, 엔터테인먼트, 스포츠, 문학, 기술 및 컴퓨터,철학 ,비지니스, 경제 등 다양한 주제를 제공합니다."
/>

<Header>카테고리</Header>
<div class="container">
	<div class="quiz-prompt">퀴즈 유형을 골라주세요!</div>
	<div class="card-container">
		<div class="quiz-categories">
			{#each categories as category}
				<button
					class="quiz-card {category.name.toLowerCase().replace(' & ', '').replace(/ /g, '-')}"
					title={category.description}
					on:click={() => {
						if (category.id === 0) {
							goto(`/quiz`);
							return;
						}
						goto(`/quiz?category=${category.id}`);
					}}
				>
					{category.name}
				</button>
			{/each}
		</div>
	</div>
	<AdsWidget />
</div>

<style>
	.container {
		height: calc(100% - var(--header-height));
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.card-container {
		display: flex;
		flex-direction: column;
		padding: 30px 15px;

		margin-left: 15px;
		margin-right: 15px;
		height: auto;
		border-radius: 27px 27px;
		background-color: rgba(83, 135, 247, 0.19);
	}
	.quiz-prompt {
		margin: 15px 0;
		font-size: 22px;
		font-weight: 600;
		color: #000;
		text-align: center;
		font-family: Pretendard;
	}

	.quiz-categories {
		display: flex;
		flex-wrap: wrap;
		gap: 15px;
	}

	.quiz-card {
		outline: none;
		border: none;
		flex: 1 1 calc(50% - 7.5px);
		border-radius: 10px;
		height: 59px;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		font-family: Pretendard;
		font-size: 16px;
		font-weight: 500;
		cursor: pointer;
		transition: background-color 0.3s, transform 0.3s;
		color: #555555;
		background-color: white;
	}

	.quiz-card:hover {
		transform: scale(1.05);
	}
</style>
