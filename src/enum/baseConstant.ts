import type { Option } from '@/types/enum/options';

/**
 * * 是否默认
 */
export const isDefaultOptions: Option[] = [
	{ value: true, label: '是' },
	{ value: false, label: '否' },
];

/**
 * * 是否显示
 */
export const isDefaultVisibleOptions: Option[] = [
	{ value: true, label: '显示' },
	{ value: false, label: '不显示' },
];

/**
 * * 性别
 */
export const sexConstant: Option[] = [
	{ value: 1, label: '男' },
	{ value: 0, label: '女' },
];

/**
 * * 分页默认数组个数
 */
export const pageSizes: number[] = [15, 30, 50, 100, 150, 200, 300];
