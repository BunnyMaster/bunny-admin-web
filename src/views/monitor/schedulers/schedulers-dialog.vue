<script lang="ts" setup>
import { ref } from 'vue';
import { FormInstance } from 'element-plus';
import { rules } from '@/views/monitor/schedulers/utils/columns';
import { FormProps } from '@/views/monitor/schedulers/utils/types';
import { $t } from '@/plugins/i18n';

const props = withDefaults(defineProps<FormProps>(), {
	formInline: () => ({
		// 任务名称
		jobName: undefined,
		// 任务分组
		jobGroup: undefined,
		// 任务详情
		description: undefined,
		// 任务类名称
		jobClassName: undefined,
		// corn表达式
		cronExpression: undefined,
		// 触发器名称
		triggerName: undefined,
		// triggerState触发器状态
		triggerState: undefined,
	}),
});

const formRef = ref<FormInstance>();
const form = ref(props.formInline);

defineExpose({ formRef });
</script>

<template>
	<el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
		<el-form-item :label="$t('schedulers_jobName')" prop="jobName">
			<el-input v-model="form.jobName" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item :label="$t('schedulers_jobGroup')" prop="jobGroup">
			<el-input v-model="form.jobGroup" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item :label="$t('description')" prop="description">
			<el-input v-model="form.description" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item :label="$t('schedulers_jobClassName')" prop="jobClassName">
			<el-input v-model="form.jobClassName" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item :label="$t('schedulers_cronExpression')" prop="cronExpression">
			<el-input v-model="form.cronExpression" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item :label="$t('schedulers_triggerName')" prop="triggerName">
			<el-input v-model="form.triggerName" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item :label="$t('schedulers_triggerState')" prop="triggerState">
			<el-input v-model="form.triggerState" autocomplete="off" type="text" />
		</el-form-item>
	</el-form>
</template>
