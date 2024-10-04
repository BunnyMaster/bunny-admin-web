// ? 表单选项
import type { Option } from '../../types/enum/options';

/**
 * * 默认状态
 */
export const defaultStatus: Option[] = [
	{ value: '', label: '' },
	{ value: 1, label: '启用' },
	{ value: 0, label: '禁用' },
];

/**
 * * 是否错误
 */
export const isErrorStatus: Option[] = [
	{ value: '', label: '' },
	{ value: false, label: '未出错' },
	{ value: true, label: '错误' },
];

/**
 * * 默认状态
 */
export const statusConstant: Option[] = [
	{ value: '', label: '' },
	{ value: 1, label: '是' },
	{ value: 0, label: '否' },
];
