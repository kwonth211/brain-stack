<script lang="ts">
	import Input from './Input.svelte';
	import ModalCloseIcon from './icons/ModalCloseIcon.svelte';
	import GoogleLogo from '$components/icons/GoogleIcon.svelte';
	import Button from './Button.svelte';
	import { signIn } from '@auth/sveltekit/client';
	import LogoIcon from './icons/LogoIcon.svelte';
	import NaverIconSvg from './icons/NaverIconSvg.svelte';
	import KakaoIconSvg from './icons/KakaoIconSvg.svelte';
	import { clearRemainingQuizzes } from '$utils/window/utils';

	export let close: () => void;
	let modal: EventTarget;
	let userEmail = '';
	let password = '';

	const handleLogin = async (platform: string) => {
		clearRemainingQuizzes();
		await signIn(platform, {
			redirect: false
		});
	};
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

		<div class="title" />
		<div class="wrapper">
			<div class="title">
				<LogoIcon />
				로그인 하고,<br /> 더 많은 기능을 이용하세요!
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
					close();
					// 새로고침
					window.location.reload();
				}}>로그인하기</Button
			>

			<div class="menu-link">
				<a href="/find-id">아이디찾기</a> |
				<a href="/find-password">비밀번호 찾기</a> |
				<a href="/register">회원가입</a>
			</div>

			<div
				class="oAuth-login-wrapper"
				on:click={() => {
					handleLogin('google');
				}}
				on:keydown={(e) => {
					if (e.key === 'Enter') {
						handleLogin('google');
					}
				}}
			>
				<div class="google-login-wrapper">
					<GoogleLogo />
				</div>
				<NaverIconSvg
					onClick={() => {
						handleLogin('naver');
					}}
				/>
				<KakaoIconSvg
					onClick={() => {
						handleLogin('kakao');
					}}
				/>
			</div>
		</div>
	</div>
</div>

<style>
	.title {
		display: flex;
		flex-direction: column;
		gap: 2px;
		align-items: center;
		font-weight: 600;
		color: #000;
		text-align: center;
		font-family: Pretendard;
		font-size: 18px;
		font-style: normal;
		text-align: center;
		justify-content: center;
		line-height: 126.336%; /* 25.267px */
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
		border-radius: 26px;
	}
	.modal-close {
		display: flex;
		position: absolute;
		right: 15px;
		top: 15px;
	}

	.menu-link {
		text-align: center;
		padding-top: 4px;
		padding-bottom: 4px;
		color: #a4a4a4;
	}
	.menu-link a {
		text-decoration: none;
		color: #a4a4a4;

		color: #a4a4a4;
		font-family: Roboto;
		font-size: 12px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100%;
		gap: 5px;
	}
	.oAuth-login-wrapper {
		margin-top: 6px;
		gap: 6px;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.google-login-wrapper {
		width: 46px;
		height: 45px;
		border-radius: 50%;
		border: 1px solid #e0e0e0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	:global(.normal-login) {
		font-family: 'Roboto-Medium', sans-serif;
		text-align: center;
		position: relative;
		justify-content: center;
		height: var(--button-height);
		margin-top: 10px;
	}
</style>
