<script lang="tsx" setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { columns } from '@/views/system/adminUser/utils/columns';
import PureTableBar from '@/components/TableBar/src/bar';
import AddFill from '@iconify-icons/ri/add-circle-line';
import PureTable from '@pureadmin/table';
import { onAdd, onDelete, onSearch, onUpdate, updateUserStatus } from '@/views/system/adminUser/utils/hooks';
import Delete from '@iconify-icons/ep/delete';
import EditPen from '@iconify-icons/ep/edit-pen';
import Refresh from '@iconify-icons/ep/refresh';
import { selectUserinfo } from '@/components/Table/Userinfo/columns';
import { $t } from '@/plugins/i18n';
import { useAdminUserStore } from '@/store/system/adminUser.ts';
import ResetPasswordDialog from '@/components/Table/ResetPasswords.vue';
import { useRenderIcon } from '@/components/CommonIcon/src/hooks';
import userAvatar from '@/assets/user.jpg';
import Upload from '@iconify-icons/ri/upload-line';
import Role from '@iconify-icons/ri/admin-line';
import Password from '@iconify-icons/ri/lock-password-line';
import More from '@iconify-icons/ep/more-filled';
import { addDialog } from '@/components/BaseDialog/index';
import { deviceDetection } from '@pureadmin/utils';
import CropperPreview from '@/components/CropperPreview';
import AssignUserToRole from '@/views/system/adminUser/assign-user-to-role.vue';
import { useRoleStore } from '@/store/system/role';

const tableRef = ref();
const formRef = ref();
const cropRef = ref();
const assignRolesRef = ref();
const roleStore = useRoleStore();
// 上传头像信息
const avatarInfo = ref();
const adminUserStore = useAdminUserStore();
// 重置密码表单校验Ref
const ruleFormByRestPasswordRef = ref();
// 重置密码表单
const restPasswordForm = reactive({
	userId: void 0,
	password: '',
});

/** 上传头像 */
const onUploadAvatar = (row: any) => {
	addDialog({
		title: '裁剪、上传头像',
		width: '40%',
		closeOnClickModal: false,
		fullscreen: deviceDetection(),
		contentRenderer: () =>
			h(CropperPreview, {
				ref: cropRef,
				imgSrc: row.avatar || userAvatar,
				onCropper: info => (avatarInfo.value = info),
			}),
		beforeSure: async done => {
			console.log('裁剪后的图片信息：', avatarInfo.value);
			// 根据实际业务使用avatarInfo.value和row里的某些字段去调用上传头像接口即可
			done();
			await onSearch();
		},
		closeCallBack: () => cropRef.value.hidePopover(),
	});
};

/**
 * * 重置密码
 * @param row
 */
const onResetPassword = (row: any) => {
	addDialog({
		title: `重置 ${row.username} 用户的密码`,
		width: '30%',
		draggable: true,
		closeOnClickModal: false,
		fullscreenIcon: true,
		destroyOnClose: true,
		contentRenderer: () => <ResetPasswordDialog ref={ruleFormByRestPasswordRef} form={restPasswordForm} />,
		beforeSure: (done: any) => {
			ruleFormByRestPasswordRef.value.ruleFormRef.validate(async (valid: any) => {
				if (valid) {
					// 更新用户密码
					const data = { userId: row.id, password: restPasswordForm.password };
					const result = await adminUserStore.updateAdminUserPasswordByManager(data);

					// 更新成功关闭弹窗
					if (!result) return;
					done();
				}
			});
		},
	});
};

/**
 * 为用户分配角色
 * @param row
 */
const onAssignRolesToUser = (row: any) => {
	addDialog({
		title: `为 ${row.username} 分配角色`,
		width: '30%',
		draggable: true,
		closeOnClickModal: false,
		fullscreenIcon: true,
		contentRenderer: () => <AssignUserToRole ref={assignRolesRef} userId={row.id} />,
		beforeSure: async (done: any) => {
			// 分配用户角色
			const data = { userId: row.id, roleIds: assignRolesRef.value.assignRoles };
			const result = await roleStore.assignRolesToUsers(data);

			// 更新成功关闭弹窗
			if (!result) return;
			done();
		},
	});
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
					<!-- 显示头像 -->
					<template #avatar="{ row }">
						<el-image :preview-src-list="Array.of(row.avatar || userAvatar)" :src="row.avatar || userAvatar" class="w-[24px] h-[24px] rounded-full align-middle" fit="cover" preview-teleported />
					</template>

					<!-- 显示用户状态 -->
					<template #status="{ row }">
						<el-switch
							v-model="row.status"
							active-text="禁用"
							class="ml-2"
							inactive-text="正常"
							inline-prompt
							style="

--el-switch-on-color: #ff4949; --el-switch-off-color: #13ce66"
							@change="updateUserStatus(row)"
						/>
					</template>

					<!-- 用户性别 -->
					<template #sex="{ row }">
						<el-tag :type="row.sex === 0 ? 'danger' : null" effect="plain"> {{ row.sex === 1 ? '男' : '女' }}</el-tag>
					</template>

					<!-- 创建用户 -->
					<template #createUser="{ row }">
						<el-button link type="primary" @click="selectUserinfo(row.createUser)">{{ $t('table.createUser') }} </el-button>
					</template>

					<!-- 更新用户 -->
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
							<el-button :icon="useRenderIcon(More)" :size="size" class="ml-3 mt-[2px]" link type="primary" />
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
