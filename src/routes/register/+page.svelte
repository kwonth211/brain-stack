<script lang="ts">
	import Button from '$components/Button.svelte';
	import Header from '$components/Header.svelte';
	import { fade } from 'svelte/transition';
	import Input from '$components/Input.svelte';
	import { signIn } from '@auth/sveltekit/client';

	let name = '';
	let email = '';
	let password = '';
	let passwordConfirm = '';
	let isValidate = false;

	let errors = {
		name: '',
		email: '',
		password: '',
		passwordConfirm: ''
	};
	const nameValidation = (name: string) => {
		if (!name) {
			return '이름을 필수로 입력해주세요.';
		}
		return '';
	};
	const emailValidation = (email: string) => {
		if (!email) {
			return '이메일을 필수로 입력해주세요.';
		}
		if (!/^[^@]+@\w+(\.\w+)+\w$/.test(email)) {
			return '유효한 이메일을 입력해주세요.';
		}
		return '';
	};
	const passwordValidation = (password: string) => {
		if (!password) {
			return '비밀번호를 필수로 입력해주세요.';
		}
		if (password.length < 8) {
			return '비밀번호를 8자리 이상 입력해주세요.';
		}
		return '';
	};
	const passwordConfirmValidation = (passwordConfirm: string) => {
		if (!passwordConfirm) {
			return '비밀번호를 필수로 입력해주세요.';
		}
		if (passwordConfirm !== password) {
			return '비밀번호가 일치하지 않습니다.';
		}
		return '';
	};

	const handleSubmit = async () => {
		isValidate = true;
		errors.name = nameValidation(name);
		errors.email = emailValidation(email);
		errors.password = passwordValidation(password);
		errors.passwordConfirm = passwordConfirmValidation(passwordConfirm);

		if (!Object.values(errors).some((e) => e)) {
			try {
				await fetch('/api/auth/register', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						name,
						email,
						password
					})
				});
				await signIn('email', {
					email,
					password
				});
			} catch (error) {}
		}
	};
	$: buttonDisabled =
		Object.values(errors).some((e) => e) ||
		name === '' ||
		email === '' ||
		password === '' ||
		passwordConfirm === '';
</script>

<div in:fade>
	<Header>회원가입</Header>

	<form on:submit|preventDefault={handleSubmit}>
		<Input
			on:input={(e) => {
				if (!isValidate) {
					return;
				}

				errors.name = nameValidation(e.detail);
			}}
			label="이름"
			placeholder="이름 입력"
			bind:value={name}
			error={errors.name}
		/>
		<Input
			label="이메일"
			placeholder="이메일을 입력해주세요"
			bind:value={email}
			error={errors.email}
			on:input={(e) => {
				if (!isValidate) {
					return;
				}
				errors.email = emailValidation(e.detail);
			}}
		/>
		<Input
			label="비밀번호"
			placeholder="비밀번호를 입력해주세요."
			bind:value={password}
			type="password"
			on:input={(e) => {
				if (!isValidate) {
					return;
				}
				errors.password = passwordValidation(e.detail);
			}}
			error={errors.password}
		/>
		<Input
			placeholder="비밀번호를 재입력해주세요."
			bind:value={passwordConfirm}
			error={errors.passwordConfirm}
			type="password"
			on:input={(e) => {
				if (!isValidate) {
					return;
				}
				errors.passwordConfirm = passwordConfirmValidation(e.detail);
			}}
		/>

		<Button primary disabled={buttonDisabled} classes="register-submit" buttonType="submit"
			>회원가입하기</Button
		>
	</form>
</div>

<style>
	:global(.register-submit) {
		height: var(--button-height);
	}
	form {
		gap: 5px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: calc(100vh - 82px);
		padding: 16px;
	}
	form :global(label) {
		/* display: flex;
		flex-direction: row;
		align-items: center; */

		display: flex;
		flex-direction: column; /* 이 부분을 column으로 변경 */
	}
	form :global(.label-span) {
		width: 100px;
	}
	form :global(.label:last-of-type) {
		/* padding-left: 76px; */
	}
	form :global(.btn) {
		margin-top: auto;
	}
</style>
