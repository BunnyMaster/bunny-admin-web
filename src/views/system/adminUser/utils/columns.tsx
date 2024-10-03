import { reactive } from 'vue';
import { $t } from '@/plugins/i18n';

// 表格列
export const columns: TableColumnList = [
	{ type: 'index', index: (index: number) => index + 1 },
	// 主键
	{ label: $t('id'), prop: 'id' },
	// 用户名
	{ label: $t('adminUser_username'), prop: 'username', width: 260 },
	// 状态
	{ label: $t('adminUser_status'), prop: 'status', slot: 'status' },
	// 昵称
	{ label: $t('adminUser_nickName'), prop: 'nickName', width: 260 },
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
	{ label: $t('table.updateTime'), prop: 'updateTime', sortable: true, width: 160, fixed: 'right' },
	{ label: $t('table.createTime'), prop: 'createTime', sortable: true, width: 160, fixed: 'right' },
	{ label: $t('table.createUser'), prop: 'createUser', slot: 'createUser', width: 90, fixed: 'right' },
	{ label: $t('table.updateUser'), prop: 'updateUser', slot: 'updateUser', width: 90, fixed: 'right' },
	{ label: $t('table.operation'), fixed: 'right', width: 210, slot: 'operation' },
];

// 添加规则
export const rules = reactive({
	// 用户名
	username: [{ required: true, message: `${$t('input')}${$t('adminUser_username')}`, trigger: 'blur' }],
	// 昵称
	nickName: [{ required: true, message: `${$t('input')}${$t('adminUser_nickName')}`, trigger: 'blur' }],
	// 邮箱
	email: [{ required: true, message: `${$t('input')}${$t('adminUser_email')}`, trigger: 'blur' }],
	// 手机号
	phone: [{ required: true, message: `${$t('input')}${$t('adminUser_phone')}`, trigger: 'blur' }],
	// 密码
	password: [{ required: true, message: `${$t('input')}${$t('adminUser_password')}`, trigger: 'blur' }],
	// 头像
	avatar: [{ required: true, message: `${$t('input')}${$t('adminUser_avatar')}`, trigger: 'blur' }],
	// 性别
	sex: [{ required: true, message: `${$t('input')}${$t('adminUser_sex')}`, trigger: 'blur' }],
	// 个人描述
	summary: [{ required: true, message: `${$t('input')}${$t('adminUser_summary')}`, trigger: 'blur' }],
	// 状态
	status: [{ required: true, message: `${$t('input')}${$t('adminUser_status')}`, trigger: 'blur' }],
});