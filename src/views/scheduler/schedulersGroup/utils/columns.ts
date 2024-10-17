import { reactive } from 'vue';
import { $t } from '@/plugins/i18n';

// 表格列
export const columns: TableColumnList = [
	{ type: 'selection', align: 'left' },
	{ type: 'index', index: (index: number) => index + 1, label: '序号', width: 60 },
	// 分组名称
	{ label: $t('schedulersGroup_groupName'), prop: 'groupName' },
	// 分组详情
	{ label: $t('schedulersGroup_description'), prop: 'description' },
	{ label: $t('table.updateTime'), prop: 'updateTime', sortable: true, width: 160 },
	{ label: $t('table.createTime'), prop: 'createTime', sortable: true, width: 160 },
	{ label: $t('table.createUser'), prop: 'createUser', slot: 'createUser', width: 90 },
	{ label: $t('table.updateUser'), prop: 'updateUser', slot: 'updateUser', width: 90 },
	{ label: $t('table.operation'), fixed: 'right', width: 210, slot: 'operation' },
];

// 添加规则
export const rules = reactive({
	// 分组名称
	groupName: [{ required: true, message: `${$t('input')}${$t('schedulersGroup_groupName')}`, trigger: 'blur' }],
	// 分组详情
	description: [{ required: true, message: `${$t('input')}${$t('schedulersGroup_description')}`, trigger: 'blur' }],
});
