<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { columns } from '@/views/configuration/menuIcon/utils/columns';
import PureTableBar from '@/components/TableBar/src/bar';
import { useRenderIcon } from '@/components/CommonIcon/src/hooks';
import AddFill from '@iconify-icons/ri/add-circle-line';
import PureTable from '@pureadmin/table';
import { deleteIds, onAdd, onDelete, onDeleteBatch, onSearch, onUpdate } from '@/views/configuration/menuIcon/utils/hooks';
import Delete from '@iconify-icons/ep/delete';
import EditPen from '@iconify-icons/ep/edit-pen';
import Refresh from '@iconify-icons/ep/refresh';
import { selectUserinfo } from '@/components/Table/Userinfo/columns';
import { $t } from '@/plugins/i18n';
import { useMenuIconStore } from '@/store/configuration/menuIcon';
import MenuIconSelectIconName from '@/views/configuration/menuIcon/menu-icon-select-icon-name.vue';
import { auth } from '@/views/configuration/menuIcon/utils/auth';
import { hasAuth } from '@/router/utils';

const tableRef = ref();
const formRef = ref();
const menuIconStore = useMenuIconStore();

/** 当前页改变时 */
const onCurrentPageChange = async (value: number) => {
	menuIconStore.pagination.currentPage = value;
	await onSearch();
};

/** 当分页发生变化 */
const onPageSizeChange = async (value: number) => {
	menuIconStore.pagination.pageSize = value;
	await onSearch();
};

/** 选择多行 */
const onSelectionChange = (rows: Array<any>) => {
	deleteIds.value = rows.map((row: any) => row.id);
};

/** 重置表单 */
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
		<Auth :value="auth.search">
			<el-form ref="formRef" :inline="true" :model="menuIconStore.form" class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto">
				<el-form-item :label="$t('menuIcon_iconCode')" prop="iconCode">
					<el-input v-model="menuIconStore.form.iconCode" :placeholder="`${$t('input')} ${$t('iconCode')}`" class="!w-[180px]" clearable />
				</el-form-item>
				<el-form-item :label="$t('menuIcon_iconName')" prop="iconName">
					<MenuIconSelectIconName :form-inline="menuIconStore.form" class="!w-[180px]" />
				</el-form-item>
				<el-form-item>
					<el-button :icon="useRenderIcon('ri:search-line')" :loading="menuIconStore.loading" type="primary" @click="onSearch"> {{ $t('search') }} </el-button>
					<el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)"> {{ $t('buttons.reset') }}</el-button>
				</el-form-item>
			</el-form>
		</Auth>

		<PureTableBar :columns="columns" :title="$t('menuIcon')" @fullscreen="tableRef.setAdaptive()" @refresh="onSearch">
			<template #buttons>
				<el-button v-if="hasAuth(auth.add)" :icon="useRenderIcon(AddFill)" type="primary" @click="onAdd">
					{{ $t('addNew') }}
				</el-button>

				<!-- 批量删除按钮 -->
				<el-button v-if="hasAuth(auth.deleted)" :disabled="!(deleteIds.length > 0)" :icon="useRenderIcon(Delete)" type="danger" @click="onDeleteBatch">
					{{ $t('deleteBatches') }}
				</el-button>
			</template>

			<template v-slot="{ size, dynamicColumns }">
				<pure-table
					ref="tableRef"
					:adaptiveConfig="{ offsetBottom: 96 }"
					:columns="dynamicColumns"
					:data="menuIconStore.datalist"
					:header-cell-style="{ background: 'var(--el-fill-color-light)', color: 'var(--el-text-color-primary)' }"
					:loading="menuIconStore.loading"
					:pagination="menuIconStore.pagination"
					:size="size"
					adaptive
					align-whole="center"
					border
					highlight-current-row
					row-key="id"
					showOverflowTooltip
					table-layout="auto"
					@page-size-change="onPageSizeChange"
					@page-current-change="onCurrentPageChange"
					@selection-change="onSelectionChange"
				>
					<template #iconCode="{ row }">
						<div v-tippy="{ content: row.iconCode }" class="flex justify-center">
							<component :is="useRenderIcon(row.iconCode)" class="flex justify-center" style="font-size: 30px" />
						</div>
					</template>

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
						<el-popconfirm v-if="hasAuth(auth.deleted)" :title="`${$t('delete')}${row.iconName}?`" @confirm="onDelete(row)">
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
