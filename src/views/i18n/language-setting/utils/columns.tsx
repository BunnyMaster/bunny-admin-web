// 多语言表格列字段
import { reactive } from 'vue';
import type { FormRules } from 'element-plus';
import { $t } from '@/plugins/i18n';

export const columns: TableColumnList = [
	{ type: 'selection' },
	{ type: 'index', label: $t('table.tableNumber'), width: 100 },
	{ label: $t('i18n.keyName'), prop: 'keyName' },
	{ label: $t('i18n.translate'), prop: 'translate' },
	{ label: $t('i18n.languageSummary'), prop: 'languageSummary' },
	{ label: $t('i18n.languageName'), prop: 'languageName' },
	{ label: $t('i18n.parentKeyName'), prop: 'parentKeyName' },
	{ label: $t('table.operation'), prop: 'operation', slot: 'operation' },
];

// 添加多语言表单规则
export const rules = reactive<FormRules>({
	languageId: [{ required: true, message: '选择添加语言分类', trigger: 'blur' }],
	keyName: [{ required: true, message: '输入多语言key', trigger: 'blur' }],
	translate: [{ required: true, message: '输入多语言翻译', trigger: 'blur' }],
});
