import { defineStore } from 'pinia';
import { getMenuIconList } from '@/api/v1/system';

export const userMenuIconStore = defineStore('menuIconStore', {
	state() {
		return {
			menuIconList: [],
			menuIconPage: { page: 1, limit: 30, total: 0 },
		};
	},
	getters: {},
	actions: {
		/**
		 * * 获取系统图标列表
		 */
		async getMenuIconList() {
			const result = await getMenuIconList(this.menuIconPage);
			if (result.code === 200) {
				this.menuIconList = result.data.list;
			}
		},
	},
});
