import { defineStore } from 'pinia';
import { deleteMessageReceivedByAdmin, getMessageReceivedPage, updateMessageReceivedByAdmin } from '@/api/v1/message/messageReceived';
import { pageSizes } from '@/enums/baseConstant';
import { storeMessage } from '@/utils/message';
import { storePagination } from '@/store/useStorePagination';

/**
 * 系统消息 Store
 */
export const useMessageReceivedStore = defineStore('messageReceivedStore', {
  state() {
    return {
      // 系统消息列表
      datalist: [],
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
    /** 管理员操作用户消息---获取系统管理消息列表 */
    async fetchMessageReceivedPage() {
      // 整理请求参数
      const data = { ...this.pagination, ...this.form };
      delete data.pageSizes;
      delete data.total;
      delete data.background;

      // 获取系统消息列表
      const result = await getMessageReceivedPage(data);

      // 公共页面函数hook
      const pagination = storePagination.bind(this);
      return pagination(result);
    },

    /** 管理员操作用户消息---将用户消息标为已读 */
    async editMessageReceived(data: any) {
      const result = await updateMessageReceivedByAdmin(data);
      return storeMessage(result);
    },

    /** 删除系统消息 */
    async removeMessageReceivedByAdmin(data: any) {
      const result = await deleteMessageReceivedByAdmin(data);
      return storeMessage(result);
    },
  },
});
