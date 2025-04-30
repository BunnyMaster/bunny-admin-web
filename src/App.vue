<template>
  <el-config-provider :locale="currentLocale">
    <router-view />
    <ReDialog />
    <ReDrawer />
  </el-config-provider>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, onMounted } from 'vue';
import { checkVersion } from 'version-rocket';
import { ElConfigProvider } from 'element-plus';
import { ReDialog } from '@/components/ReDialog';
import { ReDrawer } from '@/components/ReDrawer';
import en from 'element-plus/es/locale/lang/en';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import plusEn from 'plus-pro-components/es/locale/lang/en';
import plusZhCn from 'plus-pro-components/es/locale/lang/zh-cn';
import { userI18nStore } from '@/store/i18n/i18n';
import { useNav } from '@/layout/hooks/useNav';
import { useI18n } from 'vue-i18n';

const i18nStore = userI18nStore();
const i18n = useI18n();
const { $storage } = useNav();

/* 设置多语言内容 */
const setI18n = async () => {
  await i18nStore.loadI18nMap();
  const languageData = JSON.parse(localStorage.getItem('i18nStore') as any);
  // 初始化设置多语言内容
  const locale = $storage.locale.locale;
  // 如果本地没有语言版本，设置为服务端默认内容
  if (locale == '' || locale == null || !locale) {
    const local = languageData.i18n.local;
    i18n.locale.value = local;
    $storage.locale = { locale: local };
    i18n.mergeLocaleMessage(local, languageData.i18n[local]);
    return;
  }

  i18n.locale.value = locale;
  $storage.locale = { locale };
  i18nStore.i18n.local = locale;
  i18n.mergeLocaleMessage(locale, languageData.i18n[locale]);
};

/* 当前语言类别 */
const currentLocale = computed(() => {
  const languageData = JSON.parse(localStorage.getItem('i18nStore') as any);
  const local = languageData ? languageData.i18n.local : {};
  return local === 'zh' ? { ...zhCn, ...plusZhCn } : { ...plusEn, ...en };
});

onMounted(() => {
  setI18n();
});

onBeforeMount(async () => {
  const { version, name: title } = __APP_INFO__.pkg;
  const { VITE_PUBLIC_PATH, MODE } = import.meta.env;
  // https://github.com/guMcrey/version-rocket/blob/main/README.zh-CN.md#api
  if (MODE === 'production') {
    // 版本实时更新检测，只作用于线上环境
    checkVersion(
      // config
      {
        // 5分钟检测一次版本
        pollingTime: 300000,
        localPackageVersion: version,
        originVersionFileUrl: `${location.origin}${VITE_PUBLIC_PATH}version.json`,
      },
      // options
      {
        title,
        description: '检测到新版本',
        buttonText: '立即更新',
      }
    );
  }
});
</script>
