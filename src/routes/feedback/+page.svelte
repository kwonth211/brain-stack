<script>
	import { goto } from '$app/navigation';
	import DrawerHeader from '$components/DrawerHeader.svelte';
	import { axios } from '$lib/axios';
	import AdminFeedbackModal from '$components/AdminFeedbackModal.svelte';

	let email = '';
	let message = '';
	let selectedOption = '이런 거 해주세요!';
	let showAdminFeedbackModal = false;

	const handleSubmit = async () => {
		try {
			await axios.post('/api/feedback/create', {
				email,
				message,
				selectedOption
			});
			showAdminFeedbackModal = true;
		} catch (error) {}
	};
</script>

<div class="container">
	<DrawerHeader
		onClick={() => {
			goto('/');
		}}>의견 보내기</DrawerHeader
	>
	<div class="wrapper">
		<div class="brain-title">브레인들의 도움이 필요해요</div>
		<div class="sub-text-container">
			<div class="sub-text">문제점이 있다면 알려주세요</div>
			<div class="sub-text">브레인들의 아이디어가 필요해요.</div>
			<div class="sub-text">아무말이나 다 좋아요.</div>
		</div>
		<div class="ask">
			<img
				src="https://dual-brain.s3.ap-northeast-2.amazonaws.com/logo.png"
				class="logo"
				alt="logo"
			/>

			<form id="brand" on:submit|preventDefault={handleSubmit}>
				<select
					bind:value={selectedOption}
					name="ask-options"
					id="ask-options"
					class="option-select"
				>
					<option value="이런 거 해주세요!">이런 거 해주세요!</option>
					<option value="문제가 있어요 고쳐주세요.">문제가 있어요 고쳐주세요.</option>
					<option value="응원해요!">응원해요!</option>
					<option value="아무 이야기나 할래요.">아무 이야기나 할래요.</option>
				</select>
				<div id="form-contents">
					<label class="title" for="email">이메일</label>
					<input bind:value={email} type="email" placeholder="이메일을 적어주세요." name="email" />
					<br />
					<label class="title" for="contents">내용</label>
					<textarea
						bind:value={message}
						placeholder="소중한 피드백, 빠르게 반영할게요"
						name="contents"
					/>
					<input type="submit" value="보내기" id="submitmail" />
				</div>
			</form>
		</div>

		{#if showAdminFeedbackModal}
			<AdminFeedbackModal
				close={() => {
					showAdminFeedbackModal = false;
				}}
			/>
		{/if}
	</div>
</div>

<style>
	.wrapper {
		padding: 20px;
	}
	.container {
		box-sizing: border-box;
	}

	.brain-title {
		font-size: 24px;
		line-height: 1.4;
		font-family: 'Pretendard', sans-serif;
		font-weight: bold;
	}

	.sub-text-container {
		margin-bottom: 20px;
		font-size: 13px;
		color: #666;
		font-family: 'Pretendard', sans-serif;
	}

	.popup-message-box {
		background-color: #f9f9f9;
		border-radius: 10px;
		padding: 15px;
		text-align: center;
		font-size: 18px;
		margin-bottom: 20px;
	}

	form {
		background-color: #ffffff;
		border-radius: 10px;
		/* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
		display: flex;
		flex-direction: column;
		gap: 20px;
		margin-top: 10px;
	}

	.option-select {
		width: 100%;
		padding: 10px;
		border-radius: 5px;
		border: 1px solid #ddd;
	}

	.title {
		display: block;
		margin-bottom: 5px;
		font-weight: bold;
	}

	input[type='email'],
	textarea {
		width: 100%;
		padding: 10px;
		margin-bottom: 20px;
		border-radius: 5px;
		box-sizing: border-box;
		border: 1px solid #ddd;
	}

	textarea {
		min-height: 150px;
		resize: vertical;
	}

	input[type='submit'] {
		background-color: var(--primary);
		color: white;
		padding: 10px 20px;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		font-size: 16px;
		width: 100%;
	}

	input[type='submit']:hover {
		background-color: #0056b3;
	}
	.logo {
		display: block;
		width: 100%;
		max-width: 200px;
		margin: 0 auto;
	}
</style>
