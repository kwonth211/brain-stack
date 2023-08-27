<script>
	import Button from '$components/Button.svelte';
	import Header from '$components/Header.svelte';
	import { fade } from 'svelte/transition';
	import Input from '$components/Input.svelte';
	import { signOut } from '@auth/sveltekit/client';
</script>

<div in:fade>
	<Header>계정정보</Header>

	<form>
		<Input label="이름" placeholder="이름 입력" />
		<Input label="이메일" placeholder="이메일을 입력해주세요" />
		<Input label="닉네임" placeholder="비밀번호를 입력해주세요." />

		<Button primary classes="change-user-info">회원 정보 변경</Button>
		<Button
			gray
			classes="logout"
			onclick={() => {
				signOut();
			}}
		>
			로그아웃
		</Button>
	</form>
</div>

<style>
	form {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: calc(100vh - 82px);
		padding: 16px;
		gap: 10px;
	}
	form :global(label) {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	form :global(div) {
		width: 100px;
	}

	form :global(.logout) {
		margin-top: auto;
		height: var(--button-height);
	}
	form :global(.change-user-info) {
		height: var(--button-height);
	}
</style>
