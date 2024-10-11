<script lang="ts" setup>
import { ref } from 'vue';
import { FormInstance } from 'element-plus';
import { rules } from '@/views/system/emailUsers/utils/columns';
import { FormProps } from '@/views/system/emailUsers/utils/types';
import { $t } from '@/plugins/i18n';
import { usePublicHooks } from '@/views/hooks';

const props = withDefaults(defineProps<FormProps>(), {
	formInline: () => ({
		// 邮箱
		email: undefined,
		// 邮件模板
		emailTemplate: undefined,
		// 密码
		password: undefined,
		// Host地址
		host: undefined,
		// 端口号
		port: undefined,
		// 邮箱协议
		smtpAgreement: undefined,
		// 是否为默认邮件
		isDefault: false,
	}),
});

const formRef = ref<FormInstance>();
const form = ref(props.formInline);
// 用户是否停用样式
const { switchStyle } = usePublicHooks();

defineExpose({ formRef });
</script>

<template>
	<el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
		<el-form-item :label="$t('emailUsers_email')" prop="email">
			<el-input v-model="form.email" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item :label="$t('emailUsers_emailTemplate')" prop="emailTemplate">
			<el-input v-model="form.emailTemplate" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item :label="$t('emailUsers_password')" prop="password">
			<el-input v-model="form.password" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item :label="$t('emailUsers_host')" prop="host">
			<el-input v-model="form.host" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item :label="$t('emailUsers_port')" prop="port">
			<el-input v-model="form.port" autocomplete="off" max="9999" type="number" />
		</el-form-item>
		<el-form-item :label="$t('emailUsers_smtpAgreement')" prop="smtpAgreement">
			<el-input v-model="form.smtpAgreement" autocomplete="off" maxlength="10" show-word-limit type="text" />
		</el-form-item>
		<el-form-item :label="$t('emailUsers_isDefault')" prop="isDefault">
			<el-switch v-model="form.isDefault" :active-text="$t('default')" :active-value="true" :inactive-text="$t('no_default')" :inactive-value="false" :style="switchStyle" inline-prompt />
		</el-form-item>
	</el-form>
</template>
