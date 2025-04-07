<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import ReCol from '@/components/MyCol';
import { chartData, useDark } from './utils';
import { ReNormalCountTo } from '@/components/CountTo';
import ChartLine from '@/views/welcome/components/ChartLine.vue';
import ChartRound from '@/views/welcome/components/ChartRound.vue';
import { getServerCommitList, getWebCommitList, serverCommitList, webCommitList } from '@/views/welcome/utils';
import WebReadMe from '@/views/welcome/components/web-read-me.vue';
import { TabsPaneContext } from 'element-plus';
import ServerReadMe from '@/views/welcome/components/server-read-me.vue';

const { isDark } = useDark();

// 当前tab名称
const activeName = ref('web');

// 修改tab名称
const onTabClick = (tab: TabsPaneContext, _: Event) => {
	activeName.value = tab.paneName.toString();
};

onMounted(() => {
	getWebCommitList();
	getServerCommitList();
});
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

			<el-row :gutter="24" class="w-[100%] justify-around">
				<re-col v-motion :enter="{ opacity: 1, y: 0, transition: { delay: 560 } }" :initial="{ opacity: 0, y: 100 }" :lg="16" :sm="24" :xl="18" :xs="24" class="mb-[18px]">
					<el-card class="h-[1178px] overflow-y-auto" shadow="never">
						<el-tabs v-model="activeName" class="demo-tabs" @tab-click="onTabClick">
							<el-tab-pane label="前端文档" name="web">
								<web-read-me class="mt-3 h-[100%]" />
							</el-tab-pane>
							<el-tab-pane label="后端文档" name="server">
								<server-read-me class="mt-3 h-[100%]" />
							</el-tab-pane>
						</el-tabs>
					</el-card>
				</re-col>

				<re-col v-motion :enter="{ opacity: 1, y: 0, transition: { delay: 640 } }" :initial="{ opacity: 0, y: 100 }" :lg="8" :sm="24" :xl="6" :xs="24">
					<el-card class="mb-[18px]" shadow="never">
						<div class="flex justify-between">
							<span class="text-md font-medium">前端git近期20次更改</span>
						</div>
						<el-scrollbar class="mt-3" max-height="504">
							<el-timeline>
								<el-timeline-item v-for="(item, index) in webCommitList" :key="index" :timestamp="item.date" center placement="top">
									<p class="text-text_color_regular text-sm">
										<el-link :href="item.html_url" :title="item.message" :underline="false" target="_blank">
											{{ `提交信息：${item.message}，提交用户：` }}
										</el-link>
										<el-link :href="item.url" :title="item.username" :underline="false" target="_blank">
											<el-avatar :size="16" :src="item.avatar_url" class="align-middle" />
											{{ ` ${item.username}` }}
										</el-link>
									</p>
								</el-timeline-item>
							</el-timeline>
						</el-scrollbar>
					</el-card>

					<el-card shadow="never">
						<div class="flex justify-between">
							<span class="text-md font-medium">后端git近期20次更改</span>
						</div>
						<el-scrollbar class="mt-3" max-height="504">
							<el-timeline>
								<el-timeline-item v-for="(item, index) in serverCommitList" :key="index" :timestamp="item.date" center placement="top">
									<p class="text-text_color_regular text-sm">
										<el-link :href="item.html_url" :title="item.message" :underline="false" target="_blank">
											{{ `提交信息：${item.message}，提交用户：` }}
										</el-link>
										<el-link :href="item.url" :title="item.username" :underline="false" target="_blank">
											<el-avatar :size="16" :src="item.avatar_url" class="align-middle" />
											{{ ` ${item.username}` }}
										</el-link>
									</p>
								</el-timeline-item>
							</el-timeline>
						</el-scrollbar>
					</el-card>
				</re-col>
			</el-row>
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
