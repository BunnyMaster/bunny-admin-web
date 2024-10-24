<script lang="ts" setup>
import { onMounted } from 'vue';
import { columns } from '@/views/system/role/utils/columns';
import PureTableBar from '@/components/TableBar/src/bar';
import AddFill from '@iconify-icons/ri/add-circle-line';
import PureTable from '@pureadmin/table';
import { contentRef, deleteIds, formRef, onAdd, onDelete, onDeleteBatch, onMenuPowerClick, onSearch, onUpdate, powerTreeIsShow, tableRef } from '@/views/system/role/utils/hooks';
import Delete from '@iconify-icons/ep/delete';
import EditPen from '@iconify-icons/ep/edit-pen';
import Refresh from '@iconify-icons/ep/refresh';
import { selectUserinfo } from '@/components/Table/Userinfo/columns';
import { $t } from '@/plugins/i18n';
import { useRoleStore } from '@/store/system/role.ts';
import { useRenderIcon } from '@/components/CommonIcon/src/hooks';
import { deviceDetection } from '@pureadmin/utils';
import Menu from '@iconify-icons/ep/menu';
import AssignPowersToRole from '@/views/system/role/assign-powers-to-role.vue';

const roleStore = useRoleStore();

/**
 * * 当前页改变时
 */
const onCurrentPageChange = async (value: number) => {
	roleStore.pagination.currentPage = value;
	await onSearch();
};

/**
 * * 当分页发生变化
 * @param value
 */
const onPageSizeChange = async (value: number) => {
	roleStore.pagination.pageSize = value;
	await onSearch();
};

/**
 * * 选择多行
 * @param rows
 */
const onSelectionChange = (rows: Array<any>) => {
	deleteIds.value = rows.map((row: any) => row.id);
};

/**
 * 重置表单
 * @param formEl
 */
const resetForm = async formEl => {
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
		<el-form ref="formRef" :inline="true" :model="roleStore.form" class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto">
			<el-form-item :label="$t('role_roleCode')" prop="roleCode">
				<el-input v-model="roleStore.form.roleCode" :placeholder="`${$t('input')}${$t('role_roleCode')}`" class="!w-[180px]" clearable />
			</el-form-item>
			<el-form-item :label="$t('role_description')" prop="description">
				<el-input v-model="roleStore.form.description" :placeholder="`${$t('input')}${$t('role_description')}`" class="!w-[180px]" clearable />
			</el-form-item>
			<el-form-item>
				<el-button :icon="useRenderIcon('ri:search-line')" :loading="roleStore.loading" type="primary" @click="onSearch"> {{ $t('search') }} </el-button>
				<el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)"> {{ $t('buttons.reset') }}</el-button>
			</el-form-item>
		</el-form>

		<div ref="contentRef" :class="['flex', deviceDetection() ? 'flex-wrap' : '']">
			<PureTableBar
				:class="[powerTreeIsShow && !deviceDetection() ? '!w-[60vw]' : 'w-full']"
				:columns="columns"
				:title="$t('role')"
				style="transition: width 220ms cubic-bezier(0.4, 0, 0.2, 1)"
				@fullscreen="tableRef.setAdaptive()"
				@refresh="onSearch"
			>
				<template #buttons>
					<el-button :icon="useRenderIcon(AddFill)" type="primary" @click="onAdd"> {{ $t('addNew') }}</el-button>

					<!-- 批量删除按钮 -->
					<el-button v-show="deleteIds.length > 0" :icon="useRenderIcon(Delete)" type="danger" @click="onDeleteBatch">
						{{ $t('delete_batches') }}
					</el-button>
				</template>

				<template v-slot="{ size, dynamicColumns }">
					<pure-table
						ref="tableRef"
						:adaptiveConfig="{ offsetBottom: 96 }"
						:columns="dynamicColumns"
						:data="roleStore.datalist"
						:header-cell-style="{ background: 'var(--el-fill-color-light)', color: 'var(--el-text-color-primary)' }"
						:loading="roleStore.loading"
						:pagination="roleStore.pagination"
						:size="size"
						adaptive
						align-whole="center"
						border
						highlight-current-row
						row-key="id"
						showOverflowTooltip
						table-layout="auto"
						@page-size-change="onPageSizeChange"
						@page-current-change="onCurrentPageChange"
						@selection-change="onSelectionChange"
					>
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

							<!-- 删除 -->
							<el-popconfirm :title="`${$t('delete')}${row.roleCode}?`" @confirm="onDelete(row)">
								<template #reference>
									<el-button :icon="useRenderIcon(Delete)" :size="size" class="reset-margin" link type="primary">
										{{ $t('delete') }}
									</el-button>
								</template>
							</el-popconfirm>

							<el-button :icon="useRenderIcon(Menu)" :size="size" class="reset-margin" link type="primary" @click="onMenuPowerClick(row)"> {{ $t('power_setting') }}} </el-button>
						</template>
					</pure-table>
				</template>
			</PureTableBar>

			<!-- 为角色分配角色 -->
			<assign-powers-to-role />
		</div>
	</div>
</template>
