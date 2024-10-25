<script lang="ts" setup>
import { onMounted, ref } from 'vue';
// import 'echarts-gl';
import { cardClass, cardLogoClass } from '@/views/monitor/server/utils/columns';
import { useRenderIcon } from '@/components/CommonIcon/src/hooks';
import { fetchSystemDiskFree, fetchSystemDiskTotal } from '@/api/v1/actuator';

const free = ref();
const total = ref();
const percentage = ref<number>(0);

/** 初始化数据 */
const onSearch = async () => {
	// 获取数据
	const diskFree = await fetchSystemDiskFree();
	const diskTotal = await fetchSystemDiskTotal();
	free.value = diskFree.measurements[0].value / 1024 / 1024 / 1024;
	total.value = diskTotal.measurements[0].value / 1024 / 1024 / 1024;

	free.value = free.value.toFixed(2);
	total.value = total.value.toFixed(2);

	percentage.value = ((total.value - free.value) / total.value) * 100;
	percentage.value = Number(percentage.value.toFixed(2));
};

onMounted(() => {
	onSearch();
});
</script>

<template>
	<el-col :lg="6" :md="8" :sm="12" :xl="4" :xs="24">
		<div :class="cardClass">
			<div class="list-card-item_detail bg-bg_color">
				<el-row justify="space-between">
					<div :class="cardLogoClass">
						<component :is="useRenderIcon('carbon:logo-vmware')" />
					</div>
				</el-row>
				<p class="list-card-item_detail--name text-text_color_primary">磁盘使用</p>
				<div class="flex justify-center">
					<el-progress :percentage="percentage" type="dashboard" />
				</div>
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
