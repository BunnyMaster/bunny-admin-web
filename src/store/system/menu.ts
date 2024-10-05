import { defineStore } from 'pinia';
import { storeMessage } from '@/utils/message';
import { handleTree } from '@/utils/tree';
import { fetchAddMenu, fetchAssignRolesToRouter, fetchDeletedMenuByIds, fetchGetMenusList, fetchGetRoleListByRouterId, fetchUpdateMenu } from '@/api/v1/menu';

export const userMenuStore = defineStore('menuStore', {
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
			const result = await fetchGetMenusList(data);

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
			const result = await fetchAddMenu(data);
			return storeMessage(result);
		},

		/**
		 * * 更新菜单
		 * @param data
		 */
		async updateMenu(data: object) {
			const result = await fetchUpdateMenu(data);
			return storeMessage(result);
		},

		/**
		 * * 删除菜单
		 * @param data
		 */
		async deletedMenuByIds(data: object) {
			const result = await fetchDeletedMenuByIds(data);
			return storeMessage(result);
		},

		/**
		 * * 根据路由id获取角色列表
		 * @param data
		 */
		async getRoleListByRouterId(data: any) {
			const result = await fetchGetRoleListByRouterId(data);
			if (result.code !== 200) return;
			return result.data;
		},

		/**
		 * * 为路由分配角色
		 * @param data
		 */
		async assignRolesToRouter(data: any) {
			const result = await fetchAssignRolesToRouter(data);
			return storeMessage(result);
		},
	},
});
