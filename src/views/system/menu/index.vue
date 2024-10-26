<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { $t } from '@/plugins/i18n';
import PureTableBar from '@/components/TableBar/src/bar';
import Delete from '@iconify-icons/ep/delete';
import EditPen from '@iconify-icons/ep/edit-pen';
import Refresh from '@iconify-icons/ep/refresh';
import AddFill from '@iconify-icons/ri/add-circle-line';
import {
	assignBatchRolesToRouter,
	assignRolesToRouter,
	clearAllRolesSelect,
	onAdd,
	onChangeMenuRank,
	onchangeVisible,
	onDelete,
	onSearch,
	onUpdate,
	selectIds,
	switchLoadMap,
	tableRef,
} from '@/views/system/menu/utils/hooks';
import PureTable from '@pureadmin/table';
import { columns } from '@/views/system/menu/utils/columns';
import { userMenuStore } from '@/store/system/menu';
import { useRenderIcon } from '@/components/CommonIcon/src/hooks';
import { selectUserinfo } from '@/components/Table/Userinfo/columns';
import More from '@iconify-icons/ep/more-filled';
import { tableSelectButtonClass } from '@/enums/baseConstant';
import Upload from '@iconify-icons/ri/upload-line';
import { FormInstance } from 'element-plus';
import { usePublicHooks } from '@/views/hooks';

const formRef = ref();
const routerStore = userMenuStore();
// 用户是否停用样式
const { switchStyle } = usePublicHooks();

/**
 * 表单重置
 * @param formEl
 */
const resetForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
	await onSearch();
};

/**
 * * 选择多行
 * @param rows
 */
const onSelectionChange = (rows: Array<any>) => {
	selectIds.value = rows.map((row: any) => row.id);
};

onMounted(() => {
	onSearch();
});
</script>

<template>
	<div class="main">
		<el-form ref="formRef" :inline="true" :model="routerStore.form" class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto">
			<el-form-item label="菜单名称" prop="title">
				<el-input v-model="routerStore.form.title" class="!w-[180px]" clearable placeholder="输入菜单名称" />
			</el-form-item>
			<el-form-item>
				<el-button :icon="useRenderIcon('ri:search-line')" :loading="routerStore.loading" type="primary" @click="onSearch"> {{ $t('search') }} </el-button>
				<el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)"> {{ $t('buttons.reset') }}</el-button>
			</el-form-item>
		</el-form>
		<PureTableBar :columns="columns" :isExpandAll="false" :tableRef="tableRef?.getTableRef()" title="菜单管理" @fullscreen="tableRef?.setAdaptive()" @refresh="onSearch">
			<template #buttons>
				<!-- 添加菜单 -->
				<el-button :icon="useRenderIcon(AddFill)" type="primary" @click="onAdd()"> {{ $t('addNew') }}</el-button>

				<!-- 批量分配角色 -->
				<el-button v-show="selectIds.length > 0" :icon="useRenderIcon('iwwa:assign')" type="warning" @click="assignBatchRolesToRouter()"> {{ $t('assignBatchRolesToRouter') }} </el-button>

				<!-- 清除选中所以角色 -->
				<el-button v-show="selectIds.length > 0" :icon="useRenderIcon('ic:baseline-clear')" type="danger" @click="clearAllRolesSelect()"> {{ $t('clearAllRolesSelect') }} </el-button>
			</template>

			<template v-slot="{ size, dynamicColumns }">
				<pure-table
					ref="tableRef"
					:adaptiveConfig="{ offsetBottom: 96 }"
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
					@selection-change="onSelectionChange"
				>
					<template #visible="{ row, index }">
						<el-switch
							v-model="row.visible"
							:active-text="$t('show')"
							:active-value="true"
							:inactive-text="$t('hidden')"
							:inactive-value="false"
							:loading="switchLoadMap[index]?.loading"
							:style="switchStyle"
							inline-prompt
							@click="onchangeVisible(row, index)"
						/>
					</template>

					<template #rank="{ row }">
						<el-input v-model="row.rank" :max="9999" :min="1" type="number" @change="onChangeMenuRank(row)" />
					</template>

					<template #createUser="{ row }">
						<el-button v-show="row.createUser" link type="primary" @click="selectUserinfo(row.createUser)">
							{{ $t('table.createUser') }}
						</el-button>
					</template>

					<template #updateUser="{ row }">
						<el-button v-show="row.updateUser" link type="primary" @click="selectUserinfo(row.updateUser)">
							{{ $t('table.updateUser') }}
						</el-button>
					</template>

					<template #operation="{ row }">
						<!-- 修改 -->
						<el-button :icon="useRenderIcon(EditPen)" :size="size" class="reset-margin" link type="primary" @click="onUpdate(row)"> {{ $t('modify') }} </el-button>

						<!-- 新增 -->
						<el-button v-show="row.menuType !== 3" :icon="useRenderIcon(AddFill)" :size="size" class="reset-margin" link type="primary" @click="onAdd(row.id)"> {{ $t('addNew') }} </el-button>

						<!-- 删除操作 -->
						<el-popconfirm :title="`${$t('delete')} ${$t(row.title)}?`" @confirm="onDelete(row)">
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
										<el-button :class="tableSelectButtonClass" :icon="useRenderIcon(Upload)" :size="size" link type="primary" @click="assignRolesToRouter(row)"> {{ $t('assign_roles') }} </el-button>
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
