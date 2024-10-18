import { defineStore } from 'pinia';
import { fetchDeleteUserLoginLog, fetchGetUserLoginLogList, fetchUpdateUserLoginLog } from '@/api/v1/userLoginLog';
import { pageSizes } from '@/enums/baseConstant';
import { storeMessage } from '@/utils/message';
import { storePagination } from '@/store/useStorePagination';

/**
 * 用户登录日志 Store
 */
export const useUserLoginLogStore = defineStore('userLoginLogStore', {
	state() {
		return {
			// 用户登录日志列表
			datalist: [],
			// 查询表单
			form: {
				// 用户Id
				userId: undefined,
				// 用户名
				username: undefined,
				// 登录token
				token: undefined,
				// 登录Ip
				ipRegion: undefined,
				// 登录Ip地点
				ipAddress: undefined,
				// 登录时代理
				userAgent: undefined,
				// 操作类型
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
	getters: {},
	actions: {
		/** 获取用户登录日志 */
		async getUserLoginLogList() {
			// 整理请求参数
			const data = { ...this.pagination, ...this.form };
			delete data.pageSizes;
			delete data.total;
			delete data.background;

			// 获取用户登录日志列表
			const result = await fetchGetUserLoginLogList(data);

			// 公共页面函数hook
			const pagination = storePagination.bind(this);
			return pagination(result);
		},

		/** 修改用户登录日志 */
		async updateUserLoginLog(data: any) {
			const result = await fetchUpdateUserLoginLog(data);
			return storeMessage(result);
		},

		/** 删除用户登录日志 */
		async deleteUserLoginLog(data: any) {
			const result = await fetchDeleteUserLoginLog(data);
			return storeMessage(result);
		},
	},
});
