<script lang="ts" setup>
import LanguageDialog from '@/views/i18n/language-setting/language-dialog.vue';
import { onMounted, reactive, ref } from 'vue';
import { ElMessage, FormInstance } from 'element-plus';
import { userI18nSettingStore } from '@/store/i18n/i18nSetting';
import { storeToRefs } from 'pinia';
import { I18nSettingsAddForm } from '@/types/store/system/i18n/i18n-setting';
import { userI18nStore } from '@/store/i18n/i18n';
import { $t } from '@/plugins/i18n';

const i18nSettingStore = userI18nSettingStore();
const i18nStore = userI18nStore();
const { addDialogVisible } = storeToRefs(i18nSettingStore);
const dialogRef = ref();
const form = reactive<I18nSettingsAddForm>({
	languageId: '',
	keyName: '',
	translate: '',
	parentId: '',
});

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
	i18nSettingStore.addDialogVisible = false;
};

/**
 * * 添加内容
 */
const onSubmit = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async valid => {
		if (valid) {
			// 添加内容
			const result = await i18nSettingStore.addLanguage(form);
			if (!result) return false;

			// 添加成功后刷新数据
			i18nSettingStore.addDialogVisible = false;
			await i18nSettingStore.getQueryI18nPage();
		} else {
			ElMessage.closeAll();
			ElMessage.warning($t('status.requiredFields'));
		}
	});
};

/**
 * * 继续添加内容
 */
const onAddContinue = (value: any) => {
	const formEl: FormInstance | undefined = value.ruleFormRef;
	if (!formEl) return;
	formEl.validate(async valid => {
		if (valid) {
			// 添加内容
			const result = await i18nSettingStore.addLanguage(form);
			if (!result) return false;

			// 添加成功后刷新数据
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
	<language-dialog ref="dialogRef" :form="form" :on-close="onClose" :on-submit="onSubmit" :visible="addDialogVisible" title="添加多语言内容">
		<template #footer>
			<el-button type="success" @click="onAddContinue(dialogRef)">继续添加</el-button>
		</template>
	</language-dialog>
</template>
