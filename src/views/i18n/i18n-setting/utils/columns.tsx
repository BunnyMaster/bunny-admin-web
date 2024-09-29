// 多语言表格列字段
import { reactive } from 'vue';
import type { FormRules } from 'element-plus';

export const columns: TableColumnList = [
	// { type: 'selection' },
	// { type: 'index', label: 'table.tableNumber', width: 100 },
	{ label: 'i18n.keyName', prop: 'keyName' },
	{ label: 'i18n.translate', prop: 'translate' },
	{ label: 'i18n.languageSummary', prop: 'languageSummary' },
	{ label: 'i18n.languageName', prop: 'languageName' },
	{ label: 'i18n.parentKeyName', prop: 'parentKeyName' },
	{ label: 'table.operation', prop: 'operation', slot: 'operation' },
];

// 添加多语言表单规则
export const rules = reactive<FormRules>({
	languageId: [{ required: true, message: '选择添加语言分类', trigger: 'blur' }],
	keyName: [{ required: true, message: '输入多语言key', trigger: 'blur' }],
	translate: [{ required: true, message: '输入多语言翻译', trigger: 'blur' }],
});
