<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { UtilsEChartsOption } from '@pureadmin/utils';
// import 'echarts-gl';
import { cardClass, cardLogoClass } from '@/views/monitor/server/utils/columns';
import { useRenderIcon } from '@/components/CommonIcon/src/hooks';
import * as echarts from 'echarts';
import { useIntervalFn } from '@vueuse/core';
import dayjs from 'dayjs';
import { fetchSystemProcessCPU } from '@/api/v1/actuator';

const jvmCPUECharts = ref();
const myChart = ref<any>();

// 初始化ECharts
const seriesData = ref([]);
const xSeriesData = ref([]);

const option = reactive<UtilsEChartsOption>({
	tooltip: {
		trigger: 'axis',
		axisPointer: { type: 'cross' },
		extraCssText: 'width: 170px',
	},
	legend: {
		top: '0%',
		left: 'center',
	},
	grid: {
		top: '20px',
		right: '20px',
		bottom: '20px',
	},
	xAxis: {
		type: 'category',
		boundaryGap: false,
		inverse: true,
	},
	yAxis: {
		type: 'value',
	},
	series: [
		{
			data: seriesData.value,
			type: 'line',
			areaStyle: {},
			animationDelay: function (idx) {
				return idx * 10; // 设置动画延迟时间
			},
			animationDuration: 1000, // 设置动画持续时间
		},
	],
	animationDuration: 666,
	animationDurationUpdate: 200,
	animationEasing: 'linear',
	animationEasingUpdate: 'linear',
});

/** 初始化数据 */
const onSearch = async () => {
	// 保留数组中的最新10条数据
	if (seriesData.value.length > 5) {
		seriesData.value = seriesData.value.slice(-5);
		xSeriesData.value = xSeriesData.value.slice(-5);
	}

	// 获取数据
	const result = await fetchSystemProcessCPU();
	const measurement = result.measurements[0];
	if (measurement) {
		const value = measurement.value;
		seriesData.value.push(value * 100);
		xSeriesData.value.push(dayjs().format('mm:ss'));
	}

	myChart.value.setOption({
		xAxis: { data: xSeriesData.value },
		series: [{ type: 'line', data: seriesData.value }],
	});
};

onMounted(() => {
	// 初始化eacharts
	myChart.value = echarts.init(jvmCPUECharts.value);
	option && myChart.value.setOption(option);

	onSearch();

	// 定时刷新
	useIntervalFn(() => onSearch(), 1000);
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
				<p class="list-card-item_detail--name text-text_color_primary">JVM最近cpu使用率</p>
				<div ref="jvmCPUECharts" style="width: 100%; height: 230px" />
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
