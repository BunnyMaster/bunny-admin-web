import { ref } from 'vue';
import type { FormInstance } from 'element-plus';
import { fetchGetWebConfig, fetchUpdateWebConfiguration } from '@/api/v1/configuration';
import { message, messageBox } from '@/utils/message';
import { $t } from '@/plugins/i18n';

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
  const result = await fetchGetWebConfig();
  if (result.code !== 200) return;
  const data = result.data;

  form.value.version = data.Version;
  form.value.title = data.Title;
  form.value.copyright = data.Copyright;
  form.value.fixedHeader = data.FixedHeader;
  form.value.hiddenSideBar = data.HiddenSideBar;
  form.value.multiTagsCache = data.MultiTagsCache;
  form.value.keepAlive = data.KeepAlive;
  form.value.locale = data.Locale;
  form.value.layout = data.Layout;
  form.value.theme = data.Theme;
  form.value.darkMode = data.DarkMode;
  form.value.overallStyle = data.OverallStyle;
  form.value.grey = data.Grey;
  form.value.weak = data.Weak;
  form.value.hideTabs = data.HideTabs;
  form.value.hideFooter = data.HideFooter;
  form.value.stretch = data.Stretch;
  form.value.sidebarStatus = data.SidebarStatus;
  form.value.epThemeColor = data.EpThemeColor;
  form.value.showLogo = data.ShowLogo;
  form.value.showModel = data.ShowModel;
  form.value.menuArrowIconNoTransition = data.MenuArrowIconNoTransition;
  form.value.cachingAsyncRoutes = data.CachingAsyncRoutes;
  form.value.tooltipEffect = data.TooltipEffect;
  form.value.responsiveStorageNameSpace = data.ResponsiveStorageNameSpace;
  form.value.menuSearchHistory = data.MenuSearchHistory;
};

/** 提交表单 */
export const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid) => {
    if (valid) {
      // 是否确认修改弹窗内容
      const confirm = await messageBox({
        title: $t('confirmUpdateConfiguration'),
        showMessage: false,
        confirmMessage: undefined,
        cancelMessage: $t('cancel'),
      });
      if (!confirm) return;

      // 修改内容
      const result = await fetchUpdateWebConfiguration(form.value);
      if (result.code !== 200) return;

      // 提交成功后刷新
      await onSearch();
      message(result.message, { type: 'success' });
    }
  });
};
