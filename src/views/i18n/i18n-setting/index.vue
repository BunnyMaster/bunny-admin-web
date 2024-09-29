<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { userI18nStore } from '@/store/i18n/i18n';
import { onAdd, onDelete, onSearch, onUpdate } from '@/views/i18n/i18n-setting/utils/hook';
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import AddFill from '@iconify-icons/ri/add-circle-line';
import EditPen from '@iconify-icons/ep/edit-pen';
import Delete from '@iconify-icons/ep/delete';
import PureTableBar from '@/components/TableBar/src/bar';
import PureTable from '@pureadmin/table';
import { columns } from '@/views/i18n/i18n-setting/utils/columns';
import Refresh from '@iconify-icons/ep/refresh';
import { resetForm } from '@/views/menu/utils/hook';

const tableRef = ref();
const formRef = ref();
const i18nStore = userI18nStore();

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
 * * 选择框点击的行
 * @param row
 */
const onSelectionChange = (row: any) => {
	ids.value = row.map((item: any) => item.id);
};

onMounted(() => {
	onSearch();
});
</script>

<template>
	<div class="main">
		<el-form ref="formRef" :inline="true" :model="i18nStore.form" class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto">
			<el-form-item label="多语言key" prop="keyName">
				<el-input v-model="i18nStore.form.keyName" class="!w-[180px]" clearable placeholder="输入多语言key" />
			</el-form-item>
			<el-form-item label="多语言翻译" prop="translation">
				<el-input v-model="i18nStore.form.translation" class="!w-[180px]" clearable placeholder="输入多语言翻译" />
			</el-form-item>
			<el-form-item>
				<el-button :icon="useRenderIcon('ri:search-line')" :loading="i18nStore.loading" type="primary" @click="onSearch"> 搜索 </el-button>
				<el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)"> 重置</el-button>
			</el-form-item>
		</el-form>

		<PureTableBar :columns="columns" :tableRef="tableRef?.getTableRef()" title="多语言管理" @fullscreen="tableRef.setAdaptive()" @refresh="onSearch">
			<template #buttons>
				<el-button :icon="useRenderIcon(AddFill)" type="primary" @click="onAdd"> 添加多语言</el-button>
			</template>
			<template v-slot="{ size, dynamicColumns }">
				<pure-table
					ref="tableRef"
					:adaptiveConfig="{ offsetBottom: 45 }"
					:columns="dynamicColumns"
					:data="i18nStore.datalist"
					:header-cell-style="{ background: 'var(--el-fill-color-light)', color: 'var(--el-text-color-primary)' }"
					:loading="i18nStore.loading"
					:pagination="i18nStore.pagination"
					:size="size"
					adaptive
					align-whole="center"
					row-key="id"
					showOverflowTooltip
					table-layout="auto"
					@selection-change="onSelectionChange"
					@page-size-change="onPageSizeChange"
					@page-current-change="onCurrentPageChange"
				>
					<template #operation="{ row }">
						<el-button :icon="useRenderIcon(EditPen)" :size="size" class="reset-margin" link type="primary" @click="onUpdate(row)"> 修改 </el-button>
						<el-button v-show="row.menuType !== 3" :icon="useRenderIcon(AddFill)" :size="size" class="reset-margin" link type="primary"> 新增 </el-button>
						<el-popconfirm :title="`是否确认删除 ${row.translation}数据`" @confirm="onDelete(row)">
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
