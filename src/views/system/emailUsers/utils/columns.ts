import { reactive } from 'vue';
import { $t } from '@/plugins/i18n';

// 表格列
export const columns: TableColumnList = [
	{ type: 'selection', align: 'left' },
	{ type: 'index', index: (index: number) => index + 1, label: '序号', width: 60 },
	{ label: $t('id'), prop: 'id' },
	// 邮箱
	{ label: $t('emailUsers_email'), prop: 'email' },
	// 邮件模板
	{ label: $t('emailUsers_emailTemplate'), prop: 'emailTemplate' },
	// 密码
	{ label: $t('emailUsers_password'), prop: 'password' },
	// Host地址
	{ label: $t('emailUsers_host'), prop: 'host' },
	// 端口号
	{ label: $t('emailUsers_port'), prop: 'port' },
	// 邮箱协议
	{ label: $t('emailUsers_smtpAgreement'), prop: 'smtpAgreement' },
	// 是否为默认邮件
	{ label: $t('emailUsers_isDefault'), prop: 'isDefault' },
	{ label: $t('table.updateTime'), prop: 'updateTime', sortable: true, width: 160 },
	{ label: $t('table.createTime'), prop: 'createTime', sortable: true, width: 160 },
	{ label: $t('table.createUser'), prop: 'createUser', slot: 'createUser', width: 90 },
	{ label: $t('table.updateUser'), prop: 'updateUser', slot: 'updateUser', width: 90 },
	{ label: $t('table.operation'), fixed: 'right', width: 210, slot: 'operation' },
];

// 添加规则
export const rules = reactive({
	// 邮箱
	email: [{ required: true, message: `${$t('input')}${$t('emailUsers_email')}`, trigger: 'blur' }],
	// 邮件模板
	emailTemplate: [{ required: true, message: `${$t('input')}${$t('emailUsers_emailTemplate')}`, trigger: 'blur' }],
	// 密码
	password: [{ required: true, message: `${$t('input')}${$t('emailUsers_password')}`, trigger: 'blur' }],
	// Host地址
	host: [{ required: true, message: `${$t('input')}${$t('emailUsers_host')}`, trigger: 'blur' }],
	// 端口号
	port: [{ required: true, message: `${$t('input')}${$t('emailUsers_port')}`, trigger: 'blur' }],
	// 邮箱协议
	smtpAgreement: [{ required: true, message: `${$t('input')}${$t('emailUsers_smtpAgreement')}`, trigger: 'blur' }],
	// 是否为默认邮件
	isDefault: [{ required: true, message: `${$t('input')}${$t('emailUsers_isDefault')}`, trigger: 'blur' }],
});
