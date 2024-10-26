import { defineStore } from 'pinia';
import { storeMessage } from '@/utils/message';
import { handleTree } from '@/utils/tree';
import {
	fetchAddMenu,
	fetchAssignRolesToRouter,
	fetchClearAllRolesSelect,
	fetchDeletedMenuByIds,
	fetchGetMenusList,
	fetchGetRoleListByRouterId,
	fetchUpdateMenu,
	fetchUpdateMenuByIdWithRank,
} from '@/api/v1/menu';
import { isAllEmpty } from '@pureadmin/utils';
import { $t } from '@/plugins/i18n';

export const userMenuStore = defineStore('menuStore', {
	state() {
		return {
			datalist: [],
			form: { title: undefined },
			loading: false,
		};
	},
	getters: {},
	actions: {
		/** 获取菜单列表 */
		async getMenuList() {
			const result = await fetchGetMenusList({ ...this.pagination });
			if (result.code !== 200) return false;

			// 前端搜索菜单名称
			const title = this.form.title;
			let newData: Array<any> = result.data;
			if (!isAllEmpty(title)) {
				newData = newData.filter(item => $t(item.title).includes(title));
			}
			this.datalist = handleTree(newData);
			return true;
		},

		/** 添加菜单 */
		async addMenu(data: object) {
			const result = await fetchAddMenu(data);
			return storeMessage(result);
		},

		/** 更新菜单 */
		async updateMenu(data: object) {
			const result = await fetchUpdateMenu(data);
			return storeMessage(result);
		},

		/** 快速更新菜单排序 */
		async updateMenuByIdWithRank(data: object) {
			const result = await fetchUpdateMenuByIdWithRank(data);
			return storeMessage(result);
		},

		/** 删除菜单 */
		async deletedMenuByIds(data: object) {
			const result = await fetchDeletedMenuByIds(data);
			return storeMessage(result);
		},

		/** 根据路由id获取角色列表 */
		async getRoleListByRouterId(data: any) {
			const result = await fetchGetRoleListByRouterId(data);
			if (result.code !== 200) return;
			return result.data;
		},

		/** 为路由分配角色 */
		async assignRolesToRouter(data: any) {
			const result = await fetchAssignRolesToRouter(data);
			return storeMessage(result);
		},

		/** 清除选中菜单所有角色 */
		async clearAllRolesSelect(data: any) {
			const result = await fetchClearAllRolesSelect(data);
			return storeMessage(result);
		},
	},
});
