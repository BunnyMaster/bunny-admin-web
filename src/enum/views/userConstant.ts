import type { Option } from '@/types/enum/options';

/**
 * * 布局方式
 */
export const layoutConstant: Option[] = [
	{ value: 'ltr', label: '从左到右' },
	{ value: 'rtl', label: '从右到左' },
];

/**
 * * 文章显示模式
 */
export const articleModeConstant: Option[] = [
	{ value: 'album', label: '相册模式' },
	{ value: 'list', label: '列表模式' },
];

/**
 * * 默认状态
 */
export const userStatus: Option[] = [
	{ value: 0, label: '启用' },
	{ value: 1, label: '禁用' },
];
