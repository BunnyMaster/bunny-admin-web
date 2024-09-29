import { defineStore } from 'pinia';
import { addMenu, deletedMenuByIds, updateMenu } from '@/api/v1/system';
import { storeMessage } from '@/utils/message';

export const userRouterStore = defineStore('routerStore', {
	state() {
		return {};
	},
	getters: {},
	actions: {
		/**
		 * * 添加菜单
		 * @param data
		 */
		async addMenu(data: object) {
			const result = await addMenu(data);
			return storeMessage(result);
		},

		/**
		 * * 更新菜单
		 * @param data
		 */
		async updateMenu(data: object) {
			const result = await updateMenu(data);
			return storeMessage(result);
		},

		/**
		 * * 删除菜单
		 * @param data
		 */
		async deletedMenuByIds(data: object) {
			const result = await deletedMenuByIds(data);
			return storeMessage(result);
		},
	},
});
