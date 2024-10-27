import { computed, reactive, ref } from 'vue';
import { $t } from '@/plugins/i18n';

// 是否是更新用户信息
export const isAddUserinfo = ref(false);

// 表格列
export const columns: TableColumnList = [
	{ type: 'selection', align: 'left' },
	{ type: 'index', index: (index: number) => index + 1, label: '序号', width: 60 },
	// 用户名
	{ label: $t('adminUser_username'), prop: 'username', width: 260 },
	// 状态
	{ label: $t('adminUser_status'), prop: 'status', slot: 'status' },
	// 昵称
	{ label: $t('adminUser_nickname'), prop: 'nickname', width: 260 },
	// 邮箱
	{ label: $t('adminUser_email'), prop: 'email', width: 260 },
	// 手机号
	{ label: $t('adminUser_phone'), prop: 'phone', width: 160 },
	// 头像
	{ label: $t('adminUser_avatar'), prop: 'avatar', slot: 'avatar' },
	// 性别
	{ label: $t('adminUser_sex'), prop: 'sex', slot: 'sex' },
	// 个人描述
	{ label: $t('adminUser_summary'), prop: 'summary', width: 460 },
	// 登录的IP地址
	{ label: $t('lastLoginIp'), prop: 'ipAddress', width: 130 },
	// IP地区
	{ label: $t('lastLoginIpAddress'), prop: 'ipRegion', width: 130 },
	{ label: $t('table.updateTime'), prop: 'updateTime', sortable: true, width: 160 },
	{ label: $t('table.createTime'), prop: 'createTime', sortable: true, width: 160 },
	{ label: $t('table.updateUser'), prop: 'updateUser', slot: 'updateUser', width: 90, fixed: 'right' },
	{ label: $t('table.createUser'), prop: 'createUser', slot: 'createUser', width: 90, fixed: 'right' },
	{ label: $t('table.operation'), fixed: 'right', width: 210, slot: 'operation' },
];

// 添加规则
export const rules: any = reactive({
	// 用户名
	username: [{ required: true, message: `${$t('input')}${$t('adminUser_username')}`, trigger: 'blur' }],
	// 密码
	password: [{ required: isAddUserinfo, message: `${$t('input')}${$t('adminUser_password')}`, trigger: 'blur' }],
	// 邮箱
	email: [
		{ required: true, message: `${$t('input')}${$t('adminUser_email')}`, trigger: 'blur' },
		{ type: 'email', message: `${$t('input')}${$t('adminUser_email')}${$t('format_error')}` },
	],
	// 状态
	status: [{ required: true, message: `${$t('input')}${$t('adminUser_status')}`, trigger: 'blur' }],
	// 部门
	deptId: [{ required: true, message: `${$t('input')}${$t('adminUser_dept')}`, trigger: 'blur' }],
});

export const defaultProps = { children: 'children', value: 'id', label: 'deptName' };

export const buttonClass = computed(() => ['!h-[20px]', '!text-sm', 'reset-margin', '!text-[var(--el-text-color-regular)]', 'dark:!text-white', 'dark:hover:!text-primary']);
