import { computed } from 'vue';
import { useEpThemeStoreHook } from '@/store/epTheme';

/**
 * * 表格头部样式
 */
export const cellHeaderStyle = () => ({
	background: 'var(--el-fill-color-light)',
	color: 'var(--el-text-color-primary)',
});

// * icon 样式
export const iconClass = () => 'text-black dark:text-white duration-100 hover:!text-primary cursor-pointer outline-none ';

// * 顶部样式
export const topClass = () => 'flex justify-between pt-[3px] px-[11px] border-b-[1px] border-solid border-[#dcdfe6] dark:border-[#303030]';

/**
 * * 拖拽列样式
 */
export const getDropdownItemStyle = computed(() => {
	return (size: string, s: string) => {
		return {
			background: s === size ? useEpThemeStoreHook().epThemeColor : '',
			color: s === size ? '#fff' : 'var(--el-text-color-primary)',
		};
	};
});
