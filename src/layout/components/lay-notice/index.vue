<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { computed, onMounted, ref } from 'vue';
import { getAllMessageList, noticesData } from './data';
import NoticeList from './components/NoticeList.vue';
import BellIcon from '@iconify-icons/ep/bell';

const { t } = useI18n();
const noticesNum = ref(0);
// 通知消息数据
const notices = ref(noticesData);
// 选择的消息栏目
const activeKey = ref(noticesData.value[0]?.key);

const getLabel = computed(() => item => item.name + (item.list.length > 0 ? `(${item.list.length})` : ''));

onMounted(async () => {
	// 获取所有的消息
	await getAllMessageList();
	// 整合消息一共多少条
	notices.value.map(v => (noticesNum.value += v.list.length));
	// 默认选中的消息类别
	activeKey.value = noticesData.value[0]?.key;
});
</script>

<template>
	<el-dropdown placement="bottom-end" trigger="click">
		<span :class="['dropdown-badge', 'navbar-bg-hover', 'select-none', Number(noticesNum) !== 0 && 'mr-[10px]']">
			<el-badge :max="99" :value="Number(noticesNum) === 0 ? '' : noticesNum">
				<span class="header-notice-icon">
					<IconifyIconOffline :icon="BellIcon" />
				</span>
			</el-badge>
		</span>
		<template #dropdown>
			<el-dropdown-menu>
				<el-tabs v-model="activeKey" :stretch="true" :style="{ width: notices.length === 0 ? '200px' : '330px' }" class="dropdown-tabs">
					<el-empty v-if="notices.length === 0" :description="t('status.pureNoMessage')" :image-size="60" />
					<span v-else>
						<template v-for="item in notices" :key="item.key">
							<el-tab-pane :label="getLabel(item)" :name="`${item.key}`">
								<el-scrollbar max-height="330px">
									<div class="noticeList-container">
										<NoticeList :emptyText="item.emptyText" :list="item.list" />
									</div>
								</el-scrollbar>
							</el-tab-pane>
						</template>
					</span>
				</el-tabs>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<style lang="scss" scoped>
.dropdown-badge {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 48px;
	cursor: pointer;

	.header-notice-icon {
		font-size: 18px;
	}
}

.dropdown-tabs {
	.noticeList-container {
		padding: 15px 24px 0;
	}

	:deep(.el-tabs__header) {
		margin: 0;
	}

	:deep(.el-tabs__nav-wrap)::after {
		height: 1px;
	}

	:deep(.el-tabs__nav-wrap) {
		padding: 0 36px;
	}
}
</style>
