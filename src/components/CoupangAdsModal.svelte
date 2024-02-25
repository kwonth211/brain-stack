<script lang="ts">
	import Input from './Input.svelte';
	import ModalCloseIcon from './icons/ModalCloseIcon.svelte';
	import XIcon from './icons/XIcon.svelte';

	export let close: () => void;
	let modal: EventTarget;
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
			<XIcon
				color="gray"
				size={16}
				onClick={() => {
					close();
				}}
			/>
		</div>

		<iframe
			src="https://ads-partners.coupang.com/widgets.html?id=760532&template=carousel&trackingCode=AF4273880&subId=&width=280&height=280&tsource="
			width="280"
			height="280"
			frameborder="0"
			scrolling="no"
			referrerpolicy="unsafe-url"
		/>
		<div class="subText">
			이 포스팅은 쿠팡 파트너스 활동의 일환으로,<br /> 이에 따른 일정액의 수수료를 제공받습니다.
		</div>
	</div>
</div>

<style>
	.subText {
		font-size: 12px;
		color: #666;
		text-align: center;
	}
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
		/* background: rgba(0, 0, 0, 0.4); */
		max-width: var(--max-width);
		margin: 0 auto;
		right: 0px;
	}
	.modal-content {
		gap: 10px;
		height: fit-content;
		padding: 15px;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: white;
		position: relative;
		border: 1px solid #e0e0e0;
	}
	.modal-close {
		display: flex;
		position: absolute;
		right: 25px;
		top: 25px;
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
