import { addDialog } from '@/components/BaseDialog/index';
import AdminUserDialog from '@/views/system/adminUser/admin-user-dialog.vue';
import { useAdminUserStore } from '@/store/system/adminUser.ts';
import { h, reactive, ref } from 'vue';
import { message, messageBox } from '@/utils/message';
import type { FormItemProps } from '@/views/system/adminUser/utils/types';
import { $t } from '@/plugins/i18n';
import { isAddUserinfo } from '@/views/system/adminUser/utils/columns';
import ResetPasswordDialog from '@/views/system/adminUser/reset-passwords.vue';
import { deviceDetection } from '@pureadmin/utils';
import CropperPreview from '@/components/CropperPreview';
import AssignUserToRole from '@/views/system/adminUser/assign-user-to-role.vue';
import userAvatar from '@/assets/user.jpg';
import { fetchForcedOffline, fetchUploadAvatarByAdmin } from '@/api/v1/user';
import { useUserStore } from '@/store/system/user';

const adminUserStore = useAdminUserStore();
const userStore = useUserStore();
const formRef = ref();
const cropRef = ref();
const assignRolesRef = ref();
// 上传头像信息
const avatarInfo = ref();
// 重置密码表单校验Ref
const ruleFormByRestPasswordRef = ref();
// 重置密码表单
const restPasswordForm = reactive({
	userId: void 0,
	password: '',
});

/**
 * * 搜索初始化用户信息
 */
export async function onSearch() {
	adminUserStore.loading = true;
	await adminUserStore.getAdminUserList();
	adminUserStore.loading = false;
}

/**
 * * 添加用户信息
 */
export function onAdd() {
	isAddUserinfo.value = true;
	addDialog({
		title: `${$t('add_new')}${$t('adminUser')}`,
		width: '30%',
		props: {
			formInline: {
				username: undefined,
				nickName: undefined,
				email: undefined,
				phone: undefined,
				password: undefined,
				avatar: undefined,
				sex: undefined,
				summary: undefined,
				status: false,
			},
		},
		draggable: true,
		fullscreenIcon: true,
		closeOnClickModal: false,
		contentRenderer: () => h(AdminUserDialog, { ref: formRef }),
		beforeSure: (done, { options }) => {
			const form = options.props.formInline as FormItemProps;
			formRef.value.formRef.validate(async (valid: any) => {
				if (!valid) return;

				const result = await adminUserStore.addAdminUser(form);
				if (!result) return;
				done();
				await onSearch();
			});
		},
	});
}

/**
 * * 更新用户信息
 * @param row
 */
export function onUpdate(row: any) {
	isAddUserinfo.value = false;
	addDialog({
		title: `${$t('modify')}${$t('adminUser')}`,
		width: '30%',
		props: {
			formInline: {
				username: row.username,
				nickName: row.nickName,
				email: row.email,
				phone: row.phone,
				password: row.password,
				avatar: row.avatar,
				sex: row.sex,
				summary: row.summary,
				status: row.status,
			},
		},
		draggable: true,
		fullscreenIcon: true,
		closeOnClickModal: false,
		contentRenderer: () => h(AdminUserDialog, { ref: formRef }),
		beforeSure: (done, { options }) => {
			const form = options.props.formInline as FormItemProps;
			formRef.value.formRef.validate(async (valid: any) => {
				if (!valid) return;
				const result = await adminUserStore.updateAdminUser({ ...form, id: row.id });
				if (!result) return;

				done();
				await onSearch();
			});
		},
	});
}

/**
 * * 删除用户信息
 */
export const onDelete = async (row: any) => {
	const id = row.id;

	// 是否确认删除
	const result = await messageBox({
		title: $t('confirm_delete'),
		showMessage: false,
		confirmMessage: undefined,
		cancelMessage: $t('cancel_delete'),
	});
	if (!result) return;

	// 删除数据
	await adminUserStore.deleteAdminUser([id]);
	await onSearch();
};

/**
 * * 更新用户状态
 * @param row
 */
export const updateUserStatus = async (row: any) => {
	const confirm = await messageBox({
		title: $t('confirm_update_status'),
		showMessage: false,
		confirmMessage: undefined,
		cancelMessage: $t('cancel'),
	});
	if (!confirm) {
		row.status = !row.status;
		return;
	}
	const data = { id: row.id, username: row.username, nickName: row.nickName, email: row.email, status: row.status };
	const result = await adminUserStore.updateAdminUser(data);
	if (!result) return;
	await onSearch();
};

/**
 * * 上传头像
 * @param row
 */
export const onUploadAvatar = (row: any) => {
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
			// 上传头像
			const data = { userId: row.id, avatar: avatarInfo.value.blob };
			const result = await fetchUploadAvatarByAdmin(data);
			if (result.code !== 200) return;

			message(result.message, { type: 'success' });
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
export const onResetPassword = (row: any) => {
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
export const onAssignRolesToUser = (row: any) => {
	addDialog({
		title: `为 ${row.username} 分配角色`,
		width: '45%',
		draggable: true,
		closeOnClickModal: false,
		fullscreenIcon: true,
		contentRenderer: () => <AssignUserToRole ref={assignRolesRef} userId={row.id} />,
		beforeSure: async (done: any) => {
			// 分配用户角色
			const data = { userId: row.id, roleIds: assignRolesRef.value.assignRoles };
			const result = await userStore.assignRolesToUsers(data);

			// 更新成功关闭弹窗
			if (!result) return;
			done();
		},
	});
};

/**
 * * 强制下线
 * @param row
 */
export const onForcedOffline = async (row: any) => {
	const id = row.id;
	const confirm = await messageBox({
		title: $t('confirm_forcedOffline'),
		showMessage: false,
		confirmMessage: undefined,
		cancelMessage: $t('cancel'),
	});
	if (!confirm) return;

	const result = await fetchForcedOffline(id);
	if (result.code !== 200) return;
	message(result.message, { type: 'success' });
};
