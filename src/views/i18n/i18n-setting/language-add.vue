<script lang="ts" setup>
import LanguageDialog from '@/views/i18n/i18n-setting/language-dialog.vue';
import { reactive, ref } from 'vue';
import { FormInstance } from 'element-plus';
import { userI18nStore } from '@/store/i18n/i18n';
import { addDialogVisible } from '@/views/i18n/i18n-setting/utils/hook';

const i18nStore = userI18nStore();
const dialogRef = ref();
const form = reactive({
	languageId: '',
	keyName: '',
	translate: '',
	parentId: '',
});

/**
 * * 关闭弹窗
 */
const onClose = () => {
	addDialogVisible.value = false;
};

/**
 * * 添加内容
 */
const onSubmit = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async valid => {
		if (valid) {
			// 添加内容
			const result = await i18nStore.addI18n(form);
			if (!result) return false;

			// 添加成功后刷新数据
			addDialogVisible.value = false;
			await i18nStore.getI18nMangeList();
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
			const result = await i18nStore.addI18n(form);
			if (!result) return false;

			// 添加成功后刷新数据
			await i18nStore.getI18nMangeList();
		}
	});
};
</script>

<template>
	<language-dialog ref="dialogRef" :form="form" :on-close="onClose" :on-submit="onSubmit" :visible="addDialogVisible" title="添加多语言内容">
		<template #footer>
			<el-button type="success" @click="onAddContinue(dialogRef)">继续添加</el-button>
		</template>
	</language-dialog>
</template>
