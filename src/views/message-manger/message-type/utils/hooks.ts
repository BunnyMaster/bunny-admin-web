import { addDialog } from '@/components/ReDialog/index';
import MessageTypeDialog from '@/views/message-manger/message-type/components/message-type-dialog.vue';
import { useMessageTypeStore } from '@/store/message/messageType';
import { h, ref } from 'vue';
import { messageBox } from '@/utils/message';
import type { FormItemProps } from '@/views/message-manger/message-type/utils/types';
import { $t } from '@/plugins/i18n';

export const formRef = ref();
// 删除ids
export const deleteIds = ref([]);
const messageTypeStore = useMessageTypeStore();

/** 搜索初始化系统消息类型 */
export async function onSearch() {
  messageTypeStore.loading = true;
  await messageTypeStore.fetchMessageTypePage();
  messageTypeStore.loading = false;
}

/** 添加系统消息类型 */
export function onAdd() {
  addDialog({
    title: `${$t('addNew')}${$t('messageType')}`,
    width: '30%',
    props: {
      formInline: {
        status: true,
        messageName: undefined,
        messageType: undefined,
        summary: undefined,
      },
    },
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(MessageTypeDialog, { ref: formRef }),
    beforeSure: (done, { options }) => {
      const form = options.props.formInline as FormItemProps;
      formRef.value.formRef.validate(async (valid: any) => {
        if (!valid) return;

        const result = await messageTypeStore.addMessageType(form);
        if (!result) return;
        done();
        await onSearch();
      });
    },
  });
}

/* 更新系统消息类型 */
export function onUpdate(row: any) {
  addDialog({
    title: `${$t('modify')}${$t('messageType')}`,
    width: '30%',
    props: {
      formInline: {
        status: row.status,
        messageName: row.messageName,
        messageType: row.messageType,
        summary: row.summary,
      },
    },
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(MessageTypeDialog, { ref: formRef }),
    beforeSure: (done, { options }) => {
      const form = options.props.formInline as FormItemProps;
      formRef.value.formRef.validate(async (valid: any) => {
        if (!valid) return;

        const result = await messageTypeStore.editMessageType({ ...form, id: row.id });
        if (!result) return;
        done();
        await onSearch();
      });
    },
  });
}

/** 删除系统消息类型 */
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
  await messageTypeStore.removeMessageType([id]);
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
  const ids = deleteIds.value;
  await messageTypeStore.removeMessageType(ids);
  await onSearch();
};
