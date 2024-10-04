import type { Option } from '@/types/enum/options';

/**
 * * 用户反馈
 */
export const feedback: Option[] = [
	{ value: '', label: '' },
	{ value: 1, label: '已处理' },
	{ value: 0, label: '未处理' },
	{ value: -1, label: '其它问题' },
];

/**
 * * 反馈类型选择
 */
export const feedbackTypeOptions: Option[] = [
	{ label: '优化建议', value: '优化建议' },
	{ label: 'bug反馈', value: 'bug反馈' },
	{ label: '新增功能建议', value: '新增功能建议' },
	{ label: '其它', value: '其它' },
];
