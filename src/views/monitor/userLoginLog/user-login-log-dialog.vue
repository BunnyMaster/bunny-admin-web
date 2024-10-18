<script lang="ts" setup>
import { ref } from 'vue';
import { FormInstance } from 'element-plus';
import { rules } from '@/views/monitor/userLoginLog/utils/columns';
import { FormProps } from '@/views/monitor/userLoginLog/utils/types';
import { $t } from '@/plugins/i18n';

const props = withDefaults(defineProps<FormProps>(), {
	formInline: () => ({
		// 用户Id
		userId: undefined,
		// 用户名
		username: undefined,
		// 登录token
		token: undefined,
		// 登录Ip
		ip: undefined,
		// 登录Ip地点
		ipAddress: undefined,
		// 登录时代理
		userAgent: undefined,
	}),
});

const formRef = ref<FormInstance>();
const form = ref(props.formInline);

defineExpose({ formRef });
</script>

<template>
	<el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
		<!-- 用户Id -->
		<el-form-item :label="$t('userLoginLog_userId')" prop="userId">
			<el-input v-model="form.userId" :placeholder="$t('input') + $t('userLoginLog_userId')" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 用户名 -->
		<el-form-item :label="$t('userLoginLog_username')" prop="username">
			<el-input v-model="form.username" :placeholder="$t('input') + $t('userLoginLog_username')" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 登录token -->
		<el-form-item :label="$t('userLoginLog_token')" prop="token">
			<el-input v-model="form.token" :placeholder="$t('input') + $t('userLoginLog_token')" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 登录Ip -->
		<el-form-item :label="$t('userLoginLog_ip')" prop="ip">
			<el-input v-model="form.ip" :placeholder="$t('input') + $t('userLoginLog_ip')" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 登录Ip地点 -->
		<el-form-item :label="$t('userLoginLog_ipAddress')" prop="ipAddress">
			<el-input v-model="form.ipAddress" :placeholder="$t('input') + $t('userLoginLog_ipAddress')" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 登录时代理 -->
		<el-form-item :label="$t('userLoginLog_userAgent')" prop="userAgent">
			<el-input v-model="form.userAgent" :placeholder="$t('input') + $t('userLoginLog_userAgent')" autocomplete="off" type="text" />
		</el-form-item>
	</el-form>
</template>
