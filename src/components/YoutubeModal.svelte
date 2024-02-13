<script lang="ts">
	import Youtube from './icons/Youtube.svelte';

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
		<!-- <div class="modal-close">
			<ModalCloseIcon
				color="red"
				onClick={() => {
					close();
				}}
			/>
		</div> -->
		<div class="title">🎉YouTube 채널이 개설되었어요🎉</div>
		<div class="description">더 많은 컨텐츠를 즐겨보세요</div>
		<a
			href="https://youtube.com/@dual-brain?si=GRtLG2_s9U019agF"
			target="_blank"
			class="youtube-link"
		>
			<!-- <Youtube /> -->
			채널 바로가기</a
		>
	</div>
</div>

<style>
	.title {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-weight: 500;
		font-size: 16px;
		color: #000;
		text-align: center;
		font-family: Pretendard;
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
		height: fit-content;
		width: 240px;
		padding: 15px;
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: white;
		position: relative;
		border-radius: 10px;
	}
	.youtube-link {
		margin-top: 10px;
		background-color: #ff0000;
		color: #ffffff;
		padding: 10px 15px;
		border-radius: 5px;
		text-align: center;
		text-decoration: none;
		font-weight: 600;
	}
	.description {
		text-align: center;
		font-size: 14px;
		color: #000;
	}
</style>
