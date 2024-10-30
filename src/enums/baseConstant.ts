import { computed } from 'vue';

/**
 * * 是否默认
 */
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

/**
 * * 分页默认数组个数
 */
export const pageSizes: number[] = [15, 30, 50, 100, 150];
export const tableSelectButtonClass = computed(() => ['!h-[20px]', 'reset-margin', '!text-gray-500', 'dark:!text-white', 'dark:hover:!text-primary']);
