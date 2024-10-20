import { useQuartzExecuteLogStore } from '@/store/monitor/quartzExecuteLog';
import { h, ref } from 'vue';
import { messageBox } from '@/utils/message';
import { $t } from '@/plugins/i18n';
import { addDialog } from '@/components/BaseDialog/index';
import ScheduleExecuteLog from '@/views/monitor/schedulerExecuteLog/schedule-execute-log.vue';

export const formRef = ref();
// 删除ids
export const deleteIds = ref([]);
const quartzExecuteLogStore = useQuartzExecuteLogStore();

/**
 * * 搜索初始化调度任务执行日志
 */
export async function onSearch() {
	quartzExecuteLogStore.loading = true;
	await quartzExecuteLogStore.getQuartzExecuteLogList();
	quartzExecuteLogStore.loading = false;
}

/**
 * * 查看用户登录日志
 * @param row
 */
export function onView(row: any) {
	addDialog({
		title: `${$t('view')}${$t('quartzExecuteLog')}`,
		width: '30%',
		props: {
			formInline: {
				jobName: row.jobName,
				jobGroup: row.jobGroup,
				jobClassName: row.jobClassName,
				cronExpression: row.cronExpression,
				triggerName: row.triggerName,
				executeResult: row.executeResult,
				duration: row.duration,
				endTime: row.endTime,
			},
		},
		draggable: true,
		fullscreenIcon: true,
		closeOnClickModal: false,
		contentRenderer: () => h(ScheduleExecuteLog, { ref: formRef }),
		beforeSure: async done => {
			done();
			await onSearch();
		},
	});
}

/**
 * * 删除调度任务执行日志
 */
export const onDelete = async (row: any) => {
	const id = row.id;

	// 是否确认删除
	const result = await messageBox({
		title: $t('confirm_delete'),
		showMessage: false,
		confirmMessage: undefined,
		cancelMessage: $t('cancel_delete'),
	});
	if (!result) return;

	// 删除数据
	await quartzExecuteLogStore.deleteQuartzExecuteLog([id]);
	await onSearch();
};

/**
 * 批量删除
 */
export const onDeleteBatch = async () => {
	const ids = deleteIds.value;

	// 是否确认删除
	const result = await messageBox({
		title: $t('confirm_delete'),
		showMessage: false,
		confirmMessage: undefined,
		cancelMessage: $t('cancel_delete'),
	});
	if (!result) return;

	// 删除数据
	await quartzExecuteLogStore.deleteQuartzExecuteLog(ids);
	await onSearch();
};
