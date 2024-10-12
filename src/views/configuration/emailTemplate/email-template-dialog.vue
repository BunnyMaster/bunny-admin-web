<script lang="ts" setup>
import { ref } from 'vue';
import { FormInstance } from 'element-plus';
import { rules } from '@/views/configuration/emailTemplate/utils/columns';
import { FormProps } from '@/views/configuration/emailTemplate/utils/types';
import { $t } from '@/plugins/i18n';

const props = withDefaults(defineProps<FormProps>(), {
	formInline: () => ({
		// 模板名称
		templateName: undefined,
		// 主题
		subject: undefined,
		// 邮件内容
		body: undefined,
		// 邮件类型
		type: undefined,
	}),
});

const formRef = ref<FormInstance>();
const form = ref(props.formInline);

defineExpose({ formRef });
</script>

<template>
	<el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
		<el-form-item :label="$t('emailTemplate_templateName')" prop="templateName">
			<el-input v-model="form.templateName" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item :label="$t('emailTemplate_subject')" prop="subject">
			<el-input v-model="form.subject" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item :label="$t('emailTemplate_body')" prop="body">
			<el-input v-model="form.body" :autosize="{ minRows: 2, maxRows: 26 }" autocomplete="off" type="textarea" />
		</el-form-item>
		<el-form-item :label="$t('emailTemplate_type')" prop="type">
			<el-input v-model="form.type" autocomplete="off" type="text" />
		</el-form-item>
	</el-form>
</template>
