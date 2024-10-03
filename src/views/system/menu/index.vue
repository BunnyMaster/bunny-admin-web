<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { $t } from '@/plugins/i18n';
import PureTableBar from '@/components/TableBar/src/bar';
import Delete from '@iconify-icons/ep/delete';
import EditPen from '@iconify-icons/ep/edit-pen';
import Refresh from '@iconify-icons/ep/refresh';
import AddFill from '@iconify-icons/ri/add-circle-line';
import { handleDelete, onAdd, onSearch, onUpdate, resetForm } from '@/views/system/menu/utils/hooks';
import form from '@/views/system/menu/form.vue';
import PureTable from '@pureadmin/table';
import { columns } from '@/views/system/menu/utils/columns';
import { userRouterStore } from '@/store/system/router';
import { useRenderIcon } from '@/components/CommonIcon/src/hooks';

const formRef = ref();
const tableRef = ref();
const routerStore = userRouterStore();

/**
 * * 修改菜单是否显示
 * @param val
 */
const onchangeVisible = async (val: boolean) => {
	const data = {
		id: val.id,
		visible: val.visible,
		menuType: val.menuType,
		title: val.title,
		name: val.name,
		path: val.path,
	};
	await routerStore.updateMenu(data);
	await onSearch();
};

/**
 * 表单重置
 * @param formEl
 */
const resetForm = async (formEl: any) => {
	if (!formEl) return;
	formEl.resetFields();
	await onSearch();
};

onMounted(() => {
	onSearch();
});
</script>

<template>
	<div class="main">
		<el-form ref="formRef" :inline="true" :model="form" class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto">
			<el-form-item label="菜单名称" prop="title">
				<el-input v-model="routerStore.form.title" class="!w-[180px]" clearable placeholder="输入菜单名称" />
			</el-form-item>
			<el-form-item>
				<el-button :icon="useRenderIcon('ri:search-line')" :loading="routerStore.loading" type="primary" @click="onSearch"> 搜索 </el-button>
				<el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)"> 重置</el-button>
			</el-form-item>
		</el-form>

		<PureTableBar :columns="columns" :isExpandAll="false" :tableRef="tableRef?.getTableRef()" title="菜单管理" @fullscreen="tableRef.setAdaptive()" @refresh="onSearch">
			<template #buttons>
				<el-button :icon="useRenderIcon(AddFill)" type="primary" @click="onAdd()"> 新增菜单</el-button>
			</template>
			<template v-slot="{ size, dynamicColumns }">
				<pure-table
					ref="tableRef"
					:adaptiveConfig="{ offsetBottom: 45 }"
					:columns="dynamicColumns"
					:data="routerStore.datalist"
					:header-cell-style="{ background: 'var(--el-fill-color-light)', color: 'var(--el-text-color-primary)' }"
					:loading="routerStore.loading"
					:size="size"
					adaptive
					align-whole="center"
					border
					highlight-current-row
					row-key="id"
					showOverflowTooltip
					table-layout="auto"
				>
					<template #visible="{ row }">
						<el-switch
							v-model="row.visible"
							active-text="显示"
							class="ml-2"
							inactive-text="隐藏"
							inline-prompt
							style="

--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
							width="60"
							@update:modelValue="onchangeVisible(row)"
						/>
					</template>

					<template #operation="{ row }">
						<el-button :icon="useRenderIcon(EditPen)" :size="size" class="reset-margin" link type="primary" @click="onUpdate(row)"> 修改 </el-button>
						<el-button v-show="row.menuType !== 3" :icon="useRenderIcon(AddFill)" :size="size" class="reset-margin" link type="primary" @click="onAdd(row.id)"> 新增 </el-button>
						<el-popconfirm :title="`是否确认删除菜单名称为${$t(row.title)}的这条数据${row?.children?.length > 0 ? '注意下级菜单也会一并删除，请谨慎操作' : ''}`" @confirm="handleDelete(row)">
							<template #reference>
								<el-button :icon="useRenderIcon(Delete)" :size="size" class="reset-margin" link type="primary"> 删除 </el-button>
							</template>
						</el-popconfirm>
					</template>
				</pure-table>
			</template>
		</PureTableBar>
	</div>
</template>

<style lang="scss" scoped>
:deep(.el-table__inner-wrapper::before) {
	height: 0;
}

.main-content {
	margin: 24px 24px 0 !important;
}

.search-form {
	:deep(.el-form-item) {
		margin-bottom: 12px;
	}
}
</style>
