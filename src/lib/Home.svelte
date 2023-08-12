<script>
	import { writable } from 'svelte/store';
	import LogoIcon from '../components/icons/LogoIcon.svelte';
	import Button from '../components/Button.svelte';
	import Input from '../components/Input.svelte';
	import Divider from '../components/Divider.svelte';
	import { signIn, signOut } from "@auth/sveltekit/client"
	import { page } from "$app/stores"



	const store = writable('home');
console.log($page.data.session)
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
		<Button size="lg" primary>로그인하기</Button>

		<div class="menu-link">
			<a href="/find-id">아이디찾기</a> |
			<a href="/find-password">비밀번호 찾기</a> |
			<a href="/register">회원가입</a>
		</div>
		<Divider />
		<Button size="md" white onclick={()=>{
			signIn("google")
		}}>구글로 로그인하기</Button>
		<Button size="md" white>애플로 로그인하기</Button>

		  {#if $page.data.session}
          {#if $page.data.session.user?.image}
            <span
              style="background-image: url('{$page.data.session.user.image}')"
              class="avatar"
            />
          {/if}
          <span class="signedInText">
            <small>Signed in as</small><br />
            <strong
              >{$page.data.session.user?.email ??
                $page.data.session.user?.name}</strong
            >
          </span>
          <a href="/auth/signout" class="button" data-sveltekit-preload-data="off">Sign out</a>
        {:else}
          <span class="notSignedInText">You are not signed in</span>
          <a href="/auth/signin" class="buttonPrimary" data-sveltekit-preload-data="off">Sign in</a>
        {/if}
	</div>
{/if}




<style>
	.wrapper {
		padding: 20px; /* Adjust the padding as needed */
	}
	.container :global(.btn) {
		margin-top: 6px;
		margin-bottom: 6px;
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
