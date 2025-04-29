import { $t } from '@/plugins/i18n';
import { REGEXP_PWD } from '@/views/login/utils/rule';
import type { FormRules } from 'element-plus';
import { computed, reactive, ref } from 'vue';

// 是否是更新用户信息
export const isAddUserinfo = ref(false);

// 表格列
export const columns: TableColumnList = [
  { type: 'selection', align: 'left' },
  { type: 'index', index: (index: number) => index + 1, label: $t('index'), width: 60 },
  // 用户名
  { label: $t('adminUser_username'), prop: 'username' },
  // 状态
  { label: $t('adminUser_status'), prop: 'status', slot: 'status', width: 100 },
  // 昵称
  { label: $t('adminUser_nickname'), prop: 'nickname', width: 260 },
  // 邮箱
  { label: $t('adminUser_email'), prop: 'email', width: 260 },
  // 手机号
  { label: $t('adminUser_phone'), prop: 'phone', width: 160 },
  // 头像
  { label: $t('adminUser_avatar'), prop: 'avatar', slot: 'avatar', width: 90 },
  // 性别
  { label: $t('adminUser_sex'), prop: 'sex', slot: 'sex', width: 90 },
  // 个人描述
  { label: $t('adminUser_summary'), prop: 'summary', width: 460 },
  // 登录的IP地址
  { label: $t('lastLoginIp'), prop: 'ipAddress', width: 130 },
  // IP地区
  { label: $t('lastLoginIpAddress'), prop: 'ipRegion', width: 130 },
  { label: $t('table.updateTime'), prop: 'updateTime', sortable: true, width: 160 },
  { label: $t('table.createTime'), prop: 'createTime', sortable: true, width: 160 },
  { label: $t('table.createUser'), prop: 'createUser', slot: 'createUser', width: 130 },
  { label: $t('table.updateUser'), prop: 'updateUser', slot: 'updateUser', width: 130 },
  { label: $t('table.operation'), fixed: 'right', width: 220, slot: 'operation' },
];

// 添加规则
export const rules: any = reactive<FormRules>({
  // 用户名
  username: [{ required: true, message: `${$t('input')}${$t('adminUser_username')}`, trigger: 'blur' }],
  // 密码
  password: [
    {
      required: isAddUserinfo.value,
      message: `${$t('input')}${$t('adminUser_password')}`,
      trigger: 'blur',
    },
    {
      type: 'pattern',
      message: $t('login.purePassWordRuleReg'),
      trigger: ['change', 'blur'],
      pattern: REGEXP_PWD,
    },
  ],
  // 邮箱
  email: [
    { required: true, message: `${$t('input')}${$t('adminUser_email')}`, trigger: ['change', 'blur'] },
    {
      type: 'email',
      message: `${$t('input')}${$t('adminUser_email')}${$t('format_error')}`,
      trigger: ['change', 'blur'],
    },
  ],
  // 手机号
  phone: [
    {
      type: 'pattern',
      message: `${$t('input')}${$t('adminUser_phone')}${$t('format_error')}`,
      trigger: ['change', 'blur'],
      pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
    },
  ],
  // 状态
  status: [{ required: true, message: `${$t('input')}${$t('adminUser_status')}`, trigger: 'blur' }],
  // 部门
  deptId: [{ required: true, message: `${$t('input')}${$t('adminUser_dept')}`, trigger: 'blur' }],
});

export const defaultProps = { children: 'children', value: 'id', label: 'deptName' };

export const buttonClass = computed(() => [
  '!h-[20px]',
  '!text-sm',
  'reset-margin',
  '!text-[var(--el-text-color-regular)]',
  'dark:!text-white',
  'dark:hover:!text-primary',
]);
