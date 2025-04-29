import { $t } from '@/plugins/i18n';
import { reactive } from 'vue';

// 表格列
export const columns: TableColumnList = [
  { type: 'selection', align: 'left' },
  { type: 'index', index: (index: number) => index + 1, label: $t('index'), width: 60 },
  // 部门名称
  { label: $t('dept_deptName'), prop: 'deptName', width: 200 },
  // 管理者
  { label: $t('dept_manager'), prop: 'manager', width: 220 },
  // 部门简介
  { label: $t('dept_summary'), prop: 'summary', width: 360 },
  { label: $t('table.updateTime'), prop: 'updateTime', sortable: true, width: 160 },
  { label: $t('table.createTime'), prop: 'createTime', sortable: true, width: 160 },
  { label: $t('table.createUser'), prop: 'createUser', slot: 'createUser', width: 130 },
  { label: $t('table.updateUser'), prop: 'updateUser', slot: 'updateUser', width: 130 },
  { label: $t('table.operation'), fixed: 'right', width: 210, slot: 'operation' },
];

// 添加规则
export const rules = reactive({
  // 管理员
  manager: [{ required: true, message: `${$t('input')}${$t('dept_manager')}`, trigger: 'blur' }],
  // 部门名称
  deptName: [{ required: true, message: `${$t('input')}${$t('dept_deptName')}`, trigger: 'blur' }],
  // 部门简介
  summary: [{ required: true, message: `${$t('input')}${$t('dept_summary')}`, trigger: 'blur' }],
});

// 部门级联选择器
export const deptSelector = {
  value: 'id',
  label: 'deptName',
  emitPath: false,
  checkStrictly: true,
};
