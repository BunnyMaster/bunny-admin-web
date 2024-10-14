import { defineStore } from 'pinia';
import { fetchAddEmailTemplate, fetchDeleteEmailTemplate, fetchGetEmailTemplateList, fetchUpdateEmailTemplate } from '@/api/v1/emailTemplate';
import { pageSizes } from '@/enums/baseConstant';
import { storeMessage } from '@/utils/message';
import { storePagination } from '@/store/useStorePagination';
import { fetchGetAllMailboxConfigurationUsers } from '@/api/v1/emailUsers';

/**
 * 邮件模板表 Store
 */
export const useEmailTemplateStore = defineStore('emailTemplateStore', {
	state() {
		return {
			// 邮件模板表列表
			datalist: [],
			// 邮件模板用户列表
			emailUserList: [],
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
				pageSize: 150,
				total: 100,
				pageSizes,
			},
			// 加载
			loading: false,
		};
	},
	getters: {
		getMailboxConfigurationUser(state) {
			const map = {};
			state.emailUserList.forEach(user => (map[user.value] = user.key));
			return map;
		},
	},
	actions: {
		/** 获取邮件模板表 */
		async getEmailTemplateList() {
			// 整理请求参数
			const data = { ...this.pagination, ...this.form };
			delete data.pageSizes;
			delete data.total;
			delete data.background;

			// 获取邮件模板表列表
			const result = await fetchGetEmailTemplateList(data);

			// 公共页面函数hook
			const pagination = storePagination.bind(this);
			return pagination(result);
		},

		/** 获取所有邮箱配置用户 */
		async getAllMailboxConfigurationUsers() {
			const result = await fetchGetAllMailboxConfigurationUsers();
			if (result.code !== 200) return;

			this.emailUserList = result.data;
		},

		/** 添加邮件模板表 */
		async addEmailTemplate(data: any) {
			const result = await fetchAddEmailTemplate(data);
			return storeMessage(result);
		},

		/** 修改邮件模板表 */
		async updateEmailTemplate(data: any) {
			const result = await fetchUpdateEmailTemplate(data);
			return storeMessage(result);
		},

		/** 删除邮件模板表 */
		async deleteEmailTemplate(data: any) {
			const result = await fetchDeleteEmailTemplate(data);
			return storeMessage(result);
		},
	},
});
