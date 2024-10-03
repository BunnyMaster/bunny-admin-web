import { reactive } from 'vue';
import { $t } from '@/plugins/i18n';

// 表格列
export const columns: TableColumnList = [
	{ type: 'index', index: (index: number) => index + 1 },
	{ type: 'selection', align: 'left' },
	{ label: $t('id'), prop: 'id' },
	// icon 名称
	{ label: $t('menuIcon_iconName'), prop: 'iconName', slot: 'iconName' },
	{ label: $t('table.updateTime'), prop: 'updateTime', sortable: true },
	{ label: $t('table.createTime'), prop: 'createTime', sortable: true },
	{ label: $t('table.createUser'), prop: 'createUser', slot: 'createUser', width: 90 },
	{ label: $t('table.updateUser'), prop: 'updateUser', slot: 'updateUser', width: 90 },
	{ label: $t('table.operation'), fixed: 'right', width: 210, slot: 'operation' },
];

// 添加规则
export const rules = reactive({
	// icon 名称
	iconName: [{ required: true, message: `${$t('input')}${$t('menuIcon_iconName')}`, trigger: 'blur' }],
});
