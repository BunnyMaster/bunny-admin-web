// 多语言表格列字段
import { reactive } from 'vue';
import type { FormRules } from 'element-plus';

export const columns: TableColumnList = [
	{ label: 'id', prop: 'id' },
	{ label: 'i18n_keyName', prop: 'keyName' },
	{ label: 'i18n_translation', prop: 'translation' },
	{ label: 'i18n_typeId', prop: 'typeId' },
	{ label: 'updateTime', prop: 'updateTime' },
	{ label: 'createTime', prop: 'createTime' },
	{ label: 'createUser', prop: 'createUser' },
	{ label: 'updateUser', prop: 'updateUser' },
	{ label: 'operation', fixed: 'right', width: 210, slot: 'operation' },
];

// 添加多语言表单规则
export const rules = reactive<FormRules>({
	keyName: [{ required: true, message: '输入多语言key', trigger: 'blur' }],
	translation: [{ required: true, message: '输入多语言翻译', trigger: 'blur' }],
	typeId: [{ required: true, message: '选择添加语言分类', trigger: 'blur' }],
});
