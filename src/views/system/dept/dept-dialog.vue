<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { FormInstance } from 'element-plus';
import { deptSelector, rules } from '@/views/system/dept/utils/columns';
import { FormProps } from '@/views/system/dept/utils/types';
import { $t } from '@/plugins/i18n';
import { useDeptStore } from '@/store/system/dept';
import UserSelectSearch from '@/views/system/dept/user-select-search.vue';
import { handleTree } from '@pureadmin/utils';

const props = withDefaults(defineProps<FormProps>(), {
	formInline: () => ({
		// 父级id
		parentId: undefined,
		// 管理者id
		manager: undefined,
		// 部门名称
		deptName: undefined,
		// 部门简介
		summary: undefined,
	}),
});

const deptStore = useDeptStore();
const formRef = ref<FormInstance>();
const form = ref(props.formInline);

onMounted(() => {
	deptStore.getAllDeptList();
});

defineExpose({ formRef });
</script>

<template>
	<el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
		<el-form-item :label="$t('dept_parentId')" prop="parentId">
			<el-cascader v-model="form.parentId" :options="handleTree(deptStore.allDeptList)" :props="deptSelector" class="w-full" clearable filterable show-all-levels />
		</el-form-item>
		<el-form-item :label="$t('dept_manager')" prop="manager">
			<user-select-search :formInline="form" />
		</el-form-item>
		<el-form-item :label="$t('dept_deptName')" prop="deptName">
			<el-input v-model="form.deptName" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item :label="$t('dept_summary')" prop="summary">
			<el-input v-model="form.summary" autocomplete="off" type="text" />
		</el-form-item>
	</el-form>
</template>
