import { reactive } from 'vue';
import { $t } from '@/plugins/i18n';
import type { FormRules } from 'element-plus';

// 表格列
export const columns: TableColumnList = [
  { type: 'selection', align: 'left' },
  { type: 'index', index: (index: number) => index + 1, label: '序号', width: 60 },
  // 是否启用
  { label: $t('status'), prop: 'status', slot: 'status' },
  // 消息名称
  { label: $t('messageName'), prop: 'messageName' },
  // 消息类型
  { label: $t('messageType'), prop: 'messageType' },
  // 消息备注
  { label: $t('summary'), prop: 'summary' },
  { label: $t('table.updateTime'), prop: 'updateTime', sortable: true, width: 160 },
  { label: $t('table.createTime'), prop: 'createTime', sortable: true, width: 160 },
  { label: $t('table.createUser'), prop: 'createUser', slot: 'createUser', width: 130 },
  { label: $t('table.updateUser'), prop: 'updateUser', slot: 'updateUser', width: 130 },
  { label: $t('table.operation'), fixed: 'right', width: 210, slot: 'operation' },
];

// 添加规则
export const rules = reactive<FormRules>({
  // 消息名称
  messageName: [{ required: true, message: `${$t('input')}${$t('messageName')}`, trigger: 'blur' }],
  // 消息类型
  messageType: [
    {
      required: true,
      message: `${$t('input')}${$t('messageType')}`,
      trigger: 'blur',
    },
    { pattern: /^[a-z]+$/i, message: `${$t('inputRuleMustBeEnglish')}`, trigger: ['blur', 'change'] },
  ],
});
