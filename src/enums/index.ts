import type { OptionsType } from '@/components/Segmented';

export const menuTypeOptions: Array<OptionsType> = [
	{ label: '菜单', value: 0 },
	{ label: 'iframe', value: 1 },
	{ label: '外链', value: 2 },
];

export const frameSureOptions: Array<OptionsType> = [
	{ label: '是', tip: '有首次加载动画', value: true },
	{ label: '否', tip: '无首次加载动画', value: false },
];
