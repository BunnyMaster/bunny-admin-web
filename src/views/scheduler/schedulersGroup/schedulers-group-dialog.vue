<script lang="ts" setup>
import { ref } from 'vue';
import { FormInstance } from 'element-plus';
import { FormProps, rules } from '@/views/scheduler/schedulersGroup/utils';
import { $t } from '@/plugins/i18n';

const props = withDefaults(defineProps<FormProps>(), {
	formInline: () => ({
		// 分组名称
		groupName: undefined,
		// 分组详情
		description: undefined,
	}),
});

const formRef = ref<FormInstance>();
const form = ref(props.formInline);

defineExpose({ formRef });
</script>

<template>
	<el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
		<el-form-item :label="$t('schedulersGroup_groupName')" prop="groupName">
			<el-input v-model="form.groupName" :placeholder="$t('input') + $t('schedulersGroup_groupName')" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item :label="$t('schedulersGroup_description')" prop="description">
			<el-input v-model="form.description" :placeholder="$t('input') + $t('schedulersGroup_description')" autocomplete="off" type="text" />
		</el-form-item>
	</el-form>
</template>
