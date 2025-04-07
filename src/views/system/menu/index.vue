<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { $t } from '@/plugins/i18n';
import PureTableBar from '@/components/TableBar/src/bar';
import Delete from '@iconify-icons/ep/delete';
import EditPen from '@iconify-icons/ep/edit-pen';
import Refresh from '@iconify-icons/ep/refresh';
import AddFill from '@iconify-icons/ri/add-circle-line';
import {
	assignBatchRolesToRouter,
	assignRolesToRouter,
	auth,
	clearAllRolesSelect,
	columns,
	onAdd,
	onChangeMenuRank,
	onchangeVisible,
	onDelete,
	onSearch,
	onUpdate,
	selectIds,
	switchLoadMap,
	tableRef,
} from '@/views/system/menu/utils';
import PureTable from '@pureadmin/table';
import { userMenuStore } from '@/store/system/menu';
import { useRenderIcon } from '@/components/CommonIcon/src/hooks';
import { selectUserinfo } from '@/components/Table/Userinfo/columns';
import Upload from '@iconify-icons/ri/upload-line';
import { FormInstance } from 'element-plus';
import { usePublicHooks } from '@/views/hooks';
import { hasAuth } from '@/router/utils';

const formRef = ref();
const routerStore = userMenuStore();
// 用户是否停用样式
const { switchStyle } = usePublicHooks();

/**
 * 表单重置
 * @param formEl
 */
const resetForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
	await onSearch();
};

/**
 * * 选择多行
 * @param rows
 */
const onSelectionChange = (rows: Array<any>) => {
	selectIds.value = rows.map((row: any) => row.id);
};

onMounted(() => {
	onSearch();
});
</script>

<template>
	<div class="main">
		<Auth :value="auth.search">
			<el-form ref="formRef" :inline="true" :model="routerStore.form" class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto">
				<el-form-item label="菜单名称" prop="title">
					<el-input v-model="routerStore.form.title" :placeholder="$t('input')" class="!w-[180px]" clearable />
				</el-form-item>
				<el-form-item>
					<el-button :icon="useRenderIcon('ri:search-line')" :loading="routerStore.loading" type="primary" @click="onSearch"> {{ $t('search') }} </el-button>
					<el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)"> {{ $t('buttons.reset') }}</el-button>
				</el-form-item>
			</el-form>
		</Auth>

		<PureTableBar :columns="columns" :isExpandAll="false" :tableRef="tableRef?.getTableRef()" title="菜单管理" @fullscreen="tableRef?.setAdaptive()" @refresh="onSearch">
			<template #buttons>
				<!-- 添加菜单 -->
				<el-button v-if="hasAuth(auth.add)" :icon="useRenderIcon(AddFill)" type="primary" @click="onAdd()">
					{{ $t('addNew') }}
				</el-button>

				<!-- 批量为菜单添加角色 -->
				<el-button v-if="hasAuth(auth.assignAddBatchRolesToRouter)" :disabled="!(selectIds.length > 0)" :icon="useRenderIcon('iwwa:assign')" type="warning" @click="assignBatchRolesToRouter()">
					{{ $t('assignBatchRolesToRouter') }}
				</el-button>

				<!-- 清除选中所以角色 -->
				<el-button v-if="hasAuth(auth.clearAllRolesSelect)" :disabled="!(selectIds.length > 0)" :icon="useRenderIcon('ic:baseline-clear')" type="danger" @click="clearAllRolesSelect()">
					{{ $t('clearAllRolesSelect') }}
				</el-button>
			</template>

			<template v-slot="{ size, dynamicColumns }">
				<pure-table
					ref="tableRef"
					:adaptiveConfig="{ offsetBottom: 96 }"
					:columns="dynamicColumns"
					:data="routerStore.datalist"
					:header-cell-style="{ background: 'var(--el-fill-color-light)', color: 'var(--el-text-color-primary)' }"
					:loading="routerStore.loading"
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
					<template #visible="{ row, index }">
						<el-switch
							v-model="row.visible"
							:active-text="$t('show')"
							:active-value="true"
							:inactive-text="$t('hidden')"
							:inactive-value="false"
							:loading="switchLoadMap[index]?.loading"
							:style="switchStyle"
							inline-prompt
							@click="onchangeVisible(row, index)"
						/>
					</template>

					<template #rank="{ row }">
						<el-input v-model="row.rank" :max="9999" :min="1" type="number" @blur="onChangeMenuRank(row)" />
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
						<!-- 修改 -->
						<el-button v-if="hasAuth(auth.update)" :icon="useRenderIcon(EditPen)" :size="size" class="reset-margin" link type="primary" @click="onUpdate(row)"> {{ $t('modify') }} </el-button>

						<!-- 新增 -->
						<Auth :value="auth.add">
							<el-button v-show="row.menuType !== 3" :icon="useRenderIcon(AddFill)" :size="size" class="reset-margin" link type="primary" @click="onAdd(row.id)"> {{ $t('addNew') }} </el-button>
						</Auth>

						<!-- 删除操作 -->
						<el-popconfirm v-if="hasAuth(auth.deleted)" :title="`${$t('delete')} ${$t(row.title)}?`" @confirm="onDelete(row)">
							<template #reference>
								<el-button :icon="useRenderIcon(Delete)" :size="size" class="reset-margin" link type="primary">
									{{ $t('delete') }}
								</el-button>
							</template>
						</el-popconfirm>

						<!-- 分配角色 -->
						<Auth :value="auth.assignRolesToRouter">
							<el-button v-show="row.menuType !== 3" :icon="useRenderIcon(Upload)" :size="size" class="reset-margin" link type="primary" @click="assignRolesToRouter(row)">
								{{ $t('assign_roles') }}
							</el-button>
						</Auth>
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
