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
	{ label: $t('userLoginLog_ipAddress'), prop: 'ipAddress', width: 180 },
	// 登录Ip归属地
	{ label: $t('userLoginLog_ipRegion'), prop: 'ipRegion', width: 130 },
	// 登录时代理
	{ label: $t('userLoginLog_userAgent'), prop: 'userAgent', width: 200 },
	// 操作类型
	{ label: $t('userLoginLog_type'), prop: 'type', width: 130 },
	// 标识客户端是否是通过Ajax发送请求的
	{ label: $t('userLoginLog_xRequestedWith'), prop: 'xRequestedWith', width: 130 },
	// 用户代理的品牌和版本
	{ label: $t('userLoginLog_secChUa'), prop: 'secChUa', width: 150 },
	// 用户代理的底层平台架构
	{ label: $t('userLoginLog_secChUaArch'), prop: 'secChUaArch', width: 150 },
	// 用户代理的底层CPU架构位数
	{ label: $t('userLoginLog_secChUaBitness'), prop: 'secChUaBitness', width: 150 },
	// 用户代理是否在手机设备上运行
	{ label: $t('userLoginLog_secChUaMobile'), prop: 'secChUaMobile', width: 150 },
	// 用户代理的设备模型
	{ label: $t('userLoginLog_secChUaModel'), prop: 'secChUaModel', width: 150 },
	// 用户代理的底层操作系统/平台
	{ label: $t('userLoginLog_secChUaPlatform'), prop: 'secChUaPlatform', width: 160 },
	// 用户代理的底层操作系统版本
	{ label: $t('userLoginLog_secChUaPlatformVersion'), prop: 'secChUaPlatformVersion', width: 180 },
	// 客户端设备像素比
	{ label: $t('userLoginLog_contentDpr'), prop: 'contentDpr', width: 150 },
	// 客户端RAM内存的近似值
	{ label: $t('userLoginLog_deviceMemory'), prop: 'deviceMemory', width: 150 },
	// 客户端设备像素比
	{ label: $t('userLoginLog_dpr'), prop: 'dpr', width: 150 },
	// 布局视口宽度
	{ label: $t('userLoginLog_viewportWidth'), prop: 'viewportWidth', width: 150 },
	// 所需资源宽度
	{ label: $t('userLoginLog_width'), prop: 'width', width: 150 },
	// 客户端连接到服务器的近似带宽
	{ label: $t('userLoginLog_downlink'), prop: 'downlink', width: 150 },
	// 有效连接类型
	{ label: $t('userLoginLog_ect'), prop: 'ect', width: 150 },
	// 应用层往返时间
	{ label: $t('userLoginLog_rtt'), prop: 'rtt', width: 150 },
	// 登录token
	{ label: $t('userLoginLog_token'), prop: 'token', width: 260 },
	{ label: $t('table.updateTime'), prop: 'updateTime', sortable: true, width: 160 },
	{ label: $t('table.createTime'), prop: 'createTime', sortable: true, width: 160 },
	{ label: $t('table.createUser'), prop: 'createUser', slot: 'createUser', width: 90 },
	{ label: $t('table.updateUser'), prop: 'updateUser', slot: 'updateUser', width: 90 },
	{ label: $t('table.operation'), fixed: 'right', width: 160, slot: 'operation' },
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
	ipAddress: [{ required: true, message: `${$t('input')}${$t('userLoginLog_ipAddress')}`, trigger: 'blur' }],
	// 登录Ip归属地
	ipRegion: [{ required: true, message: `${$t('input')}${$t('userLoginLog_ipRegion')}`, trigger: 'blur' }],
	// 登录时代理
	userAgent: [{ required: true, message: `${$t('input')}${$t('userLoginLog_userAgent')}`, trigger: 'blur' }],
	// 操作类型
	type: [{ required: true, message: `${$t('input')}${$t('userLoginLog_type')}`, trigger: 'blur' }],
	// 标识客户端是否是通过Ajax发送请求的
	xRequestedWith: [{ required: true, message: `${$t('input')}${$t('userLoginLog_xRequestedWith')}`, trigger: 'blur' }],
	// 用户代理的品牌和版本
	secChUa: [{ required: true, message: `${$t('input')}${$t('userLoginLog_secChUa')}`, trigger: 'blur' }],
	// 用户代理的底层平台架构
	secChUaArch: [{ required: true, message: `${$t('input')}${$t('userLoginLog_secChUaArch')}`, trigger: 'blur' }],
	// 用户代理的底层CPU架构位数
	secChUaBitness: [{ required: true, message: `${$t('input')}${$t('userLoginLog_secChUaBitness')}`, trigger: 'blur' }],
	// 用户代理是否在手机设备上运行
	secChUaMobile: [{ required: true, message: `${$t('input')}${$t('userLoginLog_secChUaMobile')}`, trigger: 'blur' }],
	// 用户代理的设备模型
	secChUaModel: [{ required: true, message: `${$t('input')}${$t('userLoginLog_secChUaModel')}`, trigger: 'blur' }],
	// 用户代理的底层操作系统/平台
	secChUaPlatform: [
		{
			required: true,
			message: `${$t('input')}${$t('userLoginLog_secChUaPlatform')}`,
			trigger: 'blur',
		},
	],
	// 用户代理的底层操作系统版本
	secChUaPlatformVersion: [
		{
			required: true,
			message: `${$t('input')}${$t('userLoginLog_secChUaPlatformVersion')}`,
			trigger: 'blur',
		},
	],
	// 客户端设备像素比
	contentDpr: [{ required: true, message: `${$t('input')}${$t('userLoginLog_contentDpr')}`, trigger: 'blur' }],
	// 客户端RAM内存的近似值
	deviceMemory: [{ required: true, message: `${$t('input')}${$t('userLoginLog_deviceMemory')}`, trigger: 'blur' }],
	// 客户端设备像素比
	dpr: [{ required: true, message: `${$t('input')}${$t('userLoginLog_dpr')}`, trigger: 'blur' }],
	// 布局视口宽度
	viewportWidth: [{ required: true, message: `${$t('input')}${$t('userLoginLog_viewportWidth')}`, trigger: 'blur' }],
	// 所需资源宽度
	width: [{ required: true, message: `${$t('input')}${$t('userLoginLog_width')}`, trigger: 'blur' }],
	// 客户端连接到服务器的近似带宽
	downlink: [{ required: true, message: `${$t('input')}${$t('userLoginLog_downlink')}`, trigger: 'blur' }],
	// 有效连接类型
	ect: [{ required: true, message: `${$t('input')}${$t('userLoginLog_ect')}`, trigger: 'blur' }],
	// 应用层往返时间
	rtt: [{ required: true, message: `${$t('input')}${$t('userLoginLog_rtt')}`, trigger: 'blur' }],
});
