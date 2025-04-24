// 多组件库的国际化和本地项目国际化兼容
import { createI18n } from 'vue-i18n';
import type { App, WritableComputedRef } from 'vue';
import { isObject } from '@pureadmin/utils';

// ? 从本地存储中获取数据
const languageData = localStorage.getItem('i18nStore');

// 配置多语言
export const i18n = createI18n({
  // 如果要支持 compositionAPI，此项必须设置为 false
  legacy: false,
  locale: 'zh',
  fallbackLocale: 'zh',
  // ? 全局注册$t方法
  globalInjection: true,
  // 本地内容存在时，首次加载如果本地存储没有多语言需要再刷新
  messages: languageData ? JSON.parse(languageData).i18n : {},
});

const siphonI18n = (function () {
  // 仅初始化一次国际化配置
  let cache = Object.fromEntries(
    Object.entries(import.meta.glob('../../locales/!*.y(a)?ml', { eager: true })).map(([key, value]: any) => {
      const matched = key.match(/([A-Za-z0-9-_]+)\./i)[1];
      return [matched, value.default];
    })
  );
  return (prefix = 'zh-CN') => {
    return cache[prefix];
  };
})();

/** 获取对象中所有嵌套对象的key键，并将它们用点号分割组成字符串 */
function getObjectKeys(obj) {
  const stack = [];
  const keys: Set<string> = new Set();

  stack.push({ obj, key: '' });

  while (stack.length > 0) {
    const { obj, key } = stack.pop();

    for (const k in obj) {
      const newKey = key ? `${key}.${k}` : k;

      if (obj[k] && isObject(obj[k])) {
        stack.push({ obj: obj[k], key: newKey });
      } else {
        keys.add(key);
      }
    }
  }

  return keys;
}

/** 将展开的key缓存 */
const keysCache: Map<string, Set<string>> = new Map();
const flatI18n = (prefix = 'zh') => {
  let cache = keysCache.get(prefix);
  if (!cache) {
    cache = getObjectKeys(siphonI18n(prefix));
    keysCache.set(prefix, cache);
  }
  return cache;
};

/**
 * 国际化转换工具函数（自动读取根目录locales文件夹下文件进行国际化匹配）
 * @param message message
 * @returns 转化后的message
 */
export function transformI18n(message: any = '') {
  if (!message) {
    return '';
  }

  // 处理存储动态路由的title,格式 {zh:"",en:""}
  if (typeof message === 'object') {
    const locale: string | WritableComputedRef<string> | any = i18n.global.locale;
    return message[locale?.value];
  }

  const key = message.match(/(\S*)\./)?.input;

  if (key && flatI18n('zh-CN').has(key)) {
    return i18n.global.t.call(i18n.global.locale, message);
  } else if (!key && Object.hasOwn(siphonI18n('zh'), message)) {
    // 兼容非嵌套形式的国际化写法
    return i18n.global.t.call(i18n.global.locale, message);
  } else {
    return message;
  }
}

export const $t: any = (i18n.global as any).t as any;

export function useI18n(app: App) {
  app.use(i18n);
}
