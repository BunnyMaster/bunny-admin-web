<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { columns } from '@/views/i18n/i18n-type-setting/utils/columns';
import PureTableBar from '@/components/TableBar/src/bar';
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import AddFill from '@iconify-icons/ri/add-circle-line';
import PureTable from '@pureadmin/table';
import { userI18nTypeStore } from '@/store/i18n/i18nType';
import { onAdd, onDelete, onSearch, onUpdate } from '@/views/i18n/i18n-type-setting/utils/hook';
import Delete from '@iconify-icons/ep/delete';
import EditPen from '@iconify-icons/ep/edit-pen';
import TableIsDefaultTag from '@/components/TableBar/src/TableIsDefaultTag.vue';
import { resetForm } from '@/views/system/menu/utils/hook';
import Refresh from '@iconify-icons/ep/refresh';

const tableRef = ref();
const formRef = ref();
const i18nTypeStore = userI18nTypeStore();

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
		<el-form ref="formRef" :inline="true" :model="i18nTypeStore.form" class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto">
			<el-form-item label="类型名称" prop="title">
				<el-input v-model="i18nTypeStore.form.typeName" class="!w-[180px]" clearable placeholder="输入类型名称" />
			</el-form-item>
			<el-form-item label="类型解释" prop="title">
				<el-input v-model="i18nTypeStore.form.summary" class="!w-[180px]" clearable placeholder="输入类型解释" />
			</el-form-item>
			<el-form-item>
				<el-button :icon="useRenderIcon('ri:search-line')" :loading="i18nTypeStore.loading" type="primary" @click="onSearch"> 搜索 </el-button>
				<el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)"> 重置</el-button>
			</el-form-item>
		</el-form>

		<PureTableBar :columns="columns" :tableRef="tableRef?.getTableRef()" title="多语言类型管理" @fullscreen="tableRef.setAdaptive()" @refresh="onSearch">
			<template #buttons>
				<el-button :icon="useRenderIcon(AddFill)" type="primary" @click="onAdd"> 添加多语言类型</el-button>
			</template>

			<template v-slot="{ size, dynamicColumns }">
				<pure-table
					ref="tableRef"
					:adaptiveConfig="{ offsetBottom: 45 }"
					:columns="dynamicColumns"
					:data="i18nTypeStore.datalist"
					:header-cell-style="{ background: 'var(--el-fill-color-light)', color: 'var(--el-text-color-primary)' }"
					:loading="i18nTypeStore.loading"
					:size="size"
					adaptive
					align-whole="center"
					row-key="id"
					showOverflowTooltip
					table-layout="auto"
				>
					<template #isDefault="{ row }">
						<TableIsDefaultTag :status="row.isDefault" />
					</template>

					<template #operation="{ row }">
						<el-button :icon="useRenderIcon(EditPen)" :size="size" class="reset-margin" link type="primary" @click="onUpdate(row)"> 修改 </el-button>
						<el-button :icon="useRenderIcon(AddFill)" :size="size" class="reset-margin" link type="primary" @click="onAdd"> 新增 </el-button>
						<el-popconfirm :title="`是否确认删除 ${row.typeName}数据`" @confirm="onDelete(row)">
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
