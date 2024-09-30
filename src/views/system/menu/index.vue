<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { $t } from '@/plugins/i18n';
import PureTableBar from '@/components/TableBar/src/bar';
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import Delete from '@iconify-icons/ep/delete';
import EditPen from '@iconify-icons/ep/edit-pen';
import Refresh from '@iconify-icons/ep/refresh';
import AddFill from '@iconify-icons/ri/add-circle-line';
import { dataList, handleDelete, loading, onSearch, openDialog, resetForm } from '@/views/system/menu/utils/hook';
import form from '@/views/role/form.vue';
import PureTable from '@pureadmin/table';
import { columns } from '@/views/system/menu/utils/rule';

defineOptions({
	name: 'SystemMenu',
});

const formRef = ref();
const tableRef = ref();

onMounted(() => {
	onSearch();
});
</script>

<template>
	<div class="main">
		<el-form ref="formRef" :inline="true" :model="form" class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto">
			<el-form-item label="菜单名称" prop="title">
				<el-input v-model="form.title" class="!w-[180px]" clearable placeholder="输入菜单名称" />
			</el-form-item>
			<el-form-item>
				<el-button :icon="useRenderIcon('ri:search-line')" :loading="loading" type="primary" @click="onSearch"> 搜索 </el-button>
				<el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)"> 重置</el-button>
			</el-form-item>
		</el-form>

		<PureTableBar :columns="columns" :isExpandAll="false" :tableRef="tableRef?.getTableRef()" title="菜单管理" @fullscreen="tableRef.setAdaptive()" @refresh="onSearch">
			<template #buttons>
				<el-button :icon="useRenderIcon(AddFill)" type="primary" @click="openDialog()"> 新增菜单</el-button>
			</template>
			<template v-slot="{ size, dynamicColumns }">
				<pure-table
					ref="tableRef"
					:adaptiveConfig="{ offsetBottom: 45 }"
					:columns="dynamicColumns"
					:data="dataList"
					:header-cell-style="{ background: 'var(--el-fill-color-light)', color: 'var(--el-text-color-primary)' }"
					:loading="loading"
					:size="size"
					adaptive
					align-whole="center"
					row-key="id"
					showOverflowTooltip
					table-layout="auto"
				>
					<template #operation="{ row }">
						<el-button :icon="useRenderIcon(EditPen)" :size="size" class="reset-margin" link type="primary" @click="openDialog('修改', row)"> 修改 </el-button>
						<el-button v-show="row.menuType !== 3" :icon="useRenderIcon(AddFill)" :size="size" class="reset-margin" link type="primary" @click="openDialog('新增', { parentId: row.id } as any)">
							新增
						</el-button>
						<el-popconfirm :title="`是否确认删除菜单名称为${$t(row.title)}的这条数据${row?.children?.length > 0 ? '注意下级菜单也会一并删除，请谨慎操作' : ''}`" @confirm="handleDelete(row)">
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
