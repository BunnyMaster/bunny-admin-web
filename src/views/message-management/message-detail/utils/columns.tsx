import { $t } from '@/plugins/i18n';

// 表格列
export const columns: TableColumnList = [
	{ type: 'selection', align: 'left' },
	{ label: $t('title'), prop: 'title', slot: 'title' },
	{ label: $t('table.acceptanceTime'), prop: 'acceptanceTime', sortable: true },
	{ label: $t('extra'), prop: 'extra' },
];
