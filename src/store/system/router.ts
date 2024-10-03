import { defineStore } from 'pinia';
import { addMenu, deletedMenuByIds, getMenusList, updateMenu } from '@/api/v1/system';
import { storeMessage } from '@/utils/message';
import { handleTree } from '@/utils/tree';

export const userRouterStore = defineStore('routerStore', {
	state() {
		return {
			datalist: [],
			form: { title: undefined, visible: undefined },
			loading: false,
		};
	},
	getters: {},
	actions: {
		/**
		 * * 获取菜单列表
		 */
		async getMenuList() {
			const data = { ...this.pagination, ...this.form };
			const result = await getMenusList(data);

			if (result.code === 200) {
				this.datalist = handleTree(result.data as any);
				return true;
			}
			return false;
		},

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
