import { $t } from '@/plugins/i18n';

export const columns: TableColumnList = [
  {
    type: 'index',
    index: (index: number) => index + 1,
    label: $t('index'),
    width: 60,
  },
  { label: $t('adminUser_nickname'), prop: 'nickname', minWidth: 120 },
  { label: $t('adminUser_username'), prop: 'username', slot: 'username', minWidth: 120 },
  { label: $t('adminUser_email'), prop: 'email', minWidth: 120 },
  { label: $t('adminUser_phone'), prop: 'phone', minWidth: 120 },
  // 性别
  { label: $t('adminUser_sex'), prop: 'sex', slot: 'sex', width: 90 },
  { label: $t('adminUser_summary'), prop: 'personDescription', minWidth: 150 },
  {
    label: $t('table.operation'),
    fixed: 'right',
    width: 120,
    slot: 'operation',
  },
];
