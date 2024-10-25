<script lang="ts" setup>
import { useRenderIcon } from '@/components/CommonIcon/src/hooks';
import { cardClass, cardLogoClass } from '@/views/monitor/server/utils/columns';

defineProps({
	info: { type: Object as PropType<any> },
});
</script>

<template>
	<el-col :lg="6" :md="8" :sm="12" :xl="4" :xs="24">
		<div :class="cardClass">
			<div class="list-card-item_detail bg-bg_color">
				<el-row justify="space-between">
					<div :class="cardLogoClass">
						<component :is="useRenderIcon('devicon:java')" />
					</div>
				</el-row>
				<p class="list-card-item_detail--name text-text_color_primary">java</p>
				<el-text>
					<div>Java版本：{{ info?.java?.version }}</div>

					<div>供应商：{{ info?.java?.vendor?.name }}</div>
					<div>供应商版本：{{ info?.java?.vendor?.version }}</div>

					<div>运行时：{{ info?.java?.runtime?.name }}</div>
					<div>运行时版本：{{ info?.java?.runtime?.version }}</div>

					<div>jvm：{{ info?.java?.jvm?.name }}</div>
					<div>jvm版本：{{ info?.java?.jvm?.version }}</div>
				</el-text>
			</div>
		</div>
	</el-col>

	<el-col :lg="6" :md="8" :sm="12" :xl="4" :xs="24">
		<div :class="cardClass">
			<div class="list-card-item_detail bg-bg_color">
				<el-row justify="space-between">
					<div :class="cardLogoClass">
						<component :is="useRenderIcon('mdi:server')" />
					</div>
				</el-row>
				<p class="list-card-item_detail--name text-text_color_primary">系统信息</p>
				<el-text>
					<div>系统名称： {{ info?.os?.name }}</div>
					<div>系统版本： {{ info?.os?.version }}</div>
					<div>系统架构： {{ info?.os?.arch }}</div>
				</el-text>
			</div>
		</div>
	</el-col>
</template>

<style lang="scss" scoped>
.list-card-item {
	display: flex;
	flex-direction: column;
	margin-bottom: 12px;
	overflow: hidden;
	cursor: pointer;
	border-radius: 3px;

	&_detail {
		flex: 1;
		min-height: 140px;
		padding: 24px 32px;

		&--logo {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 46px;
			height: 46px;
			font-size: 26px;
			color: #0052d9;
			background: #e0ebff;
			border-radius: 50%;

			&__disabled {
				color: #a1c4ff;
			}
		}

		&--operation {
			display: flex;
			height: 100%;

			&--tag {
				border: 0;
			}
		}

		&--name {
			margin: 24px 0 8px;
			font-size: 16px;
			font-weight: 400;
		}

		&--desc {
			display: -webkit-box;
			height: 40px;
			margin-bottom: 24px;
			overflow: hidden;
			font-size: 12px;
			line-height: 20px;
			text-overflow: ellipsis;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
	}

	&__disabled {
		.list-card-item_detail--name {
			color: var(--el-text-color-disabled);
		}

		.list-card-item_detail--operation--tag {
			color: #bababa;
		}
	}
}
</style>
