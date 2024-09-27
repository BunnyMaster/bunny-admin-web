<script lang="ts" setup>
import { userI18nSettingStore } from '@/store/i18n/i18nSetting';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import LanguageDialog from '@/views/i18n/language-setting/language-dialog.vue';
import { ElMessage, FormInstance } from 'element-plus';
import { I18nSettingsUpdateForm } from '@/types/store/system/i18n/i18n-setting';
import { userI18nStore } from '@/store/i18n/i18n';
import { $t } from '@/plugins/i18n';

const props = defineProps({
	form: { type: Object as PropType<I18nSettingsUpdateForm> },
});

const i18nSettingStore = userI18nSettingStore();
const i18nStore = userI18nStore();
const { updateDialogVisible } = storeToRefs(i18nSettingStore);

/**
 * * 获取多语言所有父级内容
 */
const getLanguageAllParentList = () => {
	i18nStore.getLanguageAllParentList();
};

/**
 * * 关闭弹窗
 */
const onClose = () => {
	i18nSettingStore.updateDialogVisible = false;
};

/**
 * * 添加内容
 */
const onSubmit = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async valid => {
		if (valid) {
			// 添加内容
			const result = await i18nSettingStore.updateLanguage(props.form);
			if (!result) return false;

			// 添加成功后刷新数据
			i18nSettingStore.updateDialogVisible = false;
			await i18nSettingStore.getQueryI18nPage();
		} else {
			ElMessage.closeAll();
			ElMessage.warning($t('status.requiredFields'));
		}
	});
};

onMounted(() => {
	getLanguageAllParentList();
});
</script>

<template>
	<language-dialog :form="form" :on-close="onClose" :on-submit="onSubmit" :visible="updateDialogVisible" title="修改多语言内容" />
</template>
