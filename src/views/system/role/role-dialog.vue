<script lang="ts" setup>
import { ref } from 'vue';
import { FormInstance } from 'element-plus';
import { rules } from '@/views/system/role/utils/columns';
import { FormProps } from '@/views/system/role/utils/types';
import { $t } from '@/plugins/i18n';

const props = withDefaults(defineProps<FormProps>(), {
	formInline: () => ({
		// 角色代码
		roleCode: undefined,
		// 描述
		description: undefined,
	}),
});

const formRef = ref<FormInstance>();
const form = ref(props.formInline);

defineExpose({ formRef });
</script>

<template>
	<el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
		<el-form-item :label="$t('role_roleCode')" prop="roleCode">
			<el-input v-model="form.roleCode" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item :label="$t('role_description')" prop="description">
			<el-input v-model="form.description" autocomplete="off" type="text" />
		</el-form-item>
	</el-form>
</template>
