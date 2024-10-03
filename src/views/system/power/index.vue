<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { columns } from '@/views/system/power/utils/columns';
import PureTableBar from '@/components/TableBar/src/bar';
import AddFill from '@iconify-icons/ri/add-circle-line';
import PureTable from '@pureadmin/table';
import { deleteIds, onAdd, onDelete, onDeleteBatch, onSearch, onUpdate } from '@/views/system/power/utils/hooks';
import Delete from '@iconify-icons/ep/delete';
import EditPen from '@iconify-icons/ep/edit-pen';
import Refresh from '@iconify-icons/ep/refresh';
import { selectUserinfo } from '@/components/Table/Userinfo/columns';
import { $t } from '@/plugins/i18n';
import { usePowerStore } from '@/store/system/power.ts';
import { useRenderIcon } from '@/components/CommonIcon/src/hooks';

const tableRef = ref();
const formRef = ref();
const powerStore = usePowerStore();

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

/**
 * * 按钮类
 */
const buttonClass = computed(() => ['!h-[20px]', 'reset-margin', '!text-gray-500', 'dark:!text-white', 'dark:hover:!text-primary']);

onMounted(() => {
	onSearch();
});
</script>

<template>
	<div class="main">
		<el-form ref="formRef" :inline="true" :model="powerStore.form" class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto">
			<el-form-item :label="$t('power_powerCode')" prop="powerCode">
				<el-input v-model="powerStore.form.powerCode" :placeholder="`${$t('input')}${$t('power_powerCode')}`" class="!w-[180px]" clearable />
			</el-form-item>
			<el-form-item :label="$t('power_powerName')" prop="powerName">
				<el-input v-model="powerStore.form.powerName" :placeholder="`${$t('input')}${$t('power_powerName')}`" class="!w-[180px]" clearable />
			</el-form-item>
			<el-form-item :label="$t('power_requestUrl')" prop="requestUrl">
				<el-input v-model="powerStore.form.requestUrl" :placeholder="`${$t('input')}${$t('power_requestUrl')}`" class="!w-[180px]" clearable />
			</el-form-item>
			<el-form-item>
				<el-button :icon="useRenderIcon('ri:search-line')" :loading="powerStore.loading" type="primary" @click="onSearch"> {{ $t('search') }} </el-button>
				<el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)"> {{ $t('buttons.reset') }}</el-button>
			</el-form-item>
		</el-form>

		<PureTableBar :columns="columns" :title="$t('power')" @fullscreen="tableRef.setAdaptive()" @refresh="onSearch">
			<template #buttons>
				<!-- 添加权限按钮 -->
				<el-button :icon="useRenderIcon(AddFill)" type="primary" @click="onAdd"> {{ $t('add_new') + $t('power') }} </el-button>

				<!-- 批量删除按钮 -->
				<el-button v-show="deleteIds.length > 0" :icon="useRenderIcon(Delete)" type="danger" @click="onDeleteBatch">
					{{ $t('delete_batches') }}
				</el-button>
			</template>

			<template v-slot="{ size, dynamicColumns }">
				<pure-table
					ref="tableRef"
					:adaptiveConfig="{ offsetBottom: 45 }"
					:columns="dynamicColumns"
					:data="powerStore.datalist"
					:header-cell-style="{ background: 'var(--el-fill-color-light)', color: 'var(--el-text-color-primary)' }"
					:loading="powerStore.loading"
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
					<template #createUser="{ row }">
						<el-button link type="primary" @click="selectUserinfo(row.createUser)">{{ $t('table.createUser') }} </el-button>
					</template>

					<template #updateUser="{ row }">
						<el-button link type="primary" @click="selectUserinfo(row.updateUser)">{{ $t('table.updateUser') }} </el-button>
					</template>

					<template #operation="{ row }">
						<!-- 修改 -->
						<el-button :icon="useRenderIcon(EditPen)" :size="size" class="reset-margin" link type="primary" @click="onUpdate(row)"> {{ $t('modify') }} </el-button>

						<!-- 删除 -->
						<el-popconfirm :title="`是否确认删除 ${row.powerName}数据`" @confirm="onDelete(row)">
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
