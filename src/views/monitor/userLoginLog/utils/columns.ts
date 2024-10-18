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
	{ label: $t('userLoginLog_ipAddress'), prop: 'ipAddress' },
	// 登录Ip地点
	{ label: $t('userLoginLog_ipRegion'), prop: 'ipRegion' },
	// 登录时代理
	{ label: $t('userLoginLog_userAgent'), prop: 'userAgent' },
	// 操作类型
	{ label: $t('userLoginLog_type'), prop: 'type' },
	{ label: $t('table.updateTime'), prop: 'updateTime', sortable: true, width: 160 },
	{ label: $t('table.createTime'), prop: 'createTime', sortable: true, width: 160 },
	{ label: $t('table.createUser'), prop: 'createUser', slot: 'createUser', width: 90 },
	{ label: $t('table.updateUser'), prop: 'updateUser', slot: 'updateUser', width: 90 },
	{ label: $t('table.operation'), fixed: 'right', width: 210, slot: 'operation' },
];

export const rules = reactive({});
