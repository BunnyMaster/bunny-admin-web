import { ref } from 'vue';
import { messageBox } from '@/utils/message';
import { $t } from '@/plugins/i18n';
import { useMessageReceivedStore } from '@/store/message/messageReceived';

// 删除ids
export const selectIds = ref([]);
const messageReceivedStore = useMessageReceivedStore();

/** 搜索初始化系统消息 */
export async function onSearch() {
  messageReceivedStore.loading = true;
  await messageReceivedStore.fetchMessageReceivedPage();
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

  result = await messageReceivedStore.editMessageReceived({ ids: selectIds.value, status });
  if (!result) return;
  await onSearch();
};

/** 批量删除 */
export const onDeleteBatch = async () => {
  // 是否确认删除
  const result = await messageBox({
    title: $t('confirmDelete'),
    showMessage: false,
    confirmMessage: undefined,
    cancelMessage: $t('cancel_delete'),
  });
  if (!result) return;

  // 删除数据
  const ids = selectIds.value;
  await messageReceivedStore.removeMessageReceivedByAdmin(ids);
  await onSearch();
};
