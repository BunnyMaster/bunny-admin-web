import { addDialog } from '@/components/BaseDialog/index';
import AdminUserDialog from '@/views/system/adminUser/admin-user-dialog.vue';
import { useAdminUserStore } from '@/store/system/adminUser.ts';
import { h, ref } from 'vue';
import { messageBox } from '@/utils/message';
import type { FormItemProps } from '@/views/system/adminUser/utils/types';
import { $t } from '@/plugins/i18n';

export const formRef = ref();
const adminUserStore = useAdminUserStore();

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
				status: undefined,
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
