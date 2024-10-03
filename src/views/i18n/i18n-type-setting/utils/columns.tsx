import { reactive, ref } from 'vue';
import { $t } from '@/plugins/i18n';

export const editMap = ref({});

export const columns: TableColumnList = [
	{ label: $t('id'), prop: 'id' },
	{ label: $t('i18n_typeName'), prop: 'typeName' },
	{ label: $t('i18n_summary'), prop: 'summary' },
	{ label: $t('isDefault'), prop: 'isDefault', slot: 'isDefault' },
	{ label: $t('table.updateTime'), prop: 'updateTime' },
	{ label: $t('table.createTime'), prop: 'createTime' },
	{ label: $t('table.createUser'), prop: 'createUser', slot: 'createUser', width: 90 },
	{ label: $t('table.updateUser'), prop: 'updateUser', slot: 'updateUser', width: 90 },
	{ label: $t('table.operation'), fixed: 'right', width: 210, slot: 'operation' },
];

// 添加规则
export const rules = reactive({
	typeName: [{ required: true, message: `${$t('input')}${$t('i18n_typeName')}`, trigger: 'blur' }],
	summary: [{ required: true, message: `${$t('input')}${$t('i18n_summary')}`, trigger: 'blur' }],
});
