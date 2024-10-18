import { reactive } from 'vue';
import { $t } from '@/plugins/i18n';

// 表格列
export const columns: TableColumnList = [
	{ type: 'selection', align: 'left' },
	{ type: 'index', index: (index: number) => index + 1, label: '序号', width: 60 },
	// 任务名称
	{ label: $t('quartzExecuteLog_jobName'), prop: 'jobName' },
	// 任务分组
	{ label: $t('quartzExecuteLog_jobGroup'), prop: 'jobGroup' },
	// 执行任务类名
	{ label: $t('quartzExecuteLog_jobClassName'), prop: 'jobClassName' },
	// 执行任务core表达式
	{ label: $t('quartzExecuteLog_cronExpression'), prop: 'cronExpression' },
	// 触发器名称
	{ label: $t('quartzExecuteLog_triggerName'), prop: 'triggerName' },
	// 执行结果
	{ label: $t('quartzExecuteLog_executeResult'), prop: 'executeResult', width: 210 },
	// 执行时间
	{ label: $t('quartzExecuteLog_duration'), prop: 'duration' },
	// 结束时间
	{ label: $t('quartzExecuteLog_endTime'), prop: 'endTime' },
	{ label: $t('table.updateTime'), prop: 'updateTime', sortable: true, width: 160 },
	{ label: $t('table.createTime'), prop: 'createTime', sortable: true, width: 160 },
	{ label: $t('table.createUser'), prop: 'createUser', slot: 'createUser', width: 90 },
	{ label: $t('table.updateUser'), prop: 'updateUser', slot: 'updateUser', width: 90 },
	{ label: $t('table.operation'), fixed: 'right', width: 210, slot: 'operation' },
];

// 添加规则
export const rules = reactive({
	// 任务名称
	jobName: [{ required: true, message: `${$t('input')}${$t('quartzExecuteLog_jobName')}`, trigger: 'blur' }],
	// 任务分组
	jobGroup: [{ required: true, message: `${$t('input')}${$t('quartzExecuteLog_jobGroup')}`, trigger: 'blur' }],
	// 执行任务类名
	jobClassName: [{ required: true, message: `${$t('input')}${$t('quartzExecuteLog_jobClassName')}`, trigger: 'blur' }],
	// 执行任务core表达式
	cronExpression: [
		{
			required: true,
			message: `${$t('input')}${$t('quartzExecuteLog_cronExpression')}`,
			trigger: 'blur',
		},
	],
	// 触发器名称
	triggerName: [{ required: true, message: `${$t('input')}${$t('quartzExecuteLog_triggerName')}`, trigger: 'blur' }],
	// 执行结果
	executeResult: [
		{
			required: true,
			message: `${$t('input')}${$t('quartzExecuteLog_executeResult')}`,
			trigger: 'blur',
		},
	],
	// 执行时间
	duration: [{ required: true, message: `${$t('input')}${$t('quartzExecuteLog_duration')}`, trigger: 'blur' }],
	// 结束时间
	endTime: [{ required: true, message: `${$t('input')}${$t('quartzExecuteLog_endTime')}`, trigger: 'blur' }],
});
