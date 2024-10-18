import { reactive } from 'vue';
import { $t } from '@/plugins/i18n';

// 表格列
export const columns: TableColumnList = [
	{ type: 'selection', align: 'left' },
	{ type: 'index', index: (index: number) => index + 1, label: '序号', width: 60 },
	// 用户Id
	{ label: $t('userLoginLog_userId'), prop: 'userId' },
	// 用户名
	{ label: $t('userLoginLog_username'), prop: 'username' },
	// 登录token
	{ label: $t('userLoginLog_token'), prop: 'token' },
	// 登录Ip
	{ label: $t('userLoginLog_ip'), prop: 'ip' },
	// 登录Ip地点
	{ label: $t('userLoginLog_ipAddress'), prop: 'ipAddress' },
	// 登录时代理
	{ label: $t('userLoginLog_userAgent'), prop: 'userAgent' },
	{ label: $t('table.updateTime'), prop: 'updateTime', sortable: true, width: 160 },
	{ label: $t('table.createTime'), prop: 'createTime', sortable: true, width: 160 },
	{ label: $t('table.createUser'), prop: 'createUser', slot: 'createUser', width: 90 },
	{ label: $t('table.updateUser'), prop: 'updateUser', slot: 'updateUser', width: 90 },
	{ label: $t('table.operation'), fixed: 'right', width: 210, slot: 'operation' },
];

// 添加规则
export const rules = reactive({
	// 用户Id
	userId: [{ required: true, message: `${$t('input')}${$t('userLoginLog_userId')}`, trigger: 'blur' }],
	// 用户名
	username: [{ required: true, message: `${$t('input')}${$t('userLoginLog_username')}`, trigger: 'blur' }],
	// 登录token
	token: [{ required: true, message: `${$t('input')}${$t('userLoginLog_token')}`, trigger: 'blur' }],
	// 登录Ip
	ip: [{ required: true, message: `${$t('input')}${$t('userLoginLog_ip')}`, trigger: 'blur' }],
	// 登录Ip地点
	ipAddress: [{ required: true, message: `${$t('input')}${$t('userLoginLog_ipAddress')}`, trigger: 'blur' }],
	// 登录时代理
	userAgent: [{ required: true, message: `${$t('input')}${$t('userLoginLog_userAgent')}`, trigger: 'blur' }],
});
