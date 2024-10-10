import { addDialog } from '@/components/BaseDialog/index';
import EmailTemplateDialog from '@/views/system/emailTemplate/email-template-dialog.vue';
import { useEmailTemplateStore } from '@/store/system/emailTemplate.ts';
import { h, ref } from 'vue';
import { messageBox } from '@/utils/message';
import type { FormItemProps } from '@/views/system/emailTemplate/utils/types';
import { $t } from '@/plugins/i18n';

export const formRef = ref();
const emailTemplateStore = useEmailTemplateStore();

/**
 * * 搜索初始化邮件模板表
 */
export async function onSearch() {
	emailTemplateStore.loading = true;
	await emailTemplateStore.getEmailTemplateList();
	emailTemplateStore.loading = false;
}

/**
 * * 添加邮件模板表
 */
export function onAdd() {
	addDialog({
		title: `${$t('add_new')}${$t('emailTemplate')}`,
		width: '30%',
		props: {
			formInline: {
				templateName: undefined,
				subject: undefined,
				body: undefined,
				type: undefined,
			},
		},
		draggable: true,
		fullscreenIcon: true,
		closeOnClickModal: false,
		contentRenderer: () => h(EmailTemplateDialog, { ref: formRef }),
		beforeSure: (done, { options }) => {
			const form = options.props.formInline as FormItemProps;
			formRef.value.formRef.validate(async (valid: any) => {
				if (!valid) return;

				const result = await emailTemplateStore.addEmailTemplate(form);
				if (!result) return;
				done();
				await onSearch();
			});
		},
	});
}

/**
 * * 更新邮件模板表
 * @param row
 */
export function onUpdate(row: any) {
	addDialog({
		title: `${$t('modify')}${$t('emailTemplate')}`,
		width: '30%',
		props: {
			formInline: {
				templateName: row.templateName,
				subject: row.subject,
				body: row.body,
				type: row.type,
			},
		},
		draggable: true,
		fullscreenIcon: true,
		closeOnClickModal: false,
		contentRenderer: () => h(EmailTemplateDialog, { ref: formRef }),
		beforeSure: (done, { options }) => {
			const form = options.props.formInline as FormItemProps;
			formRef.value.formRef.validate(async (valid: any) => {
				if (!valid) return;

				const result = await emailTemplateStore.updateEmailTemplate({ ...form, id: row.id });
				if (!result) return;
				done();
				await onSearch();
			});
		},
	});
}

/**
 * * 删除邮件模板表
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
	await emailTemplateStore.deleteEmailTemplate([id]);
	await onSearch();
};
