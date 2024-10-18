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
				ipAddress: undefined,
				// 登录Ip归属地
				ipRegion: undefined,
				// 登录时代理
				userAgent: undefined,
				// 操作类型
				type: undefined,
				// 标识客户端是否是通过Ajax发送请求的
				xRequestedWith: undefined,
				// 用户代理的品牌和版本
				secChUa: undefined,
				// 用户代理的底层平台架构
				secChUaArch: undefined,
				// 用户代理的底层CPU架构位数
				secChUaBitness: undefined,
				// 用户代理是否在手机设备上运行
				secChUaMobile: undefined,
				// 用户代理的设备模型
				secChUaModel: undefined,
				// 用户代理的底层操作系统/平台
				secChUaPlatform: undefined,
				// 用户代理的底层操作系统版本
				secChUaPlatformVersion: undefined,
				// 客户端设备像素比
				contentDpr: undefined,
				// 客户端RAM内存的近似值
				deviceMemory: undefined,
				// 客户端设备像素比
				dpr: undefined,
				// 布局视口宽度
				viewportWidth: undefined,
				// 所需资源宽度
				width: undefined,
				// 客户端连接到服务器的近似带宽
				downlink: undefined,
				// 有效连接类型
				ect: undefined,
				// 应用层往返时间
				rtt: undefined,
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
