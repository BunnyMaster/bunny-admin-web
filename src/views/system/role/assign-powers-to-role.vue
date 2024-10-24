<script lang="ts" setup>
import { iconClass } from '@/views/system/role/utils/columns';
import Close from '@iconify-icons/ep/close';
import Check from '@iconify-icons/ep/check';
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { delay, getKeyList, handleTree, subBefore, useResizeObserver } from '@pureadmin/utils';
import { contentRef, currentRow, onMenuPowerClick, powerTreeIsShow, powerTreeRef, tableRef } from '@/views/system/role/utils/hooks';
import { usePowerStore } from '@/store/system/power';
import { powerCascadeProps } from '@/views/system/power/utils/columns';
import { useRoleStore } from '@/store/system/role';

const powerStore = usePowerStore();
const roleStore = useRoleStore();
// 是否展开全部
const isExpandAll = ref(false);
// 是否选择全部
const isSelectAll = ref(false);
const isLinkage = ref(true);
// 树形选择器高度计算
const treeHeight = ref();
// 搜索树形结构过滤内容
const treeSearchValue = ref();
// 选择的树形id列表
const treeIds = ref([]);
// 树形结构权限列表
const datalist = computed(() => handleTree(powerStore.allPowerList));

/** 获取所有权限 */
const getAllPowers = async () => {
	await powerStore.getAllPowers();
	treeIds.value = getKeyList(powerStore.allPowerList, 'id');
};

/** 保存 */
const onSave = async () => {
	// 构建保存参数
	const { id, description } = currentRow.value;
	const powerIds = powerTreeRef.value.getCheckedKeys();
	const data = { roleId: id, powerIds, description };

	// 保存分配的权限
	const result = await roleStore.assignPowersToRole(data);
	if (!result) return;
	currentRow.value = null;
	powerTreeIsShow.value = false;
};

/**
 * * 权限过滤
 * @param query
 * @param node
 */
const filterMethod = (query: string, node: any) => node.powerName!.includes(query);

/**
 * * 菜单搜索
 * @param query
 */
const onQueryChanged = (query: string) => powerTreeRef.value!.filter(query);

watch(isExpandAll, val => {
	val ? powerTreeRef.value.setExpandedKeys(treeIds.value) : powerTreeRef.value.setExpandedKeys([]);
});

watch(isSelectAll, val => {
	val ? powerTreeRef.value.setCheckedKeys(treeIds.value) : powerTreeRef.value.setCheckedKeys([]);
});

onMounted(() => {
	getAllPowers();

	useResizeObserver(contentRef, async () => {
		await nextTick();
		delay(60).then(() => {
			treeHeight.value = parseFloat(subBefore(tableRef.value.getTableDoms().tableWrapper.style.height, 'px'));
		});
	});
});
</script>

<template>
	<div v-if="powerTreeIsShow" class="!min-w-[calc(100vw-60vw-268px)] w-full mt-2 px-2 pb-2 bg-bg_color ml-2 overflow-auto">
		<div class="flex justify-between w-full px-3 pt-5 pb-4">
			<div class="flex">
				<span :class="iconClass">
					<IconifyIconOffline v-tippy="{ content: '关闭' }" :icon="Close" class="dark:text-white" height="18px" width="18px" @click="onMenuPowerClick" />
				</span>
				<span :class="[iconClass, 'ml-2']">
					<IconifyIconOffline v-tippy="{ content: '保存菜单权限' }" :icon="Check" class="dark:text-white" height="18px" width="18px" @click="onSave" />
				</span>
			</div>
			<p class="font-bold truncate">
				菜单权限
				{{ `${currentRow?.name ? `（${currentRow.name}）` : ''}` }}
			</p>
		</div>
		<el-input v-model="treeSearchValue" class="mb-1" clearable placeholder="请输入菜单进行搜索" @input="onQueryChanged" />
		<div class="flex flex-wrap">
			<el-checkbox v-model="isExpandAll" label="展开/折叠" />
			<el-checkbox v-model="isSelectAll" label="全选/全不选" />
			<el-checkbox v-model="isLinkage" label="父子联动" />
		</div>
		<el-tree-v2 ref="powerTreeRef" :check-strictly="!isLinkage" :data="datalist" :filter-method="filterMethod" :height="treeHeight" :props="powerCascadeProps" show-checkbox>
			<template #default="{ node }">
				<span>{{ node.label }}</span>
			</template>
		</el-tree-v2>
	</div>
</template>
