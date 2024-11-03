import { defineStore } from 'pinia';
import { fetchAddMessageType, fetchDeleteMessageType, fetchGetAllMessageTypes, fetchGetMessageTypeList, fetchUpdateMessageType } from '@/api/v1/message/messageType';
import { pageSizes } from '@/enums/baseConstant';
import { storeMessage } from '@/utils/message';
import { storePagination } from '@/store/useStorePagination';

/**
 * 系统消息类型 Store
 */
export const useMessageTypeStore = defineStore('messageTypeStore', {
	state() {
		return {
			// 系统消息类型列表
			datalist: [],
			// 所有消息类型
			allMessageTypeList: [],
			// 查询表单
			form: {
				// 1:启用 0:禁用
				status: undefined,
				// 消息名称
				messageName: undefined,
				// 发送人昵称
				sendUserNickname: undefined,
				// 消息类型
				messageType: undefined,
				// 消息备注
				summary: undefined,
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
		/** 获取系统消息类型 */
		async getMessageTypeList() {
			// 整理请求参数
			const data = { ...this.pagination, ...this.form };
			delete data.pageSizes;
			delete data.total;
			delete data.background;

			// 获取系统消息类型列表
			const result = await fetchGetMessageTypeList(data);

			// 公共页面函数hook
			const pagination = storePagination.bind(this);
			return pagination(result);
		},

		/** 所有系统类型 */
		async getAllMessageTypeList() {
			const baseResult = await fetchGetAllMessageTypes();
			this.allMessageTypeList = baseResult.data;
		},

		/** 添加系统消息类型 */
		async addMessageType(data: any) {
			const result = await fetchAddMessageType(data);
			return storeMessage(result);
		},

		/** 修改系统消息类型 */
		async updateMessageType(data: any) {
			const result = await fetchUpdateMessageType(data);
			return storeMessage(result);
		},

		/** 删除系统消息类型 */
		async deleteMessageType(data: any) {
			const result = await fetchDeleteMessageType(data);
			return storeMessage(result);
		},
	},
});
