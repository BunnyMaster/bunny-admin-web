<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { columns } from '@/views/system/dept/utils/columns';
import PureTableBar from '@/components/TableBar/src/bar';
import AddFill from '@iconify-icons/ri/add-circle-line';
import PureTable from '@pureadmin/table';
import { onAdd, onDelete, onSearch, onUpdate } from '@/views/system/dept/utils/hooks';
import Delete from '@iconify-icons/ep/delete';
import EditPen from '@iconify-icons/ep/edit-pen';
import Refresh from '@iconify-icons/ep/refresh';
import { selectUserinfo } from '@/components/Table/Userinfo/columns';
import { $t } from '@/plugins/i18n';
import { useDeptStore } from '@/store/system/dept.ts';
import { useRenderIcon } from '@/components/CommonIcon/src/hooks';

const tableRef = ref();
const formRef = ref();
const deptStore = useDeptStore();

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
		<el-form ref="formRef" :inline="true" :model="deptStore.form" class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto">
			<el-form-item :label="$t('dept_managerId')" prop="managerId">
				<el-input v-model="deptStore.form.managerId" :placeholder="`${$t('input')}${$t('dept_managerId')}`" class="!w-[180px]" clearable />
			</el-form-item>
			<el-form-item :label="$t('dept_deptName')" prop="deptName">
				<el-input v-model="deptStore.form.deptName" :placeholder="`${$t('input')}${$t('dept_deptName')}`" class="!w-[180px]" clearable />
			</el-form-item>
			<el-form-item :label="$t('dept_summary')" prop="summary">
				<el-input v-model="deptStore.form.summary" :placeholder="`${$t('input')}${$t('dept_summary')}`" class="!w-[180px]" clearable />
			</el-form-item>
			<el-form-item :label="$t('dept_remarks')" prop="remarks">
				<el-input v-model="deptStore.form.remarks" :placeholder="`${$t('input')}${$t('dept_remarks')}`" class="!w-[180px]" clearable />
			</el-form-item>
			<el-form-item>
				<el-button :icon="useRenderIcon('ri:search-line')" :loading="deptStore.loading" type="primary" @click="onSearch"> {{ $t('search') }} </el-button>
				<el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)"> {{ $t('buttons.reset') }}</el-button>
			</el-form-item>
		</el-form>

		<PureTableBar :columns="columns" title="部门管理" @fullscreen="tableRef.setAdaptive()" @refresh="onSearch">
			<template #buttons>
				<el-button :icon="useRenderIcon(AddFill)" type="primary" @click="onAdd"> 添加部门</el-button>
			</template>

			<template v-slot="{ size, dynamicColumns }">
				<pure-table
					ref="tableRef"
					:adaptiveConfig="{ offsetBottom: 45 }"
					:columns="dynamicColumns"
					:data="deptStore.datalist"
					:header-cell-style="{ background: 'var(--el-fill-color-light)', color: 'var(--el-text-color-primary)' }"
					:loading="deptStore.loading"
					:size="size"
					adaptive
					align-whole="center"
					border
					highlight-current-row
					row-key="id"
					showOverflowTooltip
					table-layout="auto"
				>
					<template #createUser="{ row }">
						<el-button link type="primary" @click="selectUserinfo(row.createUser)">{{ $t('table.createUser') }} </el-button>
					</template>

					<template #updateUser="{ row }">
						<el-button link type="primary" @click="selectUserinfo(row.updateUser)">{{ $t('table.updateUser') }} </el-button>
					</template>

					<template #operation="{ row }">
						<el-button :icon="useRenderIcon(EditPen)" :size="size" class="reset-margin" link type="primary" @click="onUpdate(row)"> {{ $t('modify') }} </el-button>
						<el-button :icon="useRenderIcon(AddFill)" :size="size" class="reset-margin" link type="primary" @click="onAdd"> {{ $t('add_new') }} </el-button>
						<el-popconfirm :title="`是否确认删除 ${row.deptName}数据`" @confirm="onDelete(row)">
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
