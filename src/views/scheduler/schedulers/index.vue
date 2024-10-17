<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { columns } from '@/views/scheduler/schedulers/utils/columns';
import PureTableBar from '@/components/TableBar/src/bar';
import AddFill from '@iconify-icons/ri/add-circle-line';
import PureTable from '@pureadmin/table';
import { deleteIds, onAdd, onDelete, onDeleteBatch, onSearch, onUpdate } from '@/views/scheduler/schedulers/utils/hooks';
import Delete from '@iconify-icons/ep/delete';
import EditPen from '@iconify-icons/ep/edit-pen';
import Refresh from '@iconify-icons/ep/refresh';
import { selectUserinfo } from '@/components/Table/Userinfo/columns';
import { $t } from '@/plugins/i18n';
import { useSchedulersStore } from '@/store/monitor/schedulers.ts';
import { useRenderIcon } from '@/components/CommonIcon/src/hooks';
import { FormInstance } from 'element-plus';

const tableRef = ref();
const formRef = ref();
const schedulersStore = useSchedulersStore();

/**
 * * 当前页改变时
 */
const onCurrentPageChange = async (value: number) => {
	schedulersStore.pagination.currentPage = value;
	await onSearch();
};

/**
 * * 当分页发生变化
 * @param value
 */
const onPageSizeChange = async (value: number) => {
	schedulersStore.pagination.pageSize = value;
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
		<el-form ref="formRef" :inline="true" :model="schedulersStore.form" class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto">
			<el-form-item :label="$t('schedulers_jobName')" prop="jobName">
				<el-input v-model="schedulersStore.form.jobName" :placeholder="`${$t('input')}${$t('schedulers_jobName')}`" class="!w-[180px]" clearable />
			</el-form-item>
			<el-form-item :label="$t('schedulers_jobGroup')" prop="jobGroup">
				<el-input v-model="schedulersStore.form.jobGroup" :placeholder="`${$t('input')}${$t('schedulers_jobGroup')}`" class="!w-[180px]" clearable />
			</el-form-item>
			<el-form-item :label="$t('schedulers_description')" prop="description">
				<el-input v-model="schedulersStore.form.description" :placeholder="`${$t('input')}${$t('schedulers_description')}`" class="!w-[180px]" clearable />
			</el-form-item>
			<el-form-item :label="$t('schedulers_jobClassName')" prop="jobClassName">
				<el-input v-model="schedulersStore.form.jobClassName" :placeholder="`${$t('input')}${$t('schedulers_jobClassName')}`" class="!w-[180px]" clearable />
			</el-form-item>
			<el-form-item :label="$t('schedulers_triggerName')" prop="triggerName">
				<el-input v-model="schedulersStore.form.triggerName" :placeholder="`${$t('input')}${$t('schedulers_triggerName')}`" class="!w-[180px]" clearable />
			</el-form-item>
			<el-form-item :label="$t('schedulers_triggerState')" prop="triggerState">
				<el-input v-model="schedulersStore.form.triggerState" :placeholder="`${$t('input')}${$t('schedulers_triggerState')}`" class="!w-[180px]" clearable />
			</el-form-item>
			<el-form-item>
				<el-button :icon="useRenderIcon('ri:search-line')" :loading="schedulersStore.loading" type="primary" @click="onSearch"> {{ $t('search') }} </el-button>
				<el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)"> {{ $t('buttons.reset') }}</el-button>
			</el-form-item>
		</el-form>

		<PureTableBar :columns="columns" :title="$t('schedulers')" @fullscreen="tableRef.setAdaptive()" @refresh="onSearch">
			<template #buttons>
				<el-button :icon="useRenderIcon(AddFill)" type="primary" @click="onAdd"> {{ $t('add_new') }}</el-button>

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
					:data="schedulersStore.datalist"
					:header-cell-style="{ background: 'var(--el-fill-color-light)', color: 'var(--el-text-color-primary)' }"
					:loading="schedulersStore.loading"
					:pagination="schedulersStore.pagination"
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
						<el-button link type="primary" @click="selectUserinfo(row.createUser)">{{ $t('table.createUser') }} </el-button>
					</template>

					<template #updateUser="{ row }">
						<el-button link type="primary" @click="selectUserinfo(row.updateUser)">{{ $t('table.updateUser') }} </el-button>
					</template>

					<template #operation="{ row }">
						<el-button :icon="useRenderIcon(EditPen)" :size="size" class="reset-margin" link type="primary" @click="onUpdate(row)"> {{ $t('modify') }} </el-button>
						<el-popconfirm :title="`${$t('delete')}${row.jobName}?`" @confirm="onDelete(row)">
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
