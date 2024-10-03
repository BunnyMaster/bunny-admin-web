<template>
	<el-config-provider :locale="currentLocale">
		<router-view />
		<ReDialog />
	</el-config-provider>
</template>

<script lang="ts" setup>
import { ElConfigProvider } from 'element-plus';
import { computed, onMounted } from 'vue';
import { ReDialog } from '@/components/BaseDialog';
import en from 'element-plus/es/locale/lang/en';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import plusEn from 'plus-pro-components/es/locale/lang/en';
import plusZhCn from 'plus-pro-components/es/locale/lang/zh-cn';
import { useNav } from '@/layout/hooks/useNav';
import { useI18n } from 'vue-i18n';
import { userI18nStore } from '@/store/i18n/i18n';

const i18nStore = userI18nStore();
const i18n = useI18n();
const { $storage } = useNav();

/**
 * * 设置多语言内容
 */
const setI18n = async () => {
	await i18nStore.fetchI18n();
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

/**
 * * 当前语言类别
 */
const currentLocale = computed(() => {
	const languageData = JSON.parse(localStorage.getItem('i18nStore') as any);
	const local = languageData ? languageData.i18n.local : {};
	return local === 'zh' ? { ...zhCn, ...plusZhCn } : { ...plusEn, ...en };
});

onMounted(() => {
	// 设置多语言
	setI18n();
});
</script>
