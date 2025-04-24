import { computed } from 'vue';
import { $t } from '@/plugins/i18n';

/** 是否默认 */
export const isDefaultOptions = [
  { value: true, label: '是' },
  { value: false, label: '否' },
];

/** 是否显示 */
export const isDefaultVisibleOptions = [
  { value: true, label: '显示' },
  { value: false, label: '不显示' },
];

/** 性别 */
export const sexConstant = [
  { value: 1, label: '男' },
  { value: 0, label: '女' },
];

/** 默认状态 */
export const userStatus = [
  { value: 0, label: '启用' },
  { value: 1, label: '禁用' },
];

/** 是否启用状态 */
export const enabledOrNotStatus = [
  { value: true, label: '启用' },
  { value: false, label: '禁用' },
];

/** 是否已读 */
export const isReadStatus = [
  { value: '', label: $t('all') },
  { value: 'true', label: $t('readAlready') },
  { value: 'false', label: $t('unread') },
];

/** 分页默认数组个数 */
export const pageSizes: number[] = [15, 30, 50, 100, 150];
export const tableSelectButtonClass = computed(() => [
  '!h-[20px]',
  'reset-margin',
  '!text-gray-500',
  'dark:!text-white',
  'dark:hover:!text-primary',
]);
// export const UserAvatar = 'http://116.196.101.14:9000/auth-admin/avatar/user.jpg';
export const UserAvatar =
  'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoj0hHXhgJNOTSOFsS4uZs8x1ConecaVOB8eIl115xmJZcT4oCicvia7wMEufibKtTLqiaJeanU2Lpg3w/132';
