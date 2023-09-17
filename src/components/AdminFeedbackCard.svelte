<script lang="ts">
	import CheckAnimationIcon from './icons/CheckAnimationIcon.svelte';
</script>

<div class="flip-box">
	<div class="flip-box-inner">
		<div class={'flip-box-front bounce'}>
			<div class={'correct-text'}>
				<CheckAnimationIcon animate={true} color={'var(--primary)'} />
				관리자에게 피드백을 보냈어요!
			</div>
			<div class={'is-correct-sub-text'}>의견을 주셔서 감사해요</div>
		</div>
	</div>
</div>

<style>
	.flip-box {
		background-color: transparent;
		width: 200px;
		height: 100px;
	}

	.flip-box-inner {
		position: relative;
		width: 100%;
		height: 100%;
		text-align: center;
		transition: transform 0.4s;
		transform-style: preserve-3d;
	}
	.is-correct-sub-text {
		color: #7d7979;
		font-size: 12px;
	}

	.flip-box-front {
		position: absolute;
		width: 100%;
		height: 100%;
		-webkit-backface-visibility: hidden; /* Safari */
		backface-visibility: hidden;
		background: #fff;
		box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.2);

		padding: 15px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		border-radius: 8px;

		font-family: Pretendard;
		font-size: 18px;
		font-style: normal;
		font-weight: 500;
		line-height: 22px; /* 122.222% */
		letter-spacing: -0.408px;
		background-color: white;

		width: 210px;
		min-height: 87px;
		height: auto;
		flex-shrink: 0;
		border-radius: 8px;
		background: #fff;
		box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.2);
		gap: 5px;
	}

	.flip-box-front {
		color: black;
		display: flex;
		justify-content: center;
	}

	.correct-text {
		display: flex;
		width: 100%;
		align-items: center;
		font-size: 14px;
	}
</style>
