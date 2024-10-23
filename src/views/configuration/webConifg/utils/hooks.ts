import { fetchPlatformConfig } from '@/api/v1/system';
import { ref } from 'vue';

export const form = ref({
	version: '', // 应用程序的版本
	title: '', // 应用程序的标题
	copyright: '', // 版权信息
	fixedHeader: false, // 头部是否固定
	hiddenSideBar: false, // 侧边栏是否隐藏
	multiTagsCache: false, // 是否缓存多个标签
	keepAlive: false, // 是否持久化
	locale: '', // 语言类型
	layout: '', // 应用程序的布局
	theme: '', // 应用程序的主题
	darkMode: false, // 是否启用深色模式
	overallStyle: '', // 应用程序的整体样式
	grey: false, // 是否启用灰色模式
	weak: false, // 色弱模式
	hideTabs: false, // 是否隐藏选项卡
	hideFooter: false, // 是否隐藏页脚
	stretch: false, // 是否拉伸显示
	sidebarStatus: false, // 侧边栏的状态
	epThemeColor: '', // 主题颜色
	showLogo: false, // 是否显示logo
	showModel: '', // 要显示的模型
	menuArrowIconNoTransition: false, // 菜单箭头图标是否没有过渡效果
	cachingAsyncRoutes: false, // 是否缓存异步路由
	tooltipEffect: '', // 工具提示的效果
	responsiveStorageNameSpace: '', // 响应式存储的命名空间
	menuSearchHistory: 0, // 菜单搜索历史
});

/** 获取前端配置文件 */
export const onSearch = async () => {
	const result = await fetchPlatformConfig();
	console.log(result);
	form.value = result;
};
