<script lang="ts" setup>
import LanguageDialog from '@/views/i18n/i18n-setting/language-dialog.vue';
import { FormInstance } from 'element-plus';
import { userI18nStore } from '@/store/i18n/i18n';
import { updateDialogVisible, updateForm } from '@/views/i18n/i18n-setting/utils/hook';

const i18nStore = userI18nStore();

/**
 * * 关闭弹窗
 */
const onClose = () => {
	updateDialogVisible.value = false;
};

/**
 * * 添加内容
 */
const onSubmit = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async valid => {
		if (valid) {
			// 添加内容
			const result = await i18nStore.updateI18n(updateForm);
			if (!result) return false;

			// 添加成功后刷新数据
			updateDialogVisible.value = false;
			await i18nStore.getI18nMangeList();
		}
	});
};
</script>

<template>
	<language-dialog :form="updateForm" :on-close="onClose" :on-submit="onSubmit" :visible="updateDialogVisible" title="修改多语言内容" />
</template>
