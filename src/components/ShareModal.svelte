<script lang="ts">
	import { page } from '$app/stores';
	import type { CATEGORY } from '$types/categories';
	import type { Quiz } from '$types/quiz';
	import { onMount } from 'svelte';
	import Divider from './Divider.svelte';
	import Input from './Input.svelte';
	import ModalCloseIcon from './icons/ModalCloseIcon.svelte';
	import axios from 'axios';
	import Facebook from '$lib/assets/Facebook.png';
	import X from '$lib/assets/Twitter-x-logo.png';

	const categoryId = $page.url.searchParams.get('category') as keyof typeof CATEGORY;
	export let close: () => void;
	export let quiz: Quiz;
	let modal: EventTarget;
	let correctRate: number | null = null;
	const sharedLink = `https://dual-brain.com/quiz/${quiz.id}${
		categoryId ? `?category=${categoryId}` : ''
	}`;

	const kakaoShareInit = () => {
		window.Kakao.init('6a32f23b45df6970e8df76d98d39cee4');

		window.Kakao.Share.createDefaultButton({
			container: '#kakaotalk-sharing-btn',
			objectType: 'feed',
			content: {
				title: '퀴즈 공유하기',
				description: `#퀴즈 #공유 #도전 #지식 #듀얼브레인 - 정답률: ${correctRate}%`,
				imageUrl: 'https://dual-brain.s3.ap-northeast-2.amazonaws.com/logo.png',
				link: {
					mobileWebUrl: sharedLink,
					webUrl: sharedLink
				}
			}
		});
	};

	onMount(() => {
		if (typeof window !== 'undefined') {
			loadCorrectRate().then(() => {
				kakaoShareInit();
			});
		}
	});

	const loadCorrectRate = async () => {
		try {
			const response = await axios.get(`/api/quiz/${quiz.id}`);
			correctRate = response.data.correctRate ?? 0;
		} catch (error) {
			console.error('Failed to load correct rate:', error);
		}
	};

	$: if (quiz) {
		loadCorrectRate();
	}
</script>

<div
	class="modal"
	bind:this={modal}
	on:keydown={() => {}}
	on:click={(e) => {
		if (e.target === modal) close();
	}}
>
	<div class="modal-content">
		<div class="modal-close">
			<ModalCloseIcon
				onClick={() => {
					close();
				}}
			/>
		</div>
		<div class="title">공유하기</div>
		<Divider />

		<div class="share-container">
			<a id="kakaotalk-sharing-btn" href="javascript:;">
				<img
					src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
					alt="카카오톡 공유 보내기 버튼"
				/>
			</a>
			<a href={`https://www.facebook.com/sharer/sharer.php?u=${sharedLink}`} target="_blank">
				<img
					src={Facebook}
					alt="Facebook Share"
					style="margin-left: 10px; width: 48px; height: 48px;"
				/>
			</a>
			<a
				href={`https://twitter.com/intent/tweet?text=퀴즈에 도전해보실래요?&url=${sharedLink}`}
				target="_blank"
			>
				<img
					src={X}
					alt="트위터로 공유하기"
					style="margin-left: 10px; width: 48px; height: 48px;"
				/>
			</a>
		</div>
		<Divider />
		<Input placeholder="https://" value={sharedLink} />
	</div>
</div>

<style>
	.share-container {
		display: flex;
		justify-content: center;
	}
	#kakaotalk-sharing-btn img {
		width: 48px;
		height: 48px;
	}

	.title {
		display: flex;
		gap: 2px;
		font-weight: 600;
		color: #000;
		text-align: center;
		font-family: Pretendard;
		font-size: 18px;
		font-style: normal;
		text-align: center;
		justify-content: center;
		line-height: 126.336%; /* 25.267px */
		margin: 10px 0px;
	}
	.modal {
		position: fixed;
		bottom: 25%;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 100;
		background: rgba(0, 0, 0, 0.4);
	}
	.modal-content {
		gap: 10px;
		height: fit-content;
		width: 240px;
		padding: 15px;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: white;
		position: relative;
	}
	.modal-close {
		display: flex;
		position: absolute;
		right: 15px;
		top: 15px;
	}
</style>
