import { reactive } from 'vue';
import { $t } from '@/plugins/i18n';

// 表格列
export const columns: TableColumnList = [
	{ type: 'index', index: (index: number) => index + 1 },
	// { type: 'selection', align: 'left' },
	{ label: $t('id'), prop: 'id' },
	// 父级id
	{ label: $t('power_parentId'), prop: 'parentId' },
	// 权限编码
	{ label: $t('power_powerCode'), prop: 'powerCode' },
	// 权限名称
	{ label: $t('power_powerName'), prop: 'powerName' },
	// 请求路径
	{ label: $t('power_requestUrl'), prop: 'requestUrl' },
	{ label: $t('table.updateTime'), prop: 'updateTime', sortable: true },
	{ label: $t('table.createTime'), prop: 'createTime', sortable: true },
	{ label: $t('table.createUser'), prop: 'createUser', slot: 'createUser', width: 90 },
	{ label: $t('table.updateUser'), prop: 'updateUser', slot: 'updateUser', width: 90 },
	{ label: $t('table.operation'), fixed: 'right', width: 210, slot: 'operation' },
];

// 添加规则
export const rules = reactive({
	// 权限编码
	powerCode: [{ required: true, message: `${$t('input')}${$t('power_powerCode')}`, trigger: 'blur' }],
	// 权限名称
	powerName: [{ required: true, message: `${$t('input')}${$t('power_powerName')}`, trigger: 'blur' }],
	// 请求路径
	requestUrl: [{ required: true, message: `${$t('input')}${$t('power_requestUrl')}`, trigger: 'blur' }],
});