import { $t } from '@/plugins/i18n';

export const rules = {
	// 消息标题
	title: [{ required: true, message: `${$t('input')}${$t('title')}`, trigger: 'blur' }],
	// 消息类型
	messageType: [{ required: true, message: `${$t('input')}${$t('messageType')}`, trigger: 'blur' }],
	// 消息内容
	content: [{ required: true, message: `${$t('input')}${$t('content')}`, trigger: 'blur' }],
	// 编辑器类型
	editorType: [{ required: true, message: `${$t('input')}${$t('editorType')}`, trigger: 'blur' }],
	// 消息简介
	summary: [{ required: true, message: `${$t('input')}${$t('summary')}`, trigger: 'blur' }],
};
