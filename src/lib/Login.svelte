<script lang="ts">
	import { writable } from 'svelte/store';
	import LogoIcon from '../components/icons/LogoIcon.svelte';
	import Button from '../components/Button.svelte';
	import Input from '../components/Input.svelte';
	import Divider from '../components/Divider.svelte';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import GoogleLogo from '../components/icons/GoogleIcon.svelte';
	import KakaoLogo from '../components/icons/KakaoIcon.svelte';
	import NonMemberModal from '$components/NonMemberModal.svelte';
	import NaverLogo from '$components/icons/NaverIcon.svelte';
	import { goto } from '$app/navigation';
	const store = writable('home');
	let userEmail = '';
	let password = '';
	let NonMemberModalOpen = false;
	const messages = [
		'지식을 키워줄 퀴즈가 기다리고 있어요<br />로그인하고 도전해보세요',
		'지식의 향연을 시작하려면<br />로그인을 눌러주세요',
		'오늘은 어떤 흥미진진한 퀴즈와 마주칠지<br />로그인하고 확인해보세요',
		'놓치면 후회할 퀴즈의 세계<br />로그인하고 지식을 늘려보세요',
		'당신의 지식을 키워줄 퀴즈가 기다리고 있어요<br />로그인하고 함께 도전해보세요',
		'놀라운 퀴즈로 당신의 지식을 테스트해보고 싶다면 로그인을 해주세요',
		'200여개의 퀴즈가 당신을 기다리고 있어요<br />로그인하고 함께 도전해보세요'
	];

	const randomMessage = () => {
		const randomIndex = Math.floor(Math.random() * messages.length);
		return messages[randomIndex];
	};
	const handleLogin = async (platform: string) => {
		await signIn(platform, {
			redirect: false
		});
	};
</script>

{#if $store === 'home'}
	<div class="wrapper">
		<div class="title">
			<LogoIcon />
			<div>
				{@html randomMessage()}
			</div>
		</div>
		<Input placeholder="이메일 입력" bind:value={userEmail} />
		<Input placeholder="비밀번호 입력" bind:value={password} type="password" />
		<Button
			size="lg"
			primary
			classes="normal-login"
			onclick={async () => {
				// 라이브러리 이슈로 인한 홀딩
				await signIn('credentials', {
					redirect: false,
					email: userEmail,
					password: password
				});
				goto('/');
			}}>로그인하기</Button
		>
		<a
			class="guest-button"
			on:click={(e) => {
				e.preventDefault();
				NonMemberModalOpen = true;
			}}
			href="/categories">비회원으로 시작하기</a
		>

		<div class="menu-link">
			<a href="/find-id">아이디찾기</a> |
			<a href="/find-password">비밀번호 찾기</a> |
			<a href="/register">회원가입</a>
		</div>
		<Divider />

		<div class="oAuth-login-wrapper">
			<Button
				size="md"
				white
				classes="google"
				onclick={() => {
					handleLogin('google');
				}}
			>
				<GoogleLogo style="position:absolute;left:0px;" />구글 로그인</Button
			>
			<Button
				size="md"
				white
				classes="naver"
				onclick={() => {
					handleLogin('naver');
				}}
			>
				<NaverLogo style="position:absolute;left:3px;" />네이버 로그인</Button
			>
			<Button
				size="md"
				white
				classes="kakao"
				onclick={() => {
					handleLogin('kakao');
				}}
			>
				<KakaoLogo style="position:absolute;left:11px;" />카카오 로그인</Button
			>

			<!-- <Kakao /> -->
		</div>

		{#if NonMemberModalOpen}
			<NonMemberModal
				close={() => {
					NonMemberModalOpen = false;
				}}
			/>
		{/if}
	</div>
{/if}

<style>
	.guest-button {
		width: 100%;
		text-align: center;
		cursor: pointer;
		color: #a4a4a4; /* 텍스트 색상 (원하시는 색으로 변경 가능) */
		text-decoration: underline; /* 밑줄 스타일을 추가 */
		margin-top: 10px; /* 로그인하기 버튼과의 간격 */
		display: inline-block;
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100%;
		padding: 20px; /* Adjust the padding as needed */
		box-sizing: border-box;
		overflow: scroll;
		gap: 5px;
	}

	:global(.google) {
		font-size: 16px !important;
		font-family: 'Roboto-Medium', sans-serif;
		text-align: center;
		position: relative;
		justify-content: center;

		color: #606060 !important;
		font-size: 16px;
		font-style: normal;
		font-weight: 500;
		line-height: 11.336%; /* 20.214px */
		height: var(--button-height);
	}
	:global(.naver) {
		font-size: 16px !important;
		font-family: 'Roboto-Medium', sans-serif;
		text-align: center;
		position: relative;
		justify-content: center;
		background-color: #03c75a !important;
		color: white !important;
		font-size: 16px;
		font-style: normal;
		font-weight: 500;
		line-height: 11.336%; /* 20.214px */
		height: var(--button-height);
		border: none !important;
	}
	:global(.kakao) {
		font-size: 16px !important;
		font-family: 'Roboto-Medium', sans-serif;
		text-align: center;
		position: relative;
		justify-content: center;

		color: #000000 85% !important;
		background-color: #fee500 !important;
		font-size: 16px;
		font-style: normal;
		font-weight: 500;
		line-height: 11.336%; /* 20.214px */
		height: var(--button-height);
		border: none !important;
	}
	:global(.normal-login) {
		font-family: 'Roboto-Medium', sans-serif;
		text-align: center;
		position: relative;
		justify-content: center;
		height: var(--button-height);
		margin-top: 10px;
	}

	.container :global(.divider) {
		margin-top: 20px;
		margin-bottom: 30px;
	}
	.menu-link {
		text-align: center;
		padding-top: 20px;
		padding-bottom: 20px;
		color: #a4a4a4;
	}
	.menu-link a {
		text-decoration: none;
		color: #a4a4a4;
	}

	.title {
		padding-top: 20px;
		padding-bottom: 7px;
		color: #000;
		font-family: Pretendard;
		font-size: 22px;
		font-style: normal;
		font-weight: bold;
		letter-spacing: -2px;
	}
	.oAuth-login-wrapper {
		margin-top: 20px;
		gap: 6px;
		display: flex;
		flex-direction: column;
	}
</style>
