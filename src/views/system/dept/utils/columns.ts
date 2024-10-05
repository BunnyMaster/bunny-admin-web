import { reactive } from 'vue';
import { $t } from '@/plugins/i18n';

// 表格列
export const columns: TableColumnList = [
	{ type: 'index', index: (index: number) => index + 1 },
	{ type: 'selection', align: 'left' },
	{ label: $t('id'), prop: 'id' },
	// 父级id
	{ label: $t('dept_parentId'), prop: 'parentId' },
	// 管理者id
	{ label: $t('dept_managerId'), prop: 'managerId' },
	// 部门名称
	{ label: $t('dept_deptName'), prop: 'deptName' },
	// 部门简介
	{ label: $t('dept_summary'), prop: 'summary' },
	{ label: $t('table.updateTime'), prop: 'updateTime', sortable: true, width: 160 },
	{ label: $t('table.createTime'), prop: 'createTime', sortable: true, width: 160 },
	{ label: $t('table.createUser'), prop: 'createUser', slot: 'createUser', width: 90 },
	{ label: $t('table.updateUser'), prop: 'updateUser', slot: 'updateUser', width: 90 },
	{ label: $t('table.operation'), fixed: 'right', width: 210, slot: 'operation' },
];

// 添加规则
export const rules = reactive({
	// 部门名称
	deptName: [{ required: true, message: `${$t('input')}${$t('dept_deptName')}`, trigger: 'blur' }],
	// 部门简介
	summary: [{ required: true, message: `${$t('input')}${$t('dept_summary')}`, trigger: 'blur' }],
});
