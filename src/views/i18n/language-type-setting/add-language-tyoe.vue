<script lang="ts" setup>
import SimpleDialog from '@/components/Dialog/SimpleDialog.vue';
import { useI18nTypeStore } from '@/store/i18n/i18nType';
import { reactive, ref } from 'vue';
import { ElMessage, FormInstance } from 'element-plus';
import { addRules } from '@/views/i18n/language-type-setting/utils/rules';
import { isDefaultOptions } from '@/enums/baseConstant';

const formRef = ref<FormInstance>();
const i18nTypeStore = useI18nTypeStore();
const form = reactive({
	languageName: '',
	summary: '',
	isDefalut: false,
});

/**
 * * 提交内容
 * @param formEl
 */
const submitForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async valid => {
		if (valid) {
			await i18nTypeStore.addLanguageType(form);
			await i18nTypeStore.getLanguageType();
			i18nTypeStore.isAddShown = false;
		} else {
			ElMessage.warning('请填写必填项');
		}
	});
};

/**
 * * 充值表单
 * @param formEl
 */
const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
};

/**
 * * 关闭弹窗
 */
const onCancel = (value: boolean) => {
	i18nTypeStore.isAddShown = value;
};
</script>

<template>
	<SimpleDialog :show="i18nTypeStore.isAddShown" width="600" @on-cancel="onCancel">
		<template #header>
			<h1>添加多语言种类</h1>
		</template>

		<el-form ref="formRef" :model="form" :rules="addRules" label-width="auto">
			<el-form-item label="语言名称" prop="languageName">
				<el-input v-model="form.languageName" autocomplete="off" type="text" />
			</el-form-item>
			<el-form-item label="语言详情" prop="summary">
				<el-input v-model="form.summary" autocomplete="off" type="text" />
			</el-form-item>
			<el-form-item label="是否为默认语言" prop="isDefault">
				<el-select v-model="form.isDefalut" placeholder="选择是否为默认">
					<el-option v-for="(item, index) in isDefaultOptions" :key="index" :label="item.label" :value="item.value" />
				</el-select>
			</el-form-item>
		</el-form>

		<!-- 确认底部 -->
		<template #dialogFooter>
			<el-button type="primary" @click="submitForm(formRef)">{{ $t('buttons.confirm') }}</el-button>
			<el-button type="warning" @click="resetForm(formRef)">{{ $t('buttons.rest') }}</el-button>
			<el-button @click="onCancel(false)">{{ $t('buttons.close') }}</el-button>
		</template>
	</SimpleDialog>
</template>

<style lang="scss" scoped></style>
