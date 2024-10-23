<script lang="ts" setup>
import { ref } from 'vue';
import ReCol from '@/components/MyCol';
import { useDark } from './utils';
import WelcomeTable from './components/table/index.vue';
import { ReNormalCountTo } from '@/components/CountTo';
import { ChartBar, ChartLine, ChartRound } from './components/charts';
import Segmented, { type OptionsType } from '@/components/Segmented';
import { barChartData, chartData, latestNewsData, progressData } from './data';

const { isDark } = useDark();
let curWeek = ref(1); // 0上周、1本周
const optionsBasis: Array<OptionsType> = [{ label: '上周' }, { label: '本周' }];
</script>

<template>
	<div>
		<el-row :gutter="24" justify="space-around">
			<re-col
				v-for="(item, index) in chartData"
				:key="index"
				v-motion
				:enter="{ opacity: 1, y: 0, transition: { delay: 80 * (index + 1) } }"
				:initial="{ opacity: 0, y: 100 }"
				:md="12"
				:sm="12"
				:value="6"
				:xs="24"
				class="mb-[18px]"
			>
				<el-card class="line-card" shadow="never">
					<div class="flex justify-between">
						<span class="text-md font-medium">
							{{ item.name }}
						</span>
						<div :style="{ backgroundColor: isDark ? 'transparent' : item.bgColor }" class="w-8 h-8 flex justify-center items-center rounded-md">
							<IconifyIconOffline :color="item.color" :icon="item.icon" width="18" />
						</div>
					</div>
					<div class="flex justify-between items-start mt-3">
						<div class="w-1/2">
							<ReNormalCountTo :duration="item.duration" :endVal="item.value" :fontSize="'1.6em'" :startVal="100" />
							<p class="font-medium text-green-500">{{ item.percent }}</p>
						</div>
						<ChartLine v-if="item.data.length > 1" :color="item.color" :data="item.data" class="!w-1/2" />
						<ChartRound v-else class="!w-1/2" />
					</div>
				</el-card>
			</re-col>

			<re-col v-motion :enter="{ opacity: 1, y: 0, transition: { delay: 400 } }" :initial="{ opacity: 0, y: 100 }" :value="18" :xs="24" class="mb-[18px]">
				<el-card class="bar-card" shadow="never">
					<div class="flex justify-between">
						<span class="text-md font-medium">分析概览</span>
						<Segmented v-model="curWeek" :options="optionsBasis" />
					</div>
					<div class="flex justify-between items-start mt-3">
						<ChartBar :questionData="barChartData[curWeek].questionData" :requireData="barChartData[curWeek].requireData" />
					</div>
				</el-card>
			</re-col>

			<re-col v-motion :enter="{ opacity: 1, y: 0, transition: { delay: 480 } }" :initial="{ opacity: 0, y: 100 }" :value="6" :xs="24" class="mb-[18px]">
				<el-card shadow="never">
					<div class="flex justify-between">
						<span class="text-md font-medium">解决概率</span>
					</div>
					<div v-for="(item, index) in progressData" :key="index" :class="['flex', 'justify-between', 'items-start', index === 0 ? 'mt-8' : 'mt-[2.15rem]']">
						<el-progress :color="item.color" :duration="item.duration" :percentage="item.percentage" :stroke-width="21" :text-inside="true" striped striped-flow />
						<span class="text-nowrap ml-2 text-text_color_regular text-sm">
							{{ item.week }}
						</span>
					</div>
				</el-card>
			</re-col>

			<re-col v-motion :enter="{ opacity: 1, y: 0, transition: { delay: 560 } }" :initial="{ opacity: 0, y: 100 }" :value="18" :xs="24" class="mb-[18px]">
				<el-card class="h-[580px]" shadow="never">
					<div class="flex justify-between">
						<span class="text-md font-medium">数据统计</span>
					</div>
					<WelcomeTable class="mt-3" />
				</el-card>
			</re-col>

			<re-col v-motion :enter="{ opacity: 1, y: 0, transition: { delay: 640 } }" :initial="{ opacity: 0, y: 100 }" :value="6" :xs="24" class="mb-[18px]">
				<el-card shadow="never">
					<div class="flex justify-between">
						<span class="text-md font-medium">最新动态</span>
					</div>
					<el-scrollbar class="mt-3" max-height="504">
						<el-timeline>
							<el-timeline-item v-for="(item, index) in latestNewsData" :key="index" :timestamp="item.date" center placement="top">
								<p class="text-text_color_regular text-sm">
									{{ `新增 ${item.requiredNumber} 条问题，${item.resolveNumber} 条已解决` }}
								</p>
							</el-timeline-item>
						</el-timeline>
					</el-scrollbar>
				</el-card>
			</re-col>
		</el-row>
	</div>
</template>

<style lang="scss" scoped>
:deep(.el-card) {
	--el-card-border-color: none;

	/* 解决概率进度条宽度 */
	.el-progress--line {
		width: 85%;
	}

	/* 解决概率进度条字体大小 */
	.el-progress-bar__innerText {
		font-size: 15px;
	}

	/* 隐藏 el-scrollbar 滚动条 */
	.el-scrollbar__bar {
		display: none;
	}

	/* el-timeline 每一项上下、左右边距 */
	.el-timeline-item {
		margin: 0 6px;
	}
}

.main-content {
	margin: 20px 20px 0 !important;
}
</style>
