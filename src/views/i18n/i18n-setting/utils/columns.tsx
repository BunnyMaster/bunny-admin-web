// 多语言表格列字段
import { reactive } from 'vue';
import type { FormRules } from 'element-plus';
import { $t } from '@/plugins/i18n';

export const columns: TableColumnList = [
	{ type: 'index', index: (index: number) => index + 1 },
	{ type: 'selection', align: 'left' },
	{ label: $t('id'), prop: 'id' },
	{ label: $t('i18n.keyName'), prop: 'keyName' },
	{ label: $t('i18n.translation'), prop: 'translation' },
	{ label: $t('i18n.typeName'), prop: 'typeName' },
	{ label: $t('table.updateTime'), prop: 'updateTime', sortable: true },
	{ label: $t('table.createTime'), prop: 'createTime', sortable: true },
	{ label: $t('table.createUser'), prop: 'createUser', slot: 'createUser' },
	{ label: $t('table.updateUser'), prop: 'updateUser', slot: 'updateUser' },
	{ label: $t('table.operation'), fixed: 'right', width: 210, slot: 'operation' },
];

// 添加多语言表单规则
export const rules = reactive<FormRules>({
	keyName: [{ required: true, message: `${$t('input')}${$t('i18n.keyName')}`, trigger: 'blur' }],
	translation: [{ required: true, message: `${$t('input')}${$t('i18n.translation')}`, trigger: 'blur' }],
	typeName: [{ required: true, message: `${$t('input')}${$t('i18n.typeName')}`, trigger: 'blur' }],
});
