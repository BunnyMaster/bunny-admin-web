import { useQuartzExecuteLogStore } from '@/store/monitor/quartzExecuteLog';
import { ref } from 'vue';
import { messageBox } from '@/utils/message';
import { $t } from '@/plugins/i18n';

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
