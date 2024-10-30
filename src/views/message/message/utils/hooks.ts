import { addDialog } from '@/components/BaseDialog/index';
import MessageDialog from '@/views/message/message/message-dialog.vue';
import { useMessageStore } from '@/store/message/message';
import { h, ref } from 'vue';
import { message, messageBox } from '@/utils/message';
import type { FormItemProps } from '@/views/message/message/utils/types';
import { $t } from '@/plugins/i18n';
import DeleteBatchDialog from '@/components/Table/DeleteBatchDialog.vue';

export const formRef = ref();
// 删除ids
export const deleteIds = ref([]);
const messageStore = useMessageStore();

/** 搜索初始化系统消息 */
export async function onSearch() {
	messageStore.loading = true;
	await messageStore.getMessageList();
	messageStore.loading = false;
}

/** 添加系统消息 */
export function onAdd() {
	addDialog({
		title: `${$t('addNew')}${$t('message')}`,
		width: '30%',
		props: {
			formInline: {
				title: undefined,
				receivedUserId: undefined,
				sendUserId: undefined,
				sendNickName: undefined,
				messageType: undefined,
				content: undefined,
				editorType: undefined,
				status: undefined,
			},
		},
		draggable: true,
		fullscreenIcon: true,
		closeOnClickModal: false,
		contentRenderer: () => h(MessageDialog, { ref: formRef }),
		beforeSure: (done, { options }) => {
			const form = options.props.formInline as FormItemProps;
			formRef.value.formRef.validate(async (valid: any) => {
				if (!valid) return;

				const result = await messageStore.addMessage(form);
				if (!result) return;
				done();
				await onSearch();
			});
		},
	});
}

/**
 * * 更新系统消息
 * @param row
 */
export function onUpdate(row: any) {
	addDialog({
		title: `${$t('modify')}${$t('message')}`,
		width: '30%',
		props: {
			formInline: {
				title: row.title,
				receivedUserId: row.receivedUserId,
				sendUserId: row.sendUserId,
				sendNickName: row.sendNickName,
				messageType: row.messageType,
				content: row.content,
				editorType: row.editorType,
				status: row.status,
			},
		},
		draggable: true,
		fullscreenIcon: true,
		closeOnClickModal: false,
		contentRenderer: () => h(MessageDialog, { ref: formRef }),
		beforeSure: (done, { options }) => {
			const form = options.props.formInline as FormItemProps;
			formRef.value.formRef.validate(async (valid: any) => {
				if (!valid) return;

				const result = await messageStore.updateMessage({ ...form, id: row.id });
				if (!result) return;
				done();
				await onSearch();
			});
		},
	});
}

/** 删除系统消息 */
export const onDelete = async (row: any) => {
	const id = row.id;

	// 是否确认删除
	const result = await messageBox({
		title: $t('confirmDelete'),
		showMessage: false,
		confirmMessage: undefined,
		cancelMessage: $t('cancel_delete'),
	});
	if (!result) return;

	// 删除数据
	await messageStore.deleteMessage([id]);
	await onSearch();
};

/** 批量删除 */
export const onDeleteBatch = async () => {
	const ids = deleteIds.value;
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
					await messageStore.deleteMessage(ids);
					await onSearch();

					done();
				} else message($t('deleteBatchTip'), { type: 'warning' });
			});
		},
	});
};
