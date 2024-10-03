<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { columns } from '@/views/system/adminUser/utils/columns';
import PureTableBar from '@/components/TableBar/src/bar';
import AddFill from '@iconify-icons/ri/add-circle-line';
import PureTable from '@pureadmin/table';
import { onAdd, onDelete, onSearch, onUpdate } from '@/views/system/adminUser/utils/hooks';
import Delete from '@iconify-icons/ep/delete';
import EditPen from '@iconify-icons/ep/edit-pen';
import Refresh from '@iconify-icons/ep/refresh';
import { selectUserinfo } from '@/components/Table/Userinfo/columns';
import { $t } from '@/plugins/i18n';
import { useAdminUserStore } from '@/store/system/adminUser.ts';
import { useRenderIcon } from '@/components/CommonIcon/src/hooks';
import userAvatar from '@/assets/user.jpg';
import Upload from '@iconify-icons/ri/upload-line';
import Role from '@iconify-icons/ri/admin-line';
import Password from '@iconify-icons/ri/lock-password-line';
import More from '@iconify-icons/ep/more-filled';

const tableRef = ref();
const formRef = ref();
const adminUserStore = useAdminUserStore();

const handleUpdate = row => {
	console.log(row);
};

/**
 * * 上传头像
 */
const onUploadAvatar = (row: any) => {};

/**
 * * 重置密码
 * @param row
 */
const onResetPassword = (row: any) => {};

/**
 * 为用户分配角色
 * @param row
 */
const onAssignRolesToUser = (row: any) => {};

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
 * * 按钮类
 */
const buttonClass = computed(() => ['!h-[20px]', 'reset-margin', '!text-gray-500', 'dark:!text-white', 'dark:hover:!text-primary']);

onMounted(() => {
	onSearch();
});
</script>

<template>
	<div class="main">
		<el-form ref="formRef" :inline="true" :model="adminUserStore.form" class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto">
			<el-form-item :label="$t('adminUser_username')" prop="username">
				<el-input v-model="adminUserStore.form.username" :placeholder="`${$t('input')}${$t('adminUser_username')}`" class="!w-[180px]" clearable />
			</el-form-item>
			<el-form-item :label="$t('adminUser_nickName')" prop="nickName">
				<el-input v-model="adminUserStore.form.nickName" :placeholder="`${$t('input')}${$t('adminUser_nickName')}`" class="!w-[180px]" clearable />
			</el-form-item>
			<el-form-item :label="$t('adminUser_email')" prop="email">
				<el-input v-model="adminUserStore.form.email" :placeholder="`${$t('input')}${$t('adminUser_email')}`" class="!w-[180px]" clearable />
			</el-form-item>
			<el-form-item :label="$t('adminUser_phone')" prop="phone">
				<el-input v-model="adminUserStore.form.phone" :placeholder="`${$t('input')}${$t('adminUser_phone')}`" class="!w-[180px]" clearable />
			</el-form-item>
			<el-form-item :label="$t('adminUser_sex')" prop="sex">
				<el-input v-model="adminUserStore.form.sex" :placeholder="`${$t('input')}${$t('adminUser_sex')}`" class="!w-[180px]" clearable />
			</el-form-item>
			<el-form-item :label="$t('adminUser_summary')" prop="summary">
				<el-input v-model="adminUserStore.form.summary" :placeholder="`${$t('input')}${$t('adminUser_summary')}`" class="!w-[180px]" clearable />
			</el-form-item>
			<el-form-item :label="$t('adminUser_status')" prop="status">
				<el-input v-model="adminUserStore.form.status" :placeholder="`${$t('input')}${$t('adminUser_status')}`" class="!w-[180px]" clearable />
			</el-form-item>
			<el-form-item>
				<el-button :icon="useRenderIcon('ri:search-line')" :loading="adminUserStore.loading" type="primary" @click="onSearch"> {{ $t('search') }} </el-button>
				<el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)"> {{ $t('buttons.reset') }}</el-button>
			</el-form-item>
		</el-form>

		<PureTableBar :columns="columns" title="用户信息" @fullscreen="tableRef.setAdaptive()" @refresh="onSearch">
			<template #buttons>
				<el-button :icon="useRenderIcon(AddFill)" type="primary" @click="onAdd"> 添加用户信息</el-button>
			</template>

			<template v-slot="{ size, dynamicColumns }">
				<pure-table
					ref="tableRef"
					:adaptiveConfig="{ offsetBottom: 45 }"
					:columns="dynamicColumns"
					:data="adminUserStore.datalist"
					:header-cell-style="{ background: 'var(--el-fill-color-light)', color: 'var(--el-text-color-primary)' }"
					:loading="adminUserStore.loading"
					:size="size"
					adaptive
					align-whole="center"
					border
					highlight-current-row
					row-key="id"
					showOverflowTooltip
					table-layout="auto"
				>
					<template #avatar="{ row }">
						<el-image :preview-src-list="Array.of(row.avatar || userAvatar)" :src="row.avatar || userAvatar" class="w-[24px] h-[24px] rounded-full align-middle" fit="cover" preview-teleported />
					</template>

					<template #status="{ row }">
						<el-switch v-model="row.status" active-text="禁用" class="ml-2" inactive-text="启用" inline-prompt style="

--el-switch-on-color: #ff4949; --el-switch-off-color: #13ce66" />
					</template>

					<template #sex="{ row }">
						<el-tag :type="row.sex === 0 ? 'danger' : null" effect="plain"> {{ row.sex === 1 ? '男' : '女' }}</el-tag>
					</template>

					<template #createUser="{ row }">
						<el-button link type="primary" @click="selectUserinfo(row.createUser)">{{ $t('table.createUser') }} </el-button>
					</template>

					<template #updateUser="{ row }">
						<el-button link type="primary" @click="selectUserinfo(row.updateUser)">{{ $t('table.updateUser') }} </el-button>
					</template>

					<template #operation="{ row }">
						<!-- 修改 -->
						<el-button :icon="useRenderIcon(EditPen)" :size="size" class="reset-margin" link type="primary" @click="onUpdate(row)"> {{ $t('modify') }} </el-button>

						<!-- 删除 -->
						<el-popconfirm :title="`是否确认删除 ${row.username}数据`" @confirm="onDelete(row)">
							<template #reference>
								<el-button :icon="useRenderIcon(Delete)" :size="size" class="reset-margin" link type="primary">
									{{ $t('delete') }}
								</el-button>
							</template>
						</el-popconfirm>

						<!-- 更多操作 -->
						<el-dropdown>
							<el-button :icon="useRenderIcon(More)" :size="size" class="ml-3 mt-[2px]" link type="primary" @click="handleUpdate(row)" />
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item>
										<el-button :class="buttonClass" :icon="useRenderIcon(Upload)" :size="size" link type="primary" @click="onUploadAvatar(row)"> 上传头像 </el-button>
									</el-dropdown-item>
									<el-dropdown-item>
										<el-button :class="buttonClass" :icon="useRenderIcon(Password)" :size="size" link type="primary" @click="onResetPassword(row)"> 重置密码 </el-button>
									</el-dropdown-item>
									<el-dropdown-item>
										<el-button :class="buttonClass" :icon="useRenderIcon(Role)" :size="size" link type="primary" @click="onAssignRolesToUser(row)"> 分配角色 </el-button>
									</el-dropdown-item>
								</el-dropdown-menu>
							</template>
						</el-dropdown>
					</template>
				</pure-table>
			</template>
		</PureTableBar>
	</div>
</template>
