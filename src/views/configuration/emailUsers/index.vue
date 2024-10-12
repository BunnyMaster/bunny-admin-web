<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { columns } from '@/views/configuration/emailUsers/utils/columns';
import PureTableBar from '@/components/TableBar/src/bar';
import AddFill from '@iconify-icons/ri/add-circle-line';
import PureTable from '@pureadmin/table';
import { deleteIds, onAdd, onChangeDefault, onDelete, onDeleteBatch, onSearch, onUpdate, switchLoadMap } from '@/views/configuration/emailUsers/utils/hooks';
import Delete from '@iconify-icons/ep/delete';
import EditPen from '@iconify-icons/ep/edit-pen';
import Refresh from '@iconify-icons/ep/refresh';
import { selectUserinfo } from '@/components/Table/Userinfo/columns';
import { $t } from '@/plugins/i18n';
import { useEmailUsersStore } from '@/store/configuration/emailUsers';
import { useRenderIcon } from '@/components/CommonIcon/src/hooks';
import { usePublicHooks } from '@/views/hooks';
import { FormInstance } from 'element-plus';

const tableRef = ref();
const formRef = ref();
const emailUsersStore = useEmailUsersStore();
// 用户是否停用样式
const { switchStyle } = usePublicHooks();

/**
 * * 当前页改变时
 */
const onCurrentPageChange = async (value: number) => {
	emailUsersStore.pagination.currentPage = value;
	await onSearch();
};

/**
 * * 当分页发生变化
 * @param value
 */
const onPageSizeChange = async (value: number) => {
	emailUsersStore.pagination.pageSize = value;
	await onSearch();
};

/**
 * 重置表单
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
	deleteIds.value = rows.map((row: any) => row.id);
};

onMounted(() => {
	onSearch();
});
</script>

<template>
	<div class="main">
		<el-form ref="formRef" :inline="true" :model="emailUsersStore.form" class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto">
			<el-form-item :label="$t('emailUsers_email')" prop="email">
				<el-input v-model="emailUsersStore.form.email" :placeholder="`${$t('input')}${$t('emailUsers_email')}`" class="!w-[180px]" clearable />
			</el-form-item>
			<el-form-item :label="$t('emailUsers_host')" prop="host">
				<el-input v-model="emailUsersStore.form.host" :placeholder="`${$t('input')}${$t('emailUsers_host')}`" class="!w-[180px]" clearable />
			</el-form-item>
			<el-form-item :label="$t('emailUsers_port')" prop="port">
				<el-input v-model="emailUsersStore.form.port" :placeholder="`${$t('input')}${$t('emailUsers_port')}`" class="!w-[180px]" clearable />
			</el-form-item>
			<el-form-item :label="$t('emailUsers_smtpAgreement')" prop="smtpAgreement">
				<el-input v-model="emailUsersStore.form.smtpAgreement" :placeholder="`${$t('input')}${$t('emailUsers_smtpAgreement')}`" class="!w-[180px]" clearable />
			</el-form-item>
			<el-form-item>
				<el-button :icon="useRenderIcon('ri:search-line')" :loading="emailUsersStore.loading" type="primary" @click="onSearch"> {{ $t('search') }} </el-button>
				<el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)"> {{ $t('buttons.reset') }}</el-button>
			</el-form-item>
		</el-form>

		<PureTableBar :columns="columns" :title="$t('email_user_send_config')" @fullscreen="tableRef.setAdaptive()" @refresh="onSearch">
			<template #buttons>
				<el-button :icon="useRenderIcon(AddFill)" type="primary" @click="onAdd"> {{ $t('add_new') }}</el-button>

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
					:data="emailUsersStore.datalist"
					:header-cell-style="{ background: 'var(--el-fill-color-light)', color: 'var(--el-text-color-primary)' }"
					:loading="emailUsersStore.loading"
					:pagination="emailUsersStore.pagination"
					:size="size"
					adaptive
					align-whole="center"
					border
					highlight-current-row
					row-key="id"
					showOverflowTooltip
					table-layout="auto"
					@selection-change="onSelectionChange"
					@page-size-change="onPageSizeChange"
					@page-current-change="onCurrentPageChange"
				>
					<template #isDefault="{ row, index }">
						<el-switch
							v-model="row.isDefault"
							:active-text="$t('default')"
							:active-value="true"
							:inactive-text="$t('no_default')"
							:inactive-value="false"
							:loading="switchLoadMap[index]?.loading"
							:style="switchStyle"
							inline-prompt
							@click="onChangeDefault(row, index)"
						/>
					</template>

					<template #createUser="{ row }">
						<el-button link type="primary" @click="selectUserinfo(row.createUser)">{{ $t('table.createUser') }} </el-button>
					</template>

					<template #updateUser="{ row }">
						<el-button link type="primary" @click="selectUserinfo(row.updateUser)">{{ $t('table.updateUser') }} </el-button>
					</template>

					<template #operation="{ row }">
						<el-button :icon="useRenderIcon(EditPen)" :size="size" class="reset-margin" link type="primary" @click="onUpdate(row)"> {{ $t('modify') }} </el-button>
						<el-popconfirm :title="`${$t('delete')}${row.email}?`" @confirm="onDelete(row)">
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
