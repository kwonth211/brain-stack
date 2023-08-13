<script>
	import { writable } from 'svelte/store';
	import LogoIcon from '../components/icons/LogoIcon.svelte';
	import Button from '../components/Button.svelte';
	import Input from '../components/Input.svelte';
	import Divider from '../components/Divider.svelte';
	import { signIn, signOut } from '@auth/sveltekit/client';
	import GoogleLogo from '../components/icons/GoogleIcon.svelte';
	import { page } from '$app/stores';

	const store = writable('home');
	console.log($page.data.session);
</script>

{#if $store === 'home'}
	<div class="wrapper">
		<!-- Existing content goes here -->
		<div class="title">
			<LogoIcon />
			<div>재미있는 퀴즈를 풀기 위해<br /> 로그인을 해주세요.</div>
		</div>
		<Input placeholder="이메일 입력" />
		<Input placeholder="비밀번호 입력" />
		<Button size="lg" primary classes="normal-login">로그인하기</Button>
		<a class="guest-button" href="/categories">비회원으로 시작하기</a>

		<div class="menu-link">
			<a href="/find-id">아이디찾기</a> |
			<a href="/find-password">비밀번호 찾기</a> |
			<a href="/register">회원가입</a>
		</div>
		<Divider />

		<Button
			size="md"
			white
			classes="google"
			onclick={() => {
				signIn('google');
			}}
		>
			<GoogleLogo style="position:absolute;left:0px;" />구글로 로그인하기</Button
		>

		<Button size="md" classes="google" white>애플로 로그인하기</Button>

		<!--
			TODO 중요!
			 {#if $page.data.session}
			{#if $page.data.session.user?.image}
				<span style="background-image: url('{$page.data.session.user.image}')" class="avatar" />
			{/if}
			<span class="signedInText">
				<small>Signed in as</small><br />
				<strong>{$page.data.session.user?.email ?? $page.data.session.user?.name}</strong>
			</span>
			<a href="/auth/signout" class="button" data-sveltekit-preload-data="off">Sign out</a>
		{:else}
			<span class="notSignedInText">You are not signed in</span>
			<a href="/auth/signin" class="buttonPrimary" data-sveltekit-preload-data="off">Sign in</a>
		{/if} -->
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
		padding: 20px; /* Adjust the padding as needed */
	}
	:global(.btn) {
		margin-top: 6px;
		margin-bottom: 6px;
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
	}
	:global(.normal-login) {
		font-family: 'Roboto-Medium', sans-serif;
		text-align: center;
		position: relative;
		justify-content: center;
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
		padding-top: 40px;
		padding-bottom: 160px;
		color: #000;
		font-family: Pretendard;
		font-size: 28px;
		font-style: normal;
		font-weight: bold;
	}
</style>
