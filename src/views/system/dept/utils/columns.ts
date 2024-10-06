import { reactive } from 'vue';
import { $t } from '@/plugins/i18n';

// 表格列
export const columns: TableColumnList = [
	{ type: 'selection', align: 'left' },
	{ type: 'index', index: (index: number) => index + 1, label: '序号', width: 60 },
	{ label: $t('id'), prop: 'id', width: 250 },
	// 部门名称
	{ label: $t('dept_deptName'), prop: 'deptName', width: 160 },
	// 管理者
	{ label: $t('dept_manager'), prop: 'manager', width: 200 },
	// 部门简介
	{ label: $t('dept_summary'), prop: 'summary', width: 360 },
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

// 部门级联选择器
export const deptSelector = {
	value: 'id',
	label: 'deptName',
	emitPath: false,
	checkStrictly: true,
};
