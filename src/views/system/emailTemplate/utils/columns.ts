import { reactive } from 'vue';
import { $t } from '@/plugins/i18n';

// 表格列
export const columns: TableColumnList = [
	{ type: 'selection', align: 'left' },
	{ type: 'index', index: (index: number) => index + 1, label: '序号', width: 60 },
	// 模板名称
	{ label: $t('emailTemplate_templateName'), prop: 'templateName' },
	// 主题
	{ label: $t('emailTemplate_subject'), prop: 'subject' },
	// 邮件内容
	{ label: $t('emailTemplate_body'), prop: 'body' },
	// 邮件类型
	{ label: $t('emailTemplate_type'), prop: 'type' },
	{ label: $t('table.updateTime'), prop: 'updateTime', sortable: true, width: 160 },
	{ label: $t('table.createTime'), prop: 'createTime', sortable: true, width: 160 },
	{ label: $t('table.createUser'), prop: 'createUser', slot: 'createUser', width: 90 },
	{ label: $t('table.updateUser'), prop: 'updateUser', slot: 'updateUser', width: 90 },
	{ label: $t('table.operation'), fixed: 'right', width: 210, slot: 'operation' },
];

// 添加规则
export const rules = reactive({
	// 模板名称
	templateName: [{ required: true, message: `${$t('input')}${$t('emailTemplate_templateName')}`, trigger: 'blur' }],
	// 主题
	subject: [{ required: true, message: `${$t('input')}${$t('emailTemplate_subject')}`, trigger: 'blur' }],
	// 邮件内容
	body: [{ required: true, message: `${$t('input')}${$t('emailTemplate_body')}`, trigger: 'blur' }],
	// 邮件类型
	type: [{ required: true, message: `${$t('input')}${$t('emailTemplate_type')}`, trigger: 'blur' }],
});
