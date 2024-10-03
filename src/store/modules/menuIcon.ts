import { defineStore } from 'pinia';
import { fetchAddMenuIcon, fetchDeleteMenuIcon, fetchGetMenuIconList, fetchUpdateMenuIcon } from '@/api/v1/menuIcon';
import { pageSizes } from '@/enums/baseConstant';
import { storeMessage } from '@/utils/message';
import { storePagination } from '@/store/useStorePagination';

/**
 * 系统菜单图标 Store
 */
export const useMenuIconStore = defineStore('menuIconStore', {
	state() {
		return {
			// 系统菜单图标列表
			datalist: [],
			// 查询表单
			form: {
				// icon 名称
				iconName: undefined,
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
		 * * 获取系统菜单图标
		 */
		async getMenuIconList() {
			const data = { ...this.pagination, ...this.form };
			delete data.pageSizes;
			delete data.total;
			delete data.background;
			const response = await fetchGetMenuIconList(data);

			// 公共页面函数hook
			const pagination = storePagination.bind(this);
			return pagination(response);
		},

		/**
		 * * 添加系统菜单图标
		 */
		async addMenuIcon(data: any) {
			const result = await fetchAddMenuIcon(data);
			return storeMessage(result);
		},

		/**
		 * * 修改系统菜单图标
		 */
		async updateMenuIcon(data: any) {
			const result = await fetchUpdateMenuIcon(data);
			return storeMessage(result);
		},

		/**
		 * * 删除系统菜单图标
		 */
		async deleteMenuIcon(data: any) {
			const result = await fetchDeleteMenuIcon(data);
			return storeMessage(result);
		},
	},
});
