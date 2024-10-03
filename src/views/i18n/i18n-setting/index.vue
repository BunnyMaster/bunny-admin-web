<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { userI18nStore } from '@/store/i18n/i18n';
import { deleteIds, onAdd, onDelete, onDeleteBatch, onSearch, onUpdate } from '@/views/i18n/i18n-setting/utils/hooks';
import { useRenderIcon } from '@/components/CommonIcon/src/hooks';
import AddFill from '@iconify-icons/ri/add-circle-line';
import EditPen from '@iconify-icons/ep/edit-pen';
import Delete from '@iconify-icons/ep/delete';
import PureTableBar from '@/components/TableBar/src/bar';
import PureTable from '@pureadmin/table';
import { columns } from '@/views/i18n/i18n-setting/utils/columns';
import Refresh from '@iconify-icons/ep/refresh';
import { $t } from '@/plugins/i18n';
import { selectUserinfo } from '@/components/Table/Userinfo/columns';

const tableRef = ref();
const pageFormRef = ref();
const i18nStore = userI18nStore();

/**
 * 重置表单
 * @param formEl
 */
const resetForm = async (formEl: any) => {
	if (!formEl) return;
	formEl.resetFields();
	await onSearch();
};

/**
 * * 当前页改变时
 */
const onCurrentPageChange = async (value: number) => {
	i18nStore.pagination.currentPage = value;
	await onSearch();
};

/**
 * * 当分页发生变化
 * @param value
 */
const onPageSizeChange = async (value: number) => {
	i18nStore.pagination.pageSize = value;
	await onSearch();
};

/**
 * * 选择多行
 * @param rows
 */
const onSelectionChange = (rows: Array<any>) => {
	deleteIds.value = rows.map((row: any) => row.id);
};

onMounted(() => {
	onSearch();
});
</script>

<template>
	<div class="main">
		<el-form ref="pageFormRef" :inline="true" :model="i18nStore.form" class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto">
			<el-form-item :label="$t('i18n.keyName')" prop="keyName">
				<el-input v-model="i18nStore.form.keyName" :placeholder="`${$t('input')}${$t('i18n.keyName')}`" class="!w-[180px]" clearable />
			</el-form-item>
			<el-form-item :label="$t('i18n.translation')" prop="translation">
				<el-input v-model="i18nStore.form.translation" :placeholder="`${$t('input')}${$t('i18n.translation')}`" class="!w-[180px]" clearable />
			</el-form-item>
			<el-form-item :label="$t('i18n.typeName')" prop="typeName">
				<el-input v-model="i18nStore.form.typeName" :placeholder="`${$t('input')}${$t('i18n.typeName')}`" class="!w-[180px]" clearable />
			</el-form-item>
			<el-form-item>
				<el-button :icon="useRenderIcon('ri:search-line')" :loading="i18nStore.loading" type="primary" @click="onSearch"> {{ $t('search') }} </el-button>
				<el-button :icon="useRenderIcon(Refresh)" @click="resetForm(pageFormRef)"> {{ $t('buttons.reset') }}</el-button>
			</el-form-item>
		</el-form>

		<PureTableBar :columns="columns" :title="$t('multilingual_management')" @fullscreen="tableRef.setAdaptive()" @refresh="onSearch">
			<template #buttons>
				<!-- 添加多语言 -->
				<el-button :icon="useRenderIcon(AddFill)" type="primary" @click="onAdd"> {{ $t('add_multilingual') }} </el-button>
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
					:data="i18nStore.datalist"
					:header-cell-style="{ background: 'var(--el-fill-color-light)', color: 'var(--el-text-color-primary)' }"
					:loading="i18nStore.loading"
					:pagination="i18nStore.pagination"
					:size="size"
					adaptive
					align-whole="center"
					border
					highlight-current-row
					row-key="id"
					showOverflowTooltip
					stripe
					table-layout="auto"
					@selection-change="onSelectionChange"
					@page-size-change="onPageSizeChange"
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
						<el-button v-show="row.menuType !== 3" :icon="useRenderIcon(AddFill)" :size="size" class="reset-margin" link type="primary"> {{ $t('add_new') }} </el-button>
						<el-popconfirm :title="`${$t('confirm_delete')} ${row.translation}`" @confirm="onDelete(row)">
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
