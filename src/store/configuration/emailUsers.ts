import { defineStore } from 'pinia';
import { createEmailUsers, deleteEmailUsers, getEmailUserList, getEmailUserPage, updateEmailUsers } from '@/api/v1/email/emailUsers';
import { pageSizes } from '@/enums/baseConstant';
import { storeMessage } from '@/utils/message';
import { storePagination } from '@/store/useStorePagination';

/**
 * 邮箱用户发送配置 Store
 */
export const useEmailUsersStore = defineStore('emailUsersStore', {
  state() {
    return {
      // 邮箱用户发送配置列表
      datalist: [],
      // 邮件模板用户列表
      emailUserList: [],
      // 查询表单
      form: {
        // 邮箱
        email: undefined,
        // Host地址
        host: undefined,
        // 端口号
        port: undefined,
        // 邮箱协议
        smtpAgreement: undefined,
        // 是否启用SSL
        openSSL: undefined,
      },
      // 分页查询结果
      pagination: {
        currentPage: 1,
        pageSize: 30,
        total: 1,
        pageSizes,
      },
      // 加载
      loading: false,
    };
  },
  getters: {
    getMailboxConfigurationUser(state) {
      const map = {};
      state.emailUserList.forEach((user) => (map[user.value] = user.key));
      return map;
    },
  },
  actions: {
    /* 获取邮箱用户发送配置 */
    async fetchEmailUserPage() {
      // 整理请求参数
      const data = { ...this.pagination, ...this.form };
      delete data.pageSizes;
      delete data.total;
      delete data.background;

      // 获取邮箱用户发送配置列表
      const result = await getEmailUserPage(data);

      // 公共页面函数hook
      const pagination = storePagination.bind(this);
      return pagination(result);
    },

    /** 获取所有邮箱配置用户 */
    async loadEmailUserList() {
      const result = await getEmailUserList();
      if (result.code !== 200) return;

      this.emailUserList = result.data;
    },

    /** 添加邮箱用户发送配置 */
    async addEmailUsers(data: any) {
      const result = await createEmailUsers(data);
      return storeMessage(result);
    },

    /** 修改邮箱用户发送配置 */
    async editEmailUsers(data: any) {
      const result = await updateEmailUsers(data);
      return storeMessage(result);
    },

    /** 删除邮箱用户发送配置 */
    async removeEmailUsers(data: any) {
      const result = await deleteEmailUsers(data);
      return storeMessage(result);
    },
  },
});
