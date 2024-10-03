import { reactive } from 'vue';
import { $t } from '@/plugins/i18n';

// 表格列
export const columns: TableColumnList = [
	{ type: 'index', index: (index: number) => index + 1 },
	// { type: 'selection', align: 'left' },
	{ label: $t('id'), prop: 'id' },
	// 角色代码
	{ label: $t('role_roleCode'), prop: 'roleCode' },
	// 描述
	{ label: $t('role_description'), prop: 'description' },
	{ label: $t('table.updateTime'), prop: 'updateTime', sortable: true },
	{ label: $t('table.createTime'), prop: 'createTime', sortable: true },
	{ label: $t('table.createUser'), prop: 'createUser', slot: 'createUser' },
	{ label: $t('table.updateUser'), prop: 'updateUser', slot: 'updateUser' },
	{ label: $t('table.operation'), fixed: 'right', width: 210, slot: 'operation' },
];

// 添加规则
export const rules = reactive({
	// 角色代码
	roleCode: [{ required: true, message: `${$t('input')}${$t('role_roleCode')}`, trigger: 'blur' }],
	// 描述
	description: [{ required: true, message: `${$t('input')}${$t('role_description')}`, trigger: 'blur' }],
});
