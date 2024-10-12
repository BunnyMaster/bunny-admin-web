import { defineStore } from 'pinia';
import { fetchAddFiles, fetchDeleteFiles, fetchGetFilesList, fetchUpdateFiles } from '@/api/v1/files';
import { pageSizes } from '@/enums/baseConstant';
import { storeMessage } from '@/utils/message';
import { storePagination } from '@/store/useStorePagination';

/**
 * 系统文件表 Store
 */
export const useFilesStore = defineStore('filesStore', {
	state() {
		return {
			// 系统文件表列表
			datalist: [],
			// 查询表单
			form: {
				// 文件的名称
				filename: undefined,
				// 文件在服务器上的存储路径
				filepath: undefined,
				// 文件的MIME类型
				fileType: undefined,
				// 下载数量
				downloadCount: undefined,
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
		/** 获取系统文件表 */
		async getFilesList() {
			// 整理请求参数
			const data = { ...this.pagination, ...this.form };
			delete data.pageSizes;
			delete data.total;
			delete data.background;

			// 获取系统文件表列表
			const result = await fetchGetFilesList(data);

			// 公共页面函数hook
			const pagination = storePagination.bind(this);
			return pagination(result);
		},

		/** 添加系统文件表 */
		async addFiles(data: any) {
			const result = await fetchAddFiles(data);
			return storeMessage(result);
		},

		/** 修改系统文件表 */
		async updateFiles(data: any) {
			const result = await fetchUpdateFiles(data);
			return storeMessage(result);
		},

		/** 删除系统文件表 */
		async deleteFiles(data: any) {
			const result = await fetchDeleteFiles(data);
			return storeMessage(result);
		},
	},
});