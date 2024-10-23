import dayjs from 'dayjs';
import { reactive } from 'vue';
import type { FormRules } from 'element-plus';
import { $t } from '@/plugins/i18n';
import ProfileIcon from '@iconify-icons/ri/user-3-line';
import Profile from '@/views/account-settings/profile.vue';
import SecurityLogIcon from '@iconify-icons/ri/window-line';
import SecurityLog from '@/views/account-settings/security-log.vue';
import AccountManagementIcon from '@iconify-icons/ri/profile-line';
import AccountManagement from '@/views/account-settings/account-management.vue';

export const columns: TableColumnList = [
	{ type: 'index', index: (index: number) => index + 1, label: '序号', width: 60 },
	// 用户名
	{ label: $t('userLoginLog_username'), prop: 'username', width: 180 },
	// // 登录Ip
	// { label: $t('userLoginLog_ipAddress'), prop: 'ipAddress', width: 140 },
	// 登录Ip归属地
	{ label: $t('userLoginLog_ipRegion'), prop: 'ipRegion' },
	// // 登录时代理
	// { label: $t('userLoginLog_userAgent'), prop: 'userAgent' },
	// 操作类型
	{ label: $t('userLoginLog_type'), prop: 'type' },
	// // 标识客户端是否是通过Ajax发送请求的
	// { label: $t('userLoginLog_xRequestedWith'), prop: 'xRequestedWith', width: 150 },
	// 创建时间也就是操作时间
	{
		label: $t('op_time'),
		prop: 'op_time',
		sortable: true,
		width: 160,
		formatter: ({ operatingTime }) => dayjs(operatingTime).format('YYYY-MM-DD HH:mm:ss'),
	},
];

// 修改用户信息规则校验
export const rules = reactive<FormRules<any>>({
	username: [{ required: true, message: '昵称必填', trigger: 'blur' }],
	nickName: [{ required: true, message: '昵称必填', trigger: 'blur' }],
	email: [{ required: true, message: '昵称必填', trigger: 'blur' }],
});

// tab栏内容
export const panes = [
	{
		key: 'profile',
		label: '个人信息',
		icon: ProfileIcon,
		component: Profile,
	},
	{
		key: 'securityLog',
		label: '安全日志',
		icon: SecurityLogIcon,
		component: SecurityLog,
	},
	{
		key: 'accountManagement',
		label: '账户管理',
		icon: AccountManagementIcon,
		component: AccountManagement,
	},
];
