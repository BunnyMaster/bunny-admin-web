import { addDialog } from '@/components/ReDialog/index';
import MessageDialog from '@/views/message-manger/message-send/components/message-dialog.vue';
import { h, reactive, ref, toRaw } from 'vue';
import { messageBox } from '@/utils/message';
import { $t } from '@/plugins/i18n';
import { useAdminUserStore } from '@/store/system/adminUser';
import { decode, encode } from 'js-base64';
import type { UploadRequestOptions } from 'element-plus';
import { uploadImage } from '@/api/v1/system/system';
import { useMessageSendStore } from '@/store/message/messageSend';

export const formRef = ref();
// 删除ids
export const deleteIds = ref([]);
// 用户信息列表
export const userDataList = ref();
// 更新时封面图片
export const coverUrl = ref('');
// 搜索用户加载
export const loading = ref(false);
export const updateMessage = reactive({
  // 消息标题
  title: undefined,
  // 封面
  cover: undefined,
  // 消息接受人ids
  receivedUserIds: [],
  // 发送人用户ID
  sendUserId: undefined,
  // 发送人昵称
  sendNickName: undefined,
  // 消息类型
  messageTypeId: undefined,
  // 消息用户表id
  messageReceivedId: undefined,
  // 消息内容
  content: undefined,
  // 简介
  summary: undefined,
  // 消息等级
  level: undefined,
  // 消息等级类型
  extra: undefined,
  // 编辑器类型
  editorType: undefined,
  // 0:未读 1:已读
  status: undefined,
});
const messageSendStore = useMessageSendStore();
const adminUserStore = useAdminUserStore();

/** 搜索初始化系统消息 */
export async function onSearch() {
  messageSendStore.loading = true;
  await messageSendStore.fetchMessagePage();
  messageSendStore.loading = false;
}

/** 搜索 */
export const onSearchUserinfo = async (keyword: string) => {
  loading.value = true;
  userDataList.value = await adminUserStore.queryUser({ keyword });
  loading.value = false;
};

/* 更新系统消息 */
export async function onUpdate(row: any) {
  // 将表格数据合并到更新数据中
  Object.assign(updateMessage, row);

  // 解码内容
  updateMessage.content = decode(updateMessage.content);

  // 获取当前消息内容和接收者信息
  await messageSendStore.loadReceivedUserinfoByMessageId({ messageId: row.id });
  userDataList.value = messageSendStore.receivedUserinfoList.map((item: any) => ({
    id: item.receivedUserId,
    nickname: item.nickname,
    username: item.username,
  }));
  updateMessage.receivedUserIds = messageSendStore.receivedUserinfoList.map((item: any) => item.receivedUserId);
  // 消息接受去重
  const set = new Set(updateMessage.receivedUserIds);
  updateMessage.receivedUserIds = Array.from(set);

  // 设置封面图片
  coverUrl.value = row.cover;

  addDialog({
    title: `${$t('modify')}${$t('message')}`,
    width: '85%',
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(MessageDialog, { ref: formRef }),
    beforeSure: (done) => {
      formRef.value.formRef.validate(async (valid: any) => {
        if (!valid) return;

        // 将更新的信息进行编码
        const data = toRaw(updateMessage);
        data.content = encode(data.content);

        // 更新消息内容
        const result = await messageSendStore.editMessage({ ...data, id: row.id });
        if (!result) return;
        Object.assign(updateMessage, {});
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
  await messageSendStore.removeMessage([id]);
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
  await messageSendStore.removeMessage(ids);
  await onSearch();
};

/** 上传时 */
export const onUpload = async (options: UploadRequestOptions) => {
  const data = { file: options.file, type: 'message' };
  const result: any = await uploadImage(data);
  coverUrl.value = result.data.thUrl;
  updateMessage.cover = result.data.thUrl;
};
