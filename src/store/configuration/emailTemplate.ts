import { defineStore } from 'pinia';
import { createEmailTemplate, deleteEmailTemplate, getEmailTemplatePage, getEmailTypeList, updateEmailTemplate } from '@/api/v1/email/emailTemplate';
import { pageSizes } from '@/enums/baseConstant';
import { storeMessage } from '@/utils/message';
import { storePagination } from '@/store/useStorePagination';

/**
 * 邮件模板表 Store
 */
export const useEmailTemplateStore = defineStore('emailTemplateStore', {
  state() {
    return {
      // 邮件模板表列表
      datalist: [],
      // 邮件类型枚举
      allEmailTypes: [],
      // 查询表单
      form: {
        // 模板名称
        templateName: undefined,
        // 主题
        subject: undefined,
        // 邮件内容
        body: undefined,
        // 邮件类型
        type: undefined,
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
  getters: {},
  actions: {
    /** 获取邮件模板表 */
    async fetchEmailTemplatePage() {
      // 整理请求参数
      const data = { ...this.pagination, ...this.form };
      delete data.pageSizes;
      delete data.total;
      delete data.background;

      // 获取邮件模板表列表
      const result = await getEmailTemplatePage(data);

      // 公共页面函数hook
      const pagination = storePagination.bind(this);
      return pagination(result);
    },

    /** 获取模板类型字段 */
    async loadEmailTypeList() {
      const result = await getEmailTypeList();
      if (result.code !== 200) return;
      this.allEmailTypes = result.data;
    },

    /** 添加邮件模板表 */
    async addEmailTemplate(data: any) {
      const result = await createEmailTemplate(data);
      return storeMessage(result);
    },

    /** 修改邮件模板表 */
    async editEmailTemplate(data: any) {
      const result = await updateEmailTemplate(data);
      return storeMessage(result);
    },

    /** 删除邮件模板表 */
    async removeEmailTemplate(data: any) {
      const result = await deleteEmailTemplate(data);
      return storeMessage(result);
    },
  },
});
