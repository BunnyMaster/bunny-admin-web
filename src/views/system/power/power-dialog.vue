<script lang="ts" setup>
import { ref } from 'vue';
import { FormInstance } from 'element-plus';
import { rules } from '@/views/system/power/utils/columns';
import { FormProps } from '@/views/system/power/utils/types';
import { $t } from '@/plugins/i18n';

const props = withDefaults(defineProps<FormProps>(), {
	formInline: () => ({
		// 父级id
		parentId: undefined,
		// 权限编码
		powerCode: undefined,
		// 权限名称
		powerName: undefined,
		// 请求路径
		requestUrl: undefined,
	}),
});

const formRef = ref<FormInstance>();
const form = ref(props.formInline);

defineExpose({ formRef });
</script>

<template>
	<el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
		{{ form.parentId }}
		<el-form-item :label="$t('power_parentId')" prop="parentId">
			<el-input v-model="form.parentId" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item :label="$t('power_powerCode')" prop="powerCode">
			<el-input v-model="form.powerCode" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item :label="$t('power_powerName')" prop="powerName">
			<el-input v-model="form.powerName" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item :label="$t('power_requestUrl')" prop="requestUrl">
			<el-input v-model="form.requestUrl" autocomplete="off" type="text" />
		</el-form-item>
	</el-form>
</template>
