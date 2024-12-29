import { reactive } from 'vue';
import { $t } from '@/plugins/i18n';
import type { FormRules } from 'element-plus';

// 表格列
export const columns: TableColumnList = [
	{ type: 'selection', align: 'left' },
	{ type: 'index', index: (index: number) => index + 1, label: $t('index'), minWidth: 60 },
	// 权限编码
	{ label: $t('power_powerCode'), prop: 'powerCode', minWidth: 350 },
	// 权限名称
	{ label: $t('power_powerName'), prop: 'powerName', minWidth: 320 },
	// 请求路径
	{ label: $t('power_requestUrl'), prop: 'requestUrl', minWidth: 360 },
	{ label: $t('table.updateTime'), prop: 'updateTime', sortable: true, minWidth: 160 },
	{ label: $t('table.createTime'), prop: 'createTime', sortable: true, minWidth: 160 },
	{ label: $t('table.createUser'), prop: 'createUser', slot: 'createUser', minWidth: 130 },
	{ label: $t('table.updateUser'), prop: 'updateUser', slot: 'updateUser', minWidth: 130 },
	{ label: $t('table.operation'), fixed: 'right', minWidth: 210, slot: 'operation' },
];

// 添加规则
export const rules = reactive<FormRules>({
	// 权限编码
	powerCode: [{ required: true, message: `${$t('input')}${$t('power_powerCode')}`, trigger: 'blur' }],
	// 权限名称
	powerName: [{ required: true, message: `${$t('input')}${$t('power_powerName')}`, trigger: 'blur' }],
	// 请求地址
	requestUrl: [{ type: 'pattern', message: $t('inputRequestUrlTip'), pattern: /^\/.*/, trigger: 'change' }],
});

// 权限树形结构props
export const powerCascadeProps = { value: 'id', label: 'powerName', emitPath: false, checkStrictly: true };
