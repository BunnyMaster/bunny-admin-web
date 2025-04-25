import { $t } from '@/plugins/i18n';
import { reactive } from 'vue';

// 表格列
export const columns: TableColumnList = [
  { type: 'selection', align: 'left' },
  { type: 'index', index: (index: number) => index + 1, label: '序号', width: 60 },
  // icon 类名
  { label: $t('menuIcon_iconCode'), prop: 'iconCode', slot: 'iconCode' },
  // icon 名称
  { label: $t('menuIcon_iconName'), prop: 'iconName', slot: 'iconName' },
  { label: $t('table.updateTime'), prop: 'updateTime', sortable: true },
  { label: $t('table.createTime'), prop: 'createTime', sortable: true },
  { label: $t('table.createUser'), prop: 'createUser', slot: 'createUser', width: 130 },
  { label: $t('table.updateUser'), prop: 'updateUser', slot: 'updateUser', width: 130 },
  { label: $t('table.operation'), fixed: 'right', width: 160, slot: 'operation' },
];

// 添加规则
export const rules = reactive({
  // icon 类名
  iconCode: [{ required: true, message: `${$t('input')}${$t('menuIcon_iconCode')}`, trigger: 'blur' }],
  // icon 名称
  iconName: [{ required: true, message: `${$t('input')}${$t('menuIcon_iconName')}`, trigger: 'blur' }],
});
