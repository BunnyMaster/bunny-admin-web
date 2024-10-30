import { reactive, ref } from 'vue';
import { $t } from '@/plugins/i18n';

export const editMap = ref({});

export const columns: TableColumnList = [
	{ type: 'index', index: (index: number) => index + 1, label: '序号', width: 60 },
	{ label: $t('i18n_typeName'), prop: 'typeName' },
	{ label: $t('i18n_summary'), prop: 'summary' },
	{ label: $t('isDefault'), prop: 'isDefault', slot: 'isDefault' },
	{ label: $t('table.updateTime'), prop: 'updateTime' },
	{ label: $t('table.createTime'), prop: 'createTime' },
	{ label: $t('table.createUser'), prop: 'createUser', slot: 'createUser', width: 130 },
	{ label: $t('table.updateUser'), prop: 'updateUser', slot: 'updateUser', width: 130 },
	{ label: $t('table.operation'), fixed: 'right', width: 210, slot: 'operation' },
];

// 添加规则
export const rules = reactive({
	typeName: [{ required: true, message: `${$t('input')}${$t('i18n_typeName')}`, trigger: 'blur' }],
	summary: [{ required: true, message: `${$t('input')}${$t('i18n_summary')}`, trigger: 'blur' }],
});
