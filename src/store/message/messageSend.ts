import { defineStore } from 'pinia';
import { pageSizes } from '@/enums/baseConstant';
import {
  fetchAddMessage,
  fetchDeleteMessage,
  fetchGetMessageList,
  fetchGetReceivedUserinfoByMessageId,
  fetchUpdateMessage,
} from '@/api/v1/message/messageSend';
import { storePagination } from '@/store/useStorePagination';
import { storeMessage } from '@/utils/message';

export const useMessageSendStore = defineStore('messageSendStore', {
  state() {
    return {
      // 系统消息列表
      datalist: [],
      // 消息接受用戶信息列表
      receivedUserinfoList: [],
      // 查询表单
      form: {
        // 消息标题
        title: undefined,
        // 发送人昵称
        sendNickname: undefined,
        // 消息类型
        messageType: undefined,
        // 编辑器类型
        editorType: undefined,
        // 消息等级
        level: undefined,
        // 消息等级详情
        extra: undefined,
        // 0:未读 1:已读
        status: undefined,
      },
      // 分页查询结果
      pagination: {
        currentPage: 1,
        pageSize: 150,
        total: 100,
        pageSizes,
      },
      // 加载
      loading: false,
    };
  },
  getters: {},
  actions: {
    /** 获取系统消息 */
    async getMessageList() {
      // 整理请求参数
      const data = { ...this.pagination, ...this.form };
      delete data.pageSizes;
      delete data.total;
      delete data.background;

      // 获取系统消息列表
      const result = await fetchGetMessageList(data);

      // 公共页面函数hook
      const pagination = storePagination.bind(this);
      return pagination(result);
    },

    /** 根据消息id获取接收人信息 */
    async getReceivedUserinfoByMessageId(data: any) {
      const result = await fetchGetReceivedUserinfoByMessageId(data);
      if (result.code === 200) {
        this.receivedUserinfoList = result.data;
      }
    },

    /** 添加系统消息 */
    async addMessage(data: any) {
      const result = await fetchAddMessage(data);
      return storeMessage(result);
    },

    /** 修改系统消息 */
    async updateMessage(data: any) {
      const result = await fetchUpdateMessage(data);
      return storeMessage(result);
    },

    /** 删除系统消息 */
    async deleteMessage(data: any) {
      const result = await fetchDeleteMessage(data);
      return storeMessage(result);
    },
  },
});
