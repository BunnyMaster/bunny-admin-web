<script lang="ts" setup>
import { getCurrentInstance, ref, watch } from 'vue';
import Dept from '@iconify-icons/ri/git-branch-line';
import More2Fill from '@iconify-icons/ri/more-2-fill';
import OfficeBuilding from '@iconify-icons/ep/office-building';
import LocationCompany from '@iconify-icons/ep/add-location';
import ExpandIcon from '@/assets/svg/expand.svg?component';
import UnExpandIcon from '@/assets/svg/unexpand.svg?component';
import { useRenderIcon } from '@/components/CommonIcon/src/hooks';
import Reset from '@iconify-icons/ri/restart-line';
import { Tree } from '@/views/system/adminUser/utils/types';
import { buttonClass, defaultProps } from '@/views/system/adminUser/utils/columns';
import { useAdminUserStore } from '@/store/system/adminUser';
import { onSearch } from '@/views/system/adminUser/utils/hooks';
import { $t } from '@/plugins/i18n';

defineProps({
	treeLoading: Boolean,
	treeData: Array,
});

const emit = defineEmits(['tree-select']);

const adminUserStore = useAdminUserStore();
const treeRef = ref();
const isExpand = ref(true);
const searchValue = ref('');
const highlightMap = ref({});
const { proxy } = getCurrentInstance();

const filterNode = (value: string, data: Tree) => {
	if (!value) return true;
	return data.deptName.includes(value);
};

function nodeClick(value) {
	const nodeId = value.$treeNodeId;
	highlightMap.value[nodeId] = highlightMap.value[nodeId]?.highlight
		? Object.assign({ id: nodeId }, highlightMap.value[nodeId], {
				highlight: false,
			})
		: Object.assign({ id: nodeId }, highlightMap.value[nodeId], {
				highlight: true,
			});
	Object.values(highlightMap.value).forEach((v: Tree) => {
		if (v.id !== nodeId) {
			v.highlight = false;
		}
	});
	emit(
		'tree-select',
		highlightMap.value[nodeId]?.highlight
			? Object.assign({
					...value,
					selected: true,
				})
			: Object.assign({ ...value, selected: false }),
	);
}

function toggleRowExpansionAll(status) {
	isExpand.value = status;
	const nodes = (proxy.$refs['treeRef'] as any).store._getAllNodes();
	for (let i = 0; i < nodes.length; i++) {
		nodes[i].expanded = status;
	}
}

/** 重置部门树状态（选中状态、搜索框值、树初始化） */
function onTreeReset() {
	highlightMap.value = {};
	searchValue.value = '';
	adminUserStore.form.deptIds = undefined;
	toggleRowExpansionAll(true);
	onSearch();
}

watch(searchValue, val => {
	treeRef.value!.filter(val);
});

defineExpose({ onTreeReset });
</script>

<template>
	<div v-loading="treeLoading" :style="{ minHeight: `calc(100vh - 130px)` }" class="h-full bg-bg_color overflow-hidden relative">
		<div class="flex items-center h-[34px]">
			<el-input v-model="searchValue" :placeholder="$t('input') + $t('adminUser_dept')" class="ml-2" clearable size="small">
				<template #suffix>
					<el-icon class="el-input__icon">
						<IconifyIconOffline v-show="searchValue.length === 0" icon="ri:search-line" />
					</el-icon>
				</template>
			</el-input>
			<el-dropdown :hide-on-click="false">
				<IconifyIconOffline :icon="More2Fill" class="w-[28px] cursor-pointer" width="18px" />
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item>
							<el-button :class="buttonClass" :icon="useRenderIcon(isExpand ? ExpandIcon : UnExpandIcon)" link type="primary" @click="toggleRowExpansionAll(!isExpand)">
								{{ isExpand ? $t('fold_all') : $t('unfold_all') }}
							</el-button>
						</el-dropdown-item>
						<el-dropdown-item>
							<el-button :class="buttonClass" :icon="useRenderIcon(Reset)" link type="primary" @click="onTreeReset">
								{{ $t('buttons.reset') }}
							</el-button>
						</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
		<el-divider />
		<el-scrollbar height="calc(90vh - 88px)">
			<el-tree ref="treeRef" :data="treeData" :expand-on-click-node="false" :filter-node-method="filterNode" :props="defaultProps" default-expand-all node-key="id" size="small" @node-click="nodeClick">
				<template #default="{ node, data }">
					<div
						:class="[
							'rounded',
							'flex',
							'items-center',
							'select-none',
							'hover:text-primary',
							searchValue.trim().length > 0 && node.label.includes(searchValue) && 'text-red-500',
							highlightMap[node.id]?.highlight ? 'dark:text-primary' : '',
						]"
						:style="{
							color: highlightMap[node.id]?.highlight ? 'var(--el-color-primary)' : '',
							background: highlightMap[node.id]?.highlight ? 'var(--el-color-primary-light-7)' : 'transparent',
						}"
					>
						<IconifyIconOffline :icon="data.type === 1 ? OfficeBuilding : data.type === 2 ? LocationCompany : Dept" />
						<span :title="node.label" class="!w-[120px] !truncate">
							{{ node.label }}
						</span>
					</div>
				</template>
			</el-tree>
		</el-scrollbar>
	</div>
</template>

<style lang="scss" scoped>
:deep(.el-divider) {
	margin: 0;
}

:deep(.el-tree) {
	--el-tree-node-hover-bg-color: transparent;
}
</style>
