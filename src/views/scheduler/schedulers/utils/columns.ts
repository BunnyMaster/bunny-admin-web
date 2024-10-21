import { reactive } from 'vue';
import { $t } from '@/plugins/i18n';

// 表格列
export const columns: TableColumnList = [
	{ type: 'index', index: (index: number) => index + 1, label: '序号', width: 60 },
	// 任务名称
	{ label: $t('schedulers_jobName'), prop: 'jobName' },
	// 任务分组
	{ label: $t('schedulers_jobGroup'), prop: 'jobGroup' },
	// 任务详情
	{ label: $t('schedulers_description'), prop: 'description' },
	// 任务类名称
	{ label: $t('schedulers_jobClassName'), prop: 'jobClassName' },
	// 触发器名称
	{ label: $t('schedulers_triggerName'), prop: 'triggerName' },
	// 触发器状态
	{ label: $t('schedulers_triggerState'), prop: 'triggerState' },
	// corn表达式
	{ label: $t('schedulers_cronExpression'), prop: 'cronExpression' },
	{ label: $t('table.operation'), fixed: 'right', width: 210, slot: 'operation' },
];

// 添加规则
export const rules = reactive({
	// 任务名称
	jobName: [{ required: true, message: `${$t('input')}${$t('schedulers_jobName')}`, trigger: 'blur' }],
	// 任务分组
	jobGroup: [{ required: true, message: `${$t('input')}${$t('schedulers_jobGroup')}`, trigger: 'blur' }],
	// 任务类名称
	jobClassName: [{ required: true, message: `${$t('input')}${$t('schedulers_jobClassName')}`, trigger: 'blur' }],
	// corn表达式
	cronExpression: [{ required: true, message: `${$t('input')}${$t('schedulers_cronExpression')}`, trigger: 'blur' }],
});
