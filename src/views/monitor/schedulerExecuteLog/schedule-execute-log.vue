<script lang="ts" setup>
import { ref } from 'vue';
import { FormInstance } from 'element-plus';
import { FormProps, rules, state } from '@/views/monitor/schedulerExecuteLog/utils';
import { $t } from '@/plugins/i18n';
import VueJsonPretty from 'vue-json-pretty';

const props = withDefaults(defineProps<FormProps>(), {
	formInline: () => ({
		// 任务名称
		jobName: undefined,
		// 任务分组
		jobGroup: undefined,
		// 执行任务类名
		jobClassName: undefined,
		// 执行任务core表达式
		cronExpression: undefined,
		// 触发器名称
		triggerName: undefined,
		// 执行结果
		executeResult: undefined,
		// 执行时间
		duration: undefined,
		// 结束时间
		endTime: undefined,
	}),
});

const formRef = ref<FormInstance>();
const form = ref(props.formInline);

defineExpose({ formRef });
</script>

<template>
	<el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
		<!-- 任务名称 -->
		<el-form-item :label="$t('quartzExecuteLog_jobName')" prop="jobName">
			<el-input v-model="form.jobName" :placeholder="$t('input') + $t('quartzExecuteLog_jobName')" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 任务分组 -->
		<el-form-item :label="$t('quartzExecuteLog_jobGroup')" prop="jobGroup">
			<el-input v-model="form.jobGroup" :placeholder="$t('input') + $t('quartzExecuteLog_jobGroup')" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 执行任务类名 -->
		<el-form-item :label="$t('quartzExecuteLog_jobClassName')" prop="jobClassName">
			<el-input v-model="form.jobClassName" :placeholder="$t('input') + $t('quartzExecuteLog_jobClassName')" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 执行任务core表达式 -->
		<el-form-item :label="$t('quartzExecuteLog_cronExpression')" prop="cronExpression">
			<el-input v-model="form.cronExpression" :placeholder="$t('input') + $t('quartzExecuteLog_cronExpression')" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 触发器名称 -->
		<el-form-item :label="$t('quartzExecuteLog_triggerName')" prop="triggerName">
			<el-input v-model="form.triggerName" :placeholder="$t('input') + $t('quartzExecuteLog_triggerName')" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 执行结果 -->
		<el-form-item :label="$t('quartzExecuteLog_executeResult')" prop="executeResult">
			<VueJsonPretty
				:data="JSON.parse(form.executeResult)"
				:deep="state.deep"
				:editable="state.editable"
				:editable-trigger="state.editableTrigger as any"
				:show-double-quotes="state.showDoubleQuotes"
				:show-icon="state.showIcon"
				:show-length="state.showLength"
				:show-line="state.showLine"
				:show-line-number="state.showLineNumber"
			/>
		</el-form-item>

		<!-- 用执行时间户Id -->
		<el-form-item :label="$t('quartzExecuteLog_duration')" prop="duration">
			<el-input v-model="form.duration" :placeholder="$t('input') + $t('quartzExecuteLog_duration')" autocomplete="off" type="text" />
		</el-form-item>
	</el-form>
</template>
