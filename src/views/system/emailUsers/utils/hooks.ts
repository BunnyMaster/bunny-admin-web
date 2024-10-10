import { addDialog } from '@/components/BaseDialog/index';
import EmailUsersDialog from '@/views/system/emailUsers/email-users-dialog.vue';
import { useEmailUsersStore } from '@/store/system/emailUsers.ts';
import { h, ref } from 'vue';
import { messageBox } from '@/utils/message';
import type { FormItemProps } from '@/views/system/emailUsers/utils/types';
import { $t } from '@/plugins/i18n';

export const formRef = ref();
const emailUsersStore = useEmailUsersStore();

/**
 * * 搜索初始化邮箱用户发送配置
 */
export async function onSearch() {
	emailUsersStore.loading = true;
	await emailUsersStore.getEmailUsersList();
	emailUsersStore.loading = false;
}

/**
 * * 添加邮箱用户发送配置
 */
export function onAdd() {
	addDialog({
		title: `${$t('add_new')}${$t('emailUsers')}`,
		width: '30%',
		props: {
			formInline: {
				email: undefined,
				emailTemplate: undefined,
				password: undefined,
				host: undefined,
				port: undefined,
				smtpAgreement: undefined,
				isDefault: undefined,
			},
		},
		draggable: true,
		fullscreenIcon: true,
		closeOnClickModal: false,
		contentRenderer: () => h(EmailUsersDialog, { ref: formRef }),
		beforeSure: (done, { options }) => {
			const form = options.props.formInline as FormItemProps;
			formRef.value.formRef.validate(async (valid: any) => {
				if (!valid) return;

				const result = await emailUsersStore.addEmailUsers(form);
				if (!result) return;
				done();
				await onSearch();
			});
		},
	});
}

/**
 * * 更新邮箱用户发送配置
 * @param row
 */
export function onUpdate(row: any) {
	addDialog({
		title: `${$t('modify')}${$t('emailUsers')}`,
		width: '30%',
		props: {
			formInline: {
				email: row.email,
				emailTemplate: row.emailTemplate,
				password: row.password,
				host: row.host,
				port: row.port,
				smtpAgreement: row.smtpAgreement,
				isDefault: row.isDefault,
			},
		},
		draggable: true,
		fullscreenIcon: true,
		closeOnClickModal: false,
		contentRenderer: () => h(EmailUsersDialog, { ref: formRef }),
		beforeSure: (done, { options }) => {
			const form = options.props.formInline as FormItemProps;
			formRef.value.formRef.validate(async (valid: any) => {
				if (!valid) return;

				const result = await emailUsersStore.updateEmailUsers({ ...form, id: row.id });
				if (!result) return;
				done();
				await onSearch();
			});
		},
	});
}

/**
 * * 删除邮箱用户发送配置
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
	await emailUsersStore.deleteEmailUsers([id]);
	await onSearch();
};
