import { computed, ref } from 'vue';
import { throttle } from '@pureadmin/utils';
import { ElNotification, ElTag } from 'element-plus';
import { getMessageReceivedPageByUser } from '@/api/v1/message/messageReceived';
import { $t } from '@/plugins/i18n';

export interface ListItem {
  messageId: string;
  cover: string;
  title: string;
  datetime: string;
  type: string;
  description: string;
  messageType: string;
  status?: 'primary' | 'success' | 'warning' | 'info' | 'danger';
  extra?: string;
}

export interface TabItem {
  key: string;
  name: string;
  list: ListItem[];
  emptyText: string;
}

// 请求参数
const form = { status: false, currentPage: 1, pageSize: 100 };
// 响应内容
export const noticesData = ref<TabItem[]>([]);

// 通知消息数据
export const noticesNum = ref(0);
export const notices = ref(noticesData);
// 选择的消息栏目
export const activeKey = ref(noticesData.value[0]?.key);
export const getLabel = computed(() => (item) => item.name + (item.list.length > 0 ? `(${item.list.length})` : ''));

/** 获取所有消息 */
export const getAllMessageList = async () => {
  const baseResult = await getMessageReceivedPageByUser(form);
  const datalist = baseResult?.data?.list;

  // 通知消息
  const notifications = datalist
    .filter((message) => message.messageType === 'notifications')
    .map((message) => ({
      messageId: message.id,
      cover: message.cover,
      title: message.title,
      datetime: message.createTime,
      description: message.summary,
      messageType: message.messageType,
      type: '1',
      status: message.level ? message.level : 'info',
      extra: message.extra,
    })) as ListItem[];

  // 消息
  const notify = datalist
    .filter((message) => message.messageType !== 'notifications' && message.messageType !== 'sys')
    .map((message) => ({
      messageId: message.id,
      cover: message.cover,
      description: message.summary,
      messageType: message.messageType,
      title: message.title,
      datetime: message.createTime,
      type: '2',
      status: message.level ? message.level : 'info',
      extra: message.extra,
    })) as ListItem[];

  // 系统消息
  const system = datalist
    .filter((message) => message.messageType === 'sys')
    .map((message) => ({
      messageId: message.id,
      cover: message.cover,
      description: message.summary,
      messageType: message.messageType,
      title: message.title,
      datetime: message.createTime,
      type: '3',
      status: message.level ? message.level : 'info',
      extra: message.extra,
    })) as ListItem[];

  noticesData.value = [
    { key: '1', name: $t('status.pureNotify'), list: notifications, emptyText: $t('status.pureNoNotify') },
    { key: '2', name: $t('status.pureMessage'), list: notify, emptyText: $t('status.pureNoMessage') },
    { key: '3', name: $t('status.systemMessage'), list: system, emptyText: $t('status.systemMessage') },
  ];

  // 调用浏览器系统通知
  showNotification([...system, ...notify, ...notifications]);
};

/** 计算消息数量 */
export const computedNoticesNum = throttle(async () => {
  // 获取所有的消息
  await getAllMessageList();
  // 请求成功后将原本条数置为0
  noticesNum.value = 0;
  // 整合消息一共多少条
  notices.value.map((v) => (noticesNum.value += v.list.length));
  // 默认选中的消息类别
  activeKey.value = noticesData.value[0]?.key;
  // 定时刷新
}, 666);

/** 显示通知消息 */
const showNotification = (NotificationList) => {
  if (NotificationList.length > 0) {
    NotificationList.forEach((message) => {
      ElNotification({
        title: message?.title,
        message: (
          <div class="flex ">
            <img src={message.cover} alt="" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
            <div class="flex justify-between mt-3 mx-2">
              <span class="mr-2">{message.description}</span>
              {message.status && <ElTag type={message.status}>{message?.extra}</ElTag>}
            </div>
          </div>
        ),
        position: 'bottom-right',
      });
    });
  }
};
