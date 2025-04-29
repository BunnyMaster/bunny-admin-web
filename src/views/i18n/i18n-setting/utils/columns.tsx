// 多语言表格列字段
import { $t } from '@/plugins/i18n';
import type { FormRules } from 'element-plus';
import { reactive } from 'vue';

export const columns: TableColumnList = [
  { type: 'selection', align: 'left' },
  {
    type: 'index',
    index: (index: number) => index + 1,
    label: '序号',
    width: 60,
  },
  { label: $t('i18n.keyName'), prop: 'keyName' },
  { label: $t('i18n.translation'), prop: 'translation' },
  { label: $t('i18n.typeName'), prop: 'typeName' },
  { label: $t('table.updateTime'), prop: 'updateTime', sortable: true },
  { label: $t('table.createTime'), prop: 'createTime', sortable: true },
  {
    label: $t('table.createUser'),
    prop: 'createUser',
    slot: 'createUser',
    width: 130,
  },
  {
    label: $t('table.updateUser'),
    prop: 'updateUser',
    slot: 'updateUser',
    width: 130,
  },
  {
    label: $t('table.operation'),
    fixed: 'right',
    width: 210,
    slot: 'operation',
  },
];

// 添加多语言表单规则
export const rules = reactive<FormRules>({
  keyName: [
    {
      required: true,
      message: `${$t('input')}${$t('i18n.keyName')}`,
      trigger: 'blur',
    },
  ],
  translation: [
    {
      required: true,
      message: `${$t('input')}${$t('i18n.translation')}`,
      trigger: 'blur',
    },
  ],
  typeName: [
    {
      required: true,
      message: `${$t('input')}${$t('i18n.typeName')}`,
      trigger: 'blur',
    },
  ],
});
