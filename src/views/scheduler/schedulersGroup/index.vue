<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { auth, columns, deleteIds, onAdd, onDelete, onDeleteBatch, onSearch, onUpdate } from '@/views/scheduler/schedulersGroup/utils';
import PureTableBar from '@/components/TableBar/src/bar';
import AddFill from '@iconify-icons/ri/add-circle-line';
import PureTable from '@pureadmin/table';
import Delete from '@iconify-icons/ep/delete';
import EditPen from '@iconify-icons/ep/edit-pen';
import Refresh from '@iconify-icons/ep/refresh';
import { selectUserinfo } from '@/components/Table/Userinfo/columns';
import { $t } from '@/plugins/i18n';
import { useSchedulersGroupStore } from '@/store/scheduler/schedulersGroup';
import { useRenderIcon } from '@/components/CommonIcon/src/hooks';
import { FormInstance } from 'element-plus';
import { hasAuth } from '@/router/utils';

const tableRef = ref();
const formRef = ref();
const schedulersGroupStore = useSchedulersGroupStore();

/** 当前页改变时 */
const onCurrentPageChange = async (value: number) => {
	schedulersGroupStore.pagination.currentPage = value;
	await onSearch();
};

/** 当分页发生变化 */
const onPageSizeChange = async (value: number) => {
	schedulersGroupStore.pagination.pageSize = value;
	await onSearch();
};

/** 选择多行 */
const onSelectionChange = (rows: Array<any>) => {
	deleteIds.value = rows.map((row: any) => row.id);
};

/** 重置表单 */
const resetForm = async (formEl: FormInstance | undefined) => {
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
		<Auth :value="auth.search">
			<el-form ref="formRef" :inline="true" :model="schedulersGroupStore.form" class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto">
				<el-form-item :label="$t('schedulersGroup_groupName')" prop="groupName">
					<el-input v-model="schedulersGroupStore.form.groupName" :placeholder="`${$t('input')}${$t('schedulersGroup_groupName')}`" class="!w-[180px]" clearable />
				</el-form-item>
				<el-form-item :label="$t('schedulersGroup_description')" prop="description">
					<el-input v-model="schedulersGroupStore.form.description" :placeholder="`${$t('input')}${$t('schedulersGroup_description')}`" class="!w-[180px]" clearable />
				</el-form-item>
				<el-form-item>
					<el-button :icon="useRenderIcon('ri:search-line')" :loading="schedulersGroupStore.loading" type="primary" @click="onSearch"> {{ $t('search') }} </el-button>
					<el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)"> {{ $t('buttons.reset') }}</el-button>
				</el-form-item>
			</el-form>
		</Auth>

		<PureTableBar :columns="columns" :title="$t('schedulersGroup')" @fullscreen="tableRef.setAdaptive()" @refresh="onSearch">
			<template #buttons>
				<el-button v-if="hasAuth(auth.add)" bg text :icon="useRenderIcon(AddFill)" type="primary" @click="onAdd">
					{{ $t('addNew') }}
				</el-button>

				<!-- 批量删除按钮 -->
				<el-button v-if="hasAuth(auth.deleted)" bg text :disabled="!(deleteIds.length > 0)" :icon="useRenderIcon(Delete)" type="danger" @click="onDeleteBatch">
					{{ $t('deleteBatches') }}
				</el-button>
			</template>

			<template v-slot="{ size, dynamicColumns }">
				<pure-table
					ref="tableRef"
					:adaptiveConfig="{ offsetBottom: 96 }"
					:columns="dynamicColumns"
					:data="schedulersGroupStore.datalist"
					:header-cell-style="{ background: 'var(--el-fill-color-light)', color: 'var(--el-text-color-primary)' }"
					:loading="schedulersGroupStore.loading"
					:pagination="schedulersGroupStore.pagination"
					:size="size"
					adaptive
					align-whole="center"
					border
					highlight-current-row
					row-key="id"
					showOverflowTooltip
					table-layout="auto"
					@page-size-change="onPageSizeChange"
					@selection-change="onSelectionChange"
					@page-current-change="onCurrentPageChange"
				>
					<template #createUser="{ row }">
						<el-button v-show="row.createUser" link type="primary" @click="selectUserinfo(row.createUser)">
							{{ row.createUsername }}
						</el-button>
					</template>

					<template #updateUser="{ row }">
						<el-button v-show="row.updateUser" link type="primary" @click="selectUserinfo(row.updateUser)">
							{{ row.updateUsername }}
						</el-button>
					</template>

					<template #operation="{ row }">
						<el-button v-if="hasAuth(auth.update)" :icon="useRenderIcon(EditPen)" :size="size" class="reset-margin" link type="primary" @click="onUpdate(row)"> {{ $t('modify') }} </el-button>
						<el-popconfirm v-if="hasAuth(auth.deleted)" :title="`${$t('delete')}${row.groupName}?`" @confirm="onDelete(row)">
							<template #reference>
								<el-button :icon="useRenderIcon(Delete)" :size="size" class="reset-margin" link type="primary">
									{{ $t('delete') }}
								</el-button>
							</template>
						</el-popconfirm>
					</template>
				</pure-table>
			</template>
		</PureTableBar>
	</div>
</template>
