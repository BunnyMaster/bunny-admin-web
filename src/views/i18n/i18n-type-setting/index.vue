<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { columns } from '@/views/i18n/i18n-type-setting/utils/columns';
import { userI18nStore } from '@/store/i18n/i18n';
import { messageBox } from '@/utils/message';
import { addDialogVisible, getI18nDataList, onDelete } from '@/views/i18n/i18n-setting/utils/hook';
import PureTableBar from '@/components/TableBar/src/bar';
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import AddFill from '@iconify-icons/ri/add-circle-line';
import EditPen from '@iconify-icons/ep/edit-pen';
import { $t } from '@/plugins/i18n';
import Delete from '@iconify-icons/ep/delete';
import PureTable from '@pureadmin/table';
import AddI18nType from '@/views/i18n/i18n-type-setting/add-i18n-type.vue';

const i18nStore = userI18nStore();
const tableRef = ref();

/**
 * * 获取多语言类型
 */
const getI18nType = () => {
	i18nStore.getI18nTypeList();
};

/**
 * * 表格的列添加语言类型
 */
const onColumnAdd = () => {
	i18nStore.isAddShown = true;
};

/**
 * * 删除多语言类容
 */
const onColumnDelete = async (row: any, isPhysicalDelete: boolean) => {
	const id = row.id;
	const title = isPhysicalDelete ? '删除不可逆！' : '确认删除吗？';

	messageBox({
		message: `删除这条 【${row.summary}】 `,
		title,
		showMessage: false,
		confirmMessage: undefined,
		cancelMessage: '取消删除',
	})
		.then(result => {
			if (result) {
				i18nStore.deleteI18nType(id);
			}
			return result;
		})
		.then(result => result && getI18nType());
};

onMounted(() => {
	getI18nType();
});
</script>

<template>
	<div class="main">
		<!-- 添加多语言种类 -->
		<add-I18n-type />
		<PureTableBar :columns="columns" :tableRef="tableRef?.getTableRef()" title="多语言类型管理" @fullscreen="tableRef.setAdaptive()" @refresh="getI18nDataList">
			<template #buttons>
				<el-button :icon="useRenderIcon(AddFill)" type="primary" @click="addDialogVisible = true"> 添加多语言 </el-button>
			</template>
			<template v-slot="{ size, dynamicColumns }">
				<pure-table
					ref="tableRef"
					:adaptiveConfig="{ offsetBottom: 45 }"
					:columns="dynamicColumns"
					:data="i18nStore.i18nDataList"
					:header-cell-style="{ background: 'var(--el-fill-color-light)', color: 'var(--el-text-color-primary)' }"
					:loading="i18nStore.loading"
					:size="size"
					adaptive
					align-whole="center"
					row-key="id"
					showOverflowTooltip
					table-layout="auto"
				>
					<template #operation="{ row }">
						<el-button :icon="useRenderIcon(EditPen)" :size="size" class="reset-margin" link type="primary"> 修改 </el-button>
						<el-button v-show="row.menuType !== 3" :icon="useRenderIcon(AddFill)" :size="size" class="reset-margin" link type="primary"> 新增 </el-button>
						<el-popconfirm :title="`是否确认删除菜单名称为${$t(row.title)}的这条数据${row?.children?.length > 0 ? '注意下级菜单也会一并删除，请谨慎操作' : ''}`" @confirm="onDelete(row)">
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
