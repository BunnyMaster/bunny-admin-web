<script lang="ts" setup>
import { ref } from 'vue';
import { FormInstance } from 'element-plus';
import { rules } from '@/views/system/adminUser/utils/columns';
import { FormProps } from '@/views/system/adminUser/utils/types';
import { $t } from '@/plugins/i18n';

const props = withDefaults(defineProps<FormProps>(), {
	formInline: () => ({
		// 用户名
		username: undefined,
		// 昵称
		nickName: undefined,
		// 邮箱
		email: undefined,
		// 手机号
		phone: undefined,
		// 密码
		password: undefined,
		// 头像
		avatar: undefined,
		// 性别
		sex: undefined,
		// 个人描述
		summary: undefined,
		// 状态
		status: undefined,
	}),
});

const formRef = ref<FormInstance>();
const form = ref(props.formInline);

defineExpose({ formRef });
</script>

<template>
	<el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
		<el-form-item :label="$t('adminUser_username')" prop="username">
			<el-input v-model="form.username" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item :label="$t('adminUser_nickName')" prop="nickName">
			<el-input v-model="form.nickName" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item :label="$t('adminUser_email')" prop="email">
			<el-input v-model="form.email" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item :label="$t('adminUser_phone')" prop="phone">
			<el-input v-model="form.phone" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item :label="$t('adminUser_password')" prop="password">
			<el-input v-model="form.password" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item :label="$t('adminUser_avatar')" prop="avatar">
			<el-input v-model="form.avatar" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item :label="$t('adminUser_sex')" prop="sex">
			<el-input v-model="form.sex" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item :label="$t('adminUser_summary')" prop="summary">
			<el-input v-model="form.summary" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item :label="$t('adminUser_status')" prop="status">
			<el-input v-model="form.status" autocomplete="off" type="text" />
		</el-form-item>
	</el-form>
</template>
