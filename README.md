<h1>bunny-admin精简版（国际化版本）</h1>

[![license](https://img.shields.io/github/license/pure-admin/vue-pure-admin.svg)](LICENSE)

## 介绍

精简版是基于 [vue-pure-admin](https://github.com/pure-admin/vue-pure-admin)
提炼出的架子，包含主体功能，更适合实际项目开发，打包后的大小在全局引入 [element-plus](https://element-plus.org)
的情况下仍然低于 `2.3MB`，并且会永久同步完整版的代码。开启 `brotli` 压缩和 `cdn` 替换本地库模式后，打包大小低于 `350kb`

在之前作者基础上添加了适合自己开发的相关内容

## 维护者

[Bunny](https://gitee.com/BunnyBoss/bunny-admin-element-thin)

## 许可证

[MIT © 2020-present, pure-admin](./LICENSE)

## 配置文件

```json
{
  "Version": "5.8.0",
  // 平台版本号
  "Title": "PureAdmin",
  // 平台标题
  "FixedHeader": true,
  // 是否固定页头和标签页（true 内容区超出出现纵向滚动条 false 页头、标签页、内容区可纵向滚动）
  "HiddenSideBar": false,
  // 隐藏菜单和页头，只显示标签页和内容区
  "MultiTagsCache": false,
  // 是否开启持久化标签 （会缓存）
  "KeepAlive": true,
  // 是否开启组件缓存（此处不同于路由的 keepAlive，如果此处为 true 表示设置路由的 keepAlive 起效，反之设置 false 屏蔽平台整体的 keepAlive，即使路由设置了keepAlive 也不再起作用）
  "Locale": "zh",
  // 默认国际化语言 （zh 中文、en 英文）（会缓存）（max版本额外配置：tw 繁體中文、ja 日语、ko 韩语）
  "Layout": "vertical",
  // 导航菜单模式 （vertical 左侧菜单模式、horizontal 顶部菜单模式、mix 混合菜单模式）（会缓存）（max版本额外配置：double 左侧双栏菜单模式）
  "Theme": "light",
  // 主题模式（会缓存）
  "DarkMode": false,
  // 是否开启暗黑模式 （会缓存）
  "OverallStyle": "light",
  // 整体风格（浅色：light、深色：dark、自动：system）（会缓存）更多详情看 https://github.com/pure-admin/vue-pure-admin/commit/dd783136229da9e291b518df93227111f4216ad0#commitcomment-137027417
  "Grey": false,
  // 灰色模式（会缓存）
  "Weak": false,
  // 色弱模式（会缓存）
  "HideTabs": false,
  // 是否隐藏标签页（会缓存）
  "HideFooter": false,
  // 是否隐藏页脚（会缓存）
  "SidebarStatus": true,
  // vertical左侧菜单模式模式下侧边栏状态（true 展开、false 收起）（会缓存）
  "EpThemeColor": "#409EFF",
  // 主题色（会缓存）
  "ShowLogo": true,
  // 是否显示logo（会缓存）
  "ShowModel": "smart",
  // 标签页风格（smart 灵动模式、card 卡片模式）（会缓存）
  "MenuArrowIconNoTransition": false,
  // 菜单展开、收起图标是否开启动画，如遇菜单展开、收起卡顿设置成 true 即可（默认 false，开启动画）
  "CachingAsyncRoutes": false,
  // 是否开启动态路由缓存本地的全局配置，默认 false
  "TooltipEffect": "light",
  // 可配置平台主体所有 el-tooltip 的 effect 属性，默认 light，不会影响业务代码
  "ResponsiveStorageNameSpace": "responsive-",
  // 本地响应式存储的命名空间
  "MenuSearchHistory": 6
  // 菜单搜索历史的最大条目
}

```