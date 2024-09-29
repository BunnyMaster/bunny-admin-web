<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import LanguageAdd from '@/views/i18n/i18n-setting/language-add.vue';
import LanguageUpdate from '@/views/i18n/i18n-setting/language-update.vue';
import { userI18nStore } from '@/store/i18n/i18n';
import { addDialogVisible, getI18nDataList, onDelete, updateDialogVisible } from '@/views/i18n/i18n-setting/utils/hook';
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import AddFill from '@iconify-icons/ri/add-circle-line';
import EditPen from '@iconify-icons/ep/edit-pen';
import { $t } from '@/plugins/i18n';
import Delete from '@iconify-icons/ep/delete';
import PureTableBar from '@/components/TableBar/src/bar';
import PureTable from '@pureadmin/table';
import { columns } from '@/views/i18n/i18n-setting/utils/columns';

const tableRef = ref();
const i18nStore = userI18nStore();

onMounted(() => {
	getI18nDataList();
});
</script>

<template>
	<div class="main">
		<language-add v-if="addDialogVisible" />
		<language-update v-if="updateDialogVisible" />

		<PureTableBar :columns="columns" :tableRef="tableRef?.getTableRef()" title="多语言管理" @fullscreen="tableRef.setAdaptive()" @refresh="getI18nDataList">
			<template #buttons>
				<el-button :icon="useRenderIcon(AddFill)" type="primary" @click="addDialogVisible = true"> 添加多语言</el-button>
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
