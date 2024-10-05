<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { $t } from '@/plugins/i18n';
import PureTableBar from '@/components/TableBar/src/bar';
import Delete from '@iconify-icons/ep/delete';
import EditPen from '@iconify-icons/ep/edit-pen';
import Refresh from '@iconify-icons/ep/refresh';
import AddFill from '@iconify-icons/ri/add-circle-line';
import { assignRolesToRouter, handleDelete, onAdd, onSearch, onUpdate, resetForm } from '@/views/system/menu/utils/hooks';
import form from '@/views/system/menu/form.vue';
import PureTable from '@pureadmin/table';
import { columns } from '@/views/system/menu/utils/columns';
import { userMenuStore } from '@/store/system/menu';
import { useRenderIcon } from '@/components/CommonIcon/src/hooks';
import { selectUserinfo } from '@/components/Table/Userinfo/columns';
import More from '@iconify-icons/ep/more-filled';
import { tableSelectButtonClass } from '@/enums/baseConstant';
import Upload from '@iconify-icons/ri/upload-line';
import { messageBox } from '@/utils/message';

const formRef = ref();
const tableRef = ref();
const routerStore = userMenuStore();

/**
 * * 修改菜单是否显示
 * @param row
 */
const onchangeVisible = async (row: any) => {
	// 是否确认修改显示状态
	const confirm = await messageBox({
		title: $t('confirm_update_status'),
		showMessage: false,
		confirmMessage: undefined,
		cancelMessage: $t('cancel'),
	});
	if (!confirm) {
		row.visible = !row.visible;
		return;
	}

	const data = {
		id: row.id,
		visible: row.visible,
		menuType: row.menuType,
		title: row.title,
		name: row.name,
		path: row.path,
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

					<template #createUser="{ row }">
						<el-button link type="primary" @click="selectUserinfo(row.createUser)">{{ $t('table.createUser') }} </el-button>
					</template>

					<template #updateUser="{ row }">
						<el-button link type="primary" @click="selectUserinfo(row.updateUser)">{{ $t('table.updateUser') }} </el-button>
					</template>

					<template #operation="{ row }">
						<el-button :icon="useRenderIcon(EditPen)" :size="size" class="reset-margin" link type="primary" @click="onUpdate(row)"> {{ $t('modify') }} </el-button>
						<el-button v-show="row.menuType !== 3" :icon="useRenderIcon(AddFill)" :size="size" class="reset-margin" link type="primary" @click="onAdd(row.id)"> {{ $t('add_new') }} </el-button>
						<el-popconfirm :title="`是否确认删除菜单名称为${$t(row.title)}的这条数据${row?.children?.length > 0 ? '注意下级菜单也会一并删除，请谨慎操作' : ''}`" @confirm="handleDelete(row)">
							<template #reference>
								<el-button :icon="useRenderIcon(Delete)" :size="size" class="reset-margin" link type="primary">
									{{ $t('delete') }}
								</el-button>
							</template>
						</el-popconfirm>
						<!-- 更多操作 -->
						<el-dropdown>
							<el-button :icon="useRenderIcon(More)" :size="size" class="ml-3 mt-[2px]" link type="primary" />
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item>
										<el-button :class="tableSelectButtonClass" :icon="useRenderIcon(Upload)" :size="size" link type="primary" @click="assignRolesToRouter(row)"> 分配角色 </el-button>
									</el-dropdown-item>
								</el-dropdown-menu>
							</template>
						</el-dropdown>
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
