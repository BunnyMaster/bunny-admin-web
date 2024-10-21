import { $t } from '@/plugins/i18n';
import { reactive } from 'vue';

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
	{ label: $t('quartzExecuteLog_executeResult'), prop: 'executeResult', width: 410, slot: 'executeResult' },
	// 执行时间
	{ label: $t('quartzExecuteLog_duration'), prop: 'duration' },
	{ label: $t('table.updateTime'), prop: 'updateTime', sortable: true, width: 160 },
	{ label: $t('table.createTime'), prop: 'createTime', sortable: true, width: 160 },
	{ label: $t('table.createUser'), prop: 'createUser', slot: 'createUser', width: 90 },
	{ label: $t('table.updateUser'), prop: 'updateUser', slot: 'updateUser', width: 90 },
	{ label: $t('table.operation'), fixed: 'right', width: 160, slot: 'operation' },
];
// 添加规则
export const rules = reactive({});

export const state = reactive({
	showLine: true,
	showLineNumber: true,
	showDoubleQuotes: true,
	showLength: true,
	editable: true,
	showIcon: true,
	editableTrigger: 'click',
	deep: 3,
});
