import { addDialog } from '@/components/BaseDialog/index';
import { h, ref } from 'vue';
import { message, messageBox } from '@/utils/message';
import { $t } from '@/plugins/i18n';
import DeleteBatchDialog from '@/components/Table/DeleteBatchDialog.vue';
import { useMessageReceivedStore } from '@/store/message/messageReceived';

// 删除ids
export const selectIds = ref([]);
const messageReceivedStore = useMessageReceivedStore();

/** 搜索初始化系统消息 */
export async function onSearch() {
	messageReceivedStore.loading = true;
	await messageReceivedStore.getMessageReceivedList();
	messageReceivedStore.loading = false;
}

/** 管理员操作用户消息---将用户消息标为已读 */
export const updateMarkMessageReceived = async (status: boolean) => {
	// 是否确认标为已读
	let result = await messageBox({
		title: $t('confirm_update_status'),
		showMessage: false,
		confirmMessage: undefined,
		cancelMessage: $t('cancel'),
	});
	if (!result) return;

	result = await messageReceivedStore.updateMarkMessageReceived({ ids: selectIds.value, status });
	if (!result) return;
	await onSearch();
};

/** 批量删除 */
export const onDeleteBatch = async () => {
	const ids = selectIds.value;
	const formDeletedBatchRef = ref();

	addDialog({
		title: $t('deleteBatchTip'),
		width: '30%',
		props: { formInline: { confirmText: '' } },
		draggable: true,
		fullscreenIcon: true,
		closeOnClickModal: false,
		contentRenderer: () => h(DeleteBatchDialog, { ref: formDeletedBatchRef }),
		beforeSure: (done, { options }) => {
			formDeletedBatchRef.value.formDeletedBatchRef.validate(async (valid: any) => {
				if (!valid) return;

				const text = options.props.formInline.confirmText.toLowerCase();
				if (text === 'yes' || text === 'y') {
					// 删除数据
					const result = await messageReceivedStore.deleteMessageReceivedByIds(ids);
					if (!result) return;

					await onSearch();
					done();
				} else message($t('deleteBatchTip'), { type: 'warning' });
			});
		},
	});
};
