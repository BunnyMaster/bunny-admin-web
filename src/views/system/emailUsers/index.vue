<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { columns } from '@/views/system/emailUsers/utils/columns';
import PureTableBar from '@/components/TableBar/src/bar';
import AddFill from '@iconify-icons/ri/add-circle-line';
import PureTable from '@pureadmin/table';
import { onAdd, onDelete, onSearch, onUpdate } from '@/views/system/emailUsers/utils/hooks';
import Delete from '@iconify-icons/ep/delete';
import EditPen from '@iconify-icons/ep/edit-pen';
import Refresh from '@iconify-icons/ep/refresh';
import { selectUserinfo } from '@/components/Table/Userinfo/columns';
import { $t } from '@/plugins/i18n';
import { useEmailUsersStore } from '@/store/system/emailUsers.ts';
import { useRenderIcon } from '@/components/CommonIcon/src/hooks';

const tableRef = ref();
const formRef = ref();
const emailUsersStore = useEmailUsersStore();

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
		<el-form ref="formRef" :inline="true" :model="emailUsersStore.form" class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto">
			<el-form-item :label="$t('emailUsers_email')" prop="email">
				<el-input v-model="emailUsersStore.form.email" :placeholder="`${$t('input')}${$t('emailUsers_email')}`" class="!w-[180px]" clearable />
			</el-form-item>
			<el-form-item :label="$t('emailUsers_emailTemplate')" prop="emailTemplate">
				<el-input v-model="emailUsersStore.form.emailTemplate" :placeholder="`${$t('input')}${$t('emailUsers_emailTemplate')}`" class="!w-[180px]" clearable />
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

		<PureTableBar :columns="columns" title="邮箱用户发送配置管理" @fullscreen="tableRef.setAdaptive()" @refresh="onSearch">
			<template #buttons>
				<el-button :icon="useRenderIcon(AddFill)" type="primary" @click="onAdd"> {{ $t('add_new') }}</el-button>
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
						<el-button :icon="useRenderIcon(AddFill)" :size="size" class="reset-margin" link type="primary" @click="onAdd"> {{ $t('add_new') }} </el-button>
						<!-- TODO 待完成 -->
						<el-popconfirm :title="`是否确认删除 ${row.typeName}数据`" @confirm="onDelete(row)">
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
