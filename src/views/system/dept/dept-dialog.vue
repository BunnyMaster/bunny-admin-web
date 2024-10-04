<script lang="ts" setup>
import { ref } from 'vue';
import { FormInstance } from 'element-plus';
import { rules } from '@/views/system/dept/utils/columns';
import { FormProps } from '@/views/system/dept/utils/types';
import { $t } from '@/plugins/i18n';

const props = withDefaults(defineProps<FormProps>(), {
	formInline: () => ({
		// 父级id
		parentId: undefined,
		// 管理者id
		managerId: undefined,
		// 部门名称
		deptName: undefined,
		// 部门简介
		summary: undefined,
		// 备注信息
		remarks: undefined,
	}),
});

const formRef = ref<FormInstance>();
const form = ref(props.formInline);

defineExpose({ formRef });
</script>

<template>
	<el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
		<el-form-item :label="$t('dept_parentId')" prop="parentId">
			<el-input v-model="form.parentId" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item :label="$t('dept_managerId')" prop="managerId">
			<el-input v-model="form.managerId" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item :label="$t('dept_deptName')" prop="deptName">
			<el-input v-model="form.deptName" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item :label="$t('dept_summary')" prop="summary">
			<el-input v-model="form.summary" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item :label="$t('dept_remarks')" prop="remarks">
			<el-input v-model="form.remarks" autocomplete="off" type="text" />
		</el-form-item>
	</el-form>
</template>
