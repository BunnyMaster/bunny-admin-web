import { defineStore } from 'pinia';
import { fetchAddAdminUser, fetchDeleteAdminUser, fetchGetAdminUserList, fetchUpdateAdminUser } from '@/api/v1/adminUser';
import { pageSizes } from '@/enums/baseConstant';
import { storeMessage } from '@/utils/message';
import { storePagination } from '@/store/useStorePagination';

/**
 * 用户信息 Store
 */
export const useAdminUserStore = defineStore('adminUserStore', {
	state() {
		return {
			// 用户信息列表
			datalist: [],
			// 查询表单
			form: {
				// 用户名
				username: undefined,
				// 昵称
				nickName: undefined,
				// 邮箱
				email: undefined,
				// 手机号
				phone: undefined,
				// 性别
				sex: undefined,
				// 个人描述
				summary: undefined,
				// 状态
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
		/**
		 * * 获取用户信息
		 */
		async getAdminUserList() {
			// 整理请求参数
			const data = { ...this.pagination, ...this.form };
			delete data.pageSizes;
			delete data.total;
			delete data.background;

			// 获取用户信息列表
			const result = await fetchGetAdminUserList(data);

			// 公共页面函数hook
			const pagination = storePagination.bind(this);
			return pagination(result);
		},

		/**
		 * * 添加用户信息
		 */
		async addAdminUser(data: any) {
			const result = await fetchAddAdminUser(data);
			return storeMessage(result);
		},

		/**
		 * * 修改用户信息
		 */
		async updateAdminUser(data: any) {
			const result = await fetchUpdateAdminUser(data);
			return storeMessage(result);
		},

		/**
		 * * 删除用户信息
		 */
		async deleteAdminUser(data: any) {
			const result = await fetchDeleteAdminUser(data);
			return storeMessage(result);
		},
	},
});
