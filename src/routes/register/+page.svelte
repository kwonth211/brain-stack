<script>
	import Button from '$components/Button.svelte';
	import Header from '$components/Header.svelte';
	import { fade } from 'svelte/transition';
	import Input from '$components/Input.svelte';
</script>

<div in:fade>
	<Header>회원가입</Header>

	<form>
		<Input label="이름" placeholder="이름 입력" />
		<Input label="이메일" placeholder="이메일을 입력해주세요" />
		<Input label="비밀번호" placeholder="비밀번호를 입력해주세요." />
		<Input placeholder="비밀번호를 재입력해주세요." />

		<Button primary classes="register-submit">회원가입하기</Button>
	</form>
</div>

<style>
	:global(.register-submit) {
		height: var(--button-height);
	}
	form {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: calc(100vh - 82px);
		padding: 16px;
	}
	form :global(label) {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	form :global(div) {
		width: 100px;
	}
	form :global(.label:last-of-type) {
		padding-left: 76px;
	}
	/* No need for position: absolute */
	form :global(.btn) {
		margin-top: auto; /* Pushes the button to the bottom */
	}
</style>
