import { reactive } from 'vue';
import { $t } from '@/plugins/i18n';

// 表格列
export const columns: TableColumnList = [
	{ type: 'selection', align: 'left' },
	{ type: 'index', index: (index: number) => index + 1, label: '序号', width: 60 },
	// 用户Id
	{ label: $t('userLoginLog_userId'), prop: 'userId', width: 180 },
	// 用户名
	{ label: $t('userLoginLog_username'), prop: 'username', width: 180 },
	// 登录Ip
	{ label: $t('userLoginLog_ipAddress'), prop: 'ipAddress', width: 140 },
	// 登录Ip归属地
	{ label: $t('userLoginLog_ipRegion'), prop: 'ipRegion', width: 100 },
	// 登录时代理
	{ label: $t('userLoginLog_userAgent'), prop: 'userAgent', width: 200 },
	// 操作类型
	{ label: $t('userLoginLog_type'), prop: 'type', width: 130 },
	// 标识客户端是否是通过Ajax发送请求的
	{ label: $t('userLoginLog_xRequestedWith'), prop: 'xRequestedWith', width: 150 },
	// 用户代理的品牌和版本
	{ label: $t('userLoginLog_secChUa'), prop: 'secChUa', width: 150 },
	// 用户代理是否在手机设备上运行
	{ label: $t('userLoginLog_secChUaMobile'), prop: 'secChUaMobile', width: 130 },
	// 用户代理的底层操作系统/平台
	{ label: $t('userLoginLog_secChUaPlatform'), prop: 'secChUaPlatform', width: 130 },
	// 登录token
	{ label: $t('userLoginLog_token'), prop: 'token', width: 200 },
	{ label: $t('table.updateTime'), prop: 'updateTime', sortable: true, width: 160 },
	{ label: $t('table.createTime'), prop: 'createTime', sortable: true, width: 160 },
	{ label: $t('table.createUser'), prop: 'createUser', slot: 'createUser', width: 90 },
	{ label: $t('table.updateUser'), prop: 'updateUser', slot: 'updateUser', width: 90 },
	{ label: $t('table.operation'), fixed: 'right', width: 160, slot: 'operation' },
];

// 添加规则
export const rules = reactive({});