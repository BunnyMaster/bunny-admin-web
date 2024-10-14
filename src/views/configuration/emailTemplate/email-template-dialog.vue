<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { FormInstance } from 'element-plus';
import { rules } from '@/views/configuration/emailTemplate/utils/columns';
import { FormProps } from '@/views/configuration/emailTemplate/utils/types';
import { $t } from '@/plugins/i18n';
import { useEmailTemplateStore } from '@/store/configuration/emailTemplate';

const props = withDefaults(defineProps<FormProps>(), {
	formInline: () => ({
		// 模板名称
		templateName: undefined,
		// 模板名称
		emailUser: undefined,
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
const emailTemplateStore = useEmailTemplateStore();

onMounted(() => {
	emailTemplateStore.getEmailTypes();
});

defineExpose({ formRef });
</script>

<template>
	<el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
		<!-- 模板名称 -->
		<el-form-item :label="$t('emailTemplate_templateName')" prop="templateName">
			<el-input v-model="form.templateName" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 配置模板邮件关联用户邮件 -->
		<el-form-item :label="$t('emailTemplate_emailUser')" prop="emailUser">
			<el-select v-model="form.emailUser" :placeholder="$t('emailTemplate_emailUser')" clearable filterable>
				<el-option v-for="(item, index) in emailTemplateStore.emailUserList" :key="index" :label="item.key" :navigationBar="false" :value="item.value" />
			</el-select>
		</el-form-item>

		<!-- 配置主题内容 -->
		<el-form-item :label="$t('emailTemplate_subject')" prop="subject">
			<el-input v-model="form.subject" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 配置邮件发送体 -->
		<el-form-item :label="$t('emailTemplate_body')" prop="body">
			<el-input v-model="form.body" :autosize="{ minRows: 2, maxRows: 26 }" autocomplete="off" type="textarea" />
		</el-form-item>

		<!--配置邮件类型-->
		<el-form-item :label="$t('emailTemplate_type')" prop="type">
			<el-select v-model="form.type" :placeholder="$t('emailTemplate_type')" clearable filterable>
				<el-option v-for="(item, index) in emailTemplateStore.allEmailTypes" :key="index" :label="item.key" :navigationBar="false" :value="item.value" />
			</el-select>
		</el-form-item>
	</el-form>
</template>
