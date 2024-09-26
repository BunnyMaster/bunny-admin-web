// 多组件库的国际化和本地项目国际化兼容
import { createI18n } from "vue-i18n";
import type { App } from "vue";

// ? 从本地存储中获取数据
const languageData = localStorage.getItem("i18nStore");

// 配置多语言
export const i18n = createI18n({
  // 如果要支持 compositionAPI，此项必须设置为 false
  legacy: false,
  // locale: 'zh',
  fallbackLocale: "en",
  // ? 全局注册$t方法
  globalInjection: true,
  // 本地内容存在时，首次加载如果本地存储没有多语言需要再刷新
  messages: languageData ? JSON.parse(languageData).i18n : {}
});

export const $t: any = (i18n.global as any).t as any;

export function useI18n(app: App) {
  app.use(i18n);
}
