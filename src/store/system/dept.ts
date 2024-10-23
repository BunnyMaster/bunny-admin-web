import { defineStore } from 'pinia';
import { fetchAddDept, fetchDeleteDept, fetchGetAllDeptList, fetchGetDeptList, fetchUpdateDept } from '@/api/v1/dept';
import { pageSizes } from '@/enums/baseConstant';
import { storeMessage } from '@/utils/message';
import { storePagination } from '@/store/useStorePagination';

/**
 * 部门 Store
 */
export const useDeptStore = defineStore('deptStore', {
	state() {
		return {
			// 部门列表
			datalist: [],
			// 所有部门列表
			allDeptList: [],
			// 查询表单
			form: {
				// 部门名称
				deptName: undefined,
				// 部门简介
				summary: undefined,
				// 备注信息
				remarks: undefined,
			},
			// 分页查询结果
			pagination: {
				currentPage: 1,
				pageSize: 30,
				total: 1,
				pageSizes,
			},
			// 加载
			loading: false,
		};
	},
	getters: {},
	actions: {
		/** 获取部门 */
		async getDeptList() {
			// 整理请求参数
			const data = { ...this.pagination, ...this.form };
			delete data.pageSizes;
			delete data.total;
			delete data.background;

			// 获取部门列表
			const result = await fetchGetDeptList(data);

			// 公共页面函数hook
			const pagination = storePagination.bind(this);
			return pagination(result);
		},

		/** 获取所有部门列表 */
		async getAllDeptList() {
			const result = await fetchGetAllDeptList();
			if (result.code !== 200) return;
			this.allDeptList = result.data;
		},

		/** 添加部门 */
		async addDept(data: any) {
			const result = await fetchAddDept(data);
			return storeMessage(result);
		},

		/** 修改部门 */
		async updateDept(data: any) {
			const result = await fetchUpdateDept(data);
			return storeMessage(result);
		},

		/** 删除部门 */
		async deleteDept(data: any) {
			const result = await fetchDeleteDept(data);
			return storeMessage(result);
		},
	},
});
