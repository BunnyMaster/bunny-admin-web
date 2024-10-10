import { defineStore } from 'pinia';
import { fetchAddEmailUsers, fetchDeleteEmailUsers, fetchGetEmailUsersList, fetchUpdateEmailUsers } from '@/api/v1/emailUsers';
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
			// 查询表单
			form: {
				// 邮箱
				email: undefined,
				// 使用邮件模板
				emailTemplate: undefined,
				// Host地址
				host: undefined,
				// 端口号
				port: undefined,
				// 邮箱协议
				smtpAgreement: undefined,
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
		/**
		 * * 获取邮箱用户发送配置
		 */
		async getEmailUsersList() {
			// 整理请求参数
			const data = { ...this.pagination, ...this.form };
			delete data.pageSizes;
			delete data.total;
			delete data.background;

			// 获取邮箱用户发送配置列表
			const result = await fetchGetEmailUsersList(data);

			// 公共页面函数hook
			const pagination = storePagination.bind(this);
			return pagination(result);
		},

		/**
		 * * 添加邮箱用户发送配置
		 */
		async addEmailUsers(data: any) {
			const result = await fetchAddEmailUsers(data);
			return storeMessage(result);
		},

		/**
		 * * 修改邮箱用户发送配置
		 */
		async updateEmailUsers(data: any) {
			const result = await fetchUpdateEmailUsers(data);
			return storeMessage(result);
		},

		/**
		 * * 删除邮箱用户发送配置
		 */
		async deleteEmailUsers(data: any) {
			const result = await fetchDeleteEmailUsers(data);
			return storeMessage(result);
		},
	},
});
