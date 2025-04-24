// 添加规则
import { reactive } from 'vue';
import { $t } from '@/plugins/i18n';

export const rules = reactive({
  // 应用程序的版本
  version: [{ required: true, message: `${$t('input')}${$t('version')}`, trigger: 'blur' }],
  // 应用程序的版本
  locale: [{ required: true, message: `${$t('input')}${$t('appLocale')}`, trigger: 'blur' }],
  // 应用程序的标题
  title: [{ required: true, message: `${$t('input')}${$t('appTitle')}`, trigger: 'blur' }],
  // 头部是否固定
  fixedHeader: [{ required: true, message: `${$t('input')}${$t('fixedHeader')}`, trigger: 'blur' }],
  // 是否缓存多个标签
  multiTagsCache: [{ required: true, message: `${$t('input')}${$t('multiTagsCache')}`, trigger: 'blur' }],
  // 应用程序的标题
  copyright: [{ required: true, message: `${$t('input')}${$t('copyright')}`, trigger: 'blur' }],
  // 应用程序的主题
  theme: [{ required: true, message: `${$t('input')}${$t('theme')}`, trigger: 'blur' }],
  // 应用程序的整体样式
  overallStyle: [{ required: true, message: `${$t('input')}${$t('overallStyle')}`, trigger: 'blur' }],
  // 色弱模式
  weak: [{ required: true, message: `${$t('input')}${$t('weakStyle')}`, trigger: 'blur' }],
  // 是否隐藏页脚
  hideFooter: [{ required: true, message: `${$t('input')}${$t('hideFooter')}`, trigger: 'blur' }],
  // 侧边栏的状态
  sidebarStatus: [{ required: true, message: `${$t('input')}${$t('sidebarStatus')}`, trigger: 'blur' }],
  // 是否显示logo
  showLogo: [{ required: true, message: `${$t('input')}${$t('showLogo')}`, trigger: 'blur' }],
  // 菜单箭头图标是否没有过渡效果
  menuArrowIconNoTransition: [
    {
      required: true,
      message: `${$t('input')}${$t('menuArrowIconNoTransition')}`,
      trigger: 'blur',
    },
  ],
  // 工具提示的效果
  tooltipEffect: [{ required: true, message: `${$t('input')}${$t('tooltipEffect')}`, trigger: 'blur' }],
  // 版权信息
  hiddenSideBar: [{ required: true, message: `${$t('input')}${$t('hiddenSideBar')}`, trigger: 'blur' }],
  // 头部是否固定
  keepAlive: [{ required: true, message: `${$t('input')}${$t('keepAlive')}`, trigger: 'blur' }],
  // 侧边栏是否隐藏
  layout: [{ required: true, message: `${$t('input')}${$t('layout')}`, trigger: 'blur' }],
  // 是否缓存多个标签
  darkMode: [{ required: true, message: `${$t('input')}${$t('darkMode')}`, trigger: 'blur' }],
  // 是否持久化
  grey: [{ required: true, message: `${$t('input')}${$t('greyStyle')}`, trigger: 'blur' }],
  // 语言类型
  hideTabs: [{ required: true, message: `${$t('input')}${$t('hideTabs')}`, trigger: 'blur' }],
  // 应用程序的布局
  stretch: [{ required: true, message: `${$t('input')}${$t('stretch')}`, trigger: 'blur' }],
  // 应用程序的主题
  epThemeColor: [{ required: true, message: `${$t('input')}${$t('epThemeColor')}`, trigger: 'blur' }],
  // 是否启用深色模式
  showModel: [{ required: true, message: `${$t('input')}${$t('showModel')}`, trigger: 'blur' }],
  // 应用程序的整体样式
  cachingAsyncRoutes: [{ required: true, message: `${$t('input')}${$t('cachingAsyncRoutes')}`, trigger: 'blur' }],
  // 是否启用灰色模式
  responsiveStorageNameSpace: [
    {
      required: true,
      message: `${$t('input')}${$t('responsiveStorageNameSpace')}`,
      trigger: 'blur',
    },
  ],
  // 菜单搜索历史
  menuSearchHistory: [{ required: true, message: `${$t('input')}${$t('menuSearchHistory')}`, trigger: 'blur' }],
});
