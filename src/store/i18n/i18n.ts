import { defineStore } from 'pinia';
import { fetchAddI18n, fetchDeleteI18n, fetchGetI18n, fetchGetI18nList, fetchUpdateI18n } from '@/api/v1/i18n';
import { pageSizes } from '@/enums/baseConstant';
import { storeMessage } from '@/utils/message';
import { storePagination } from '@/store/useStorePagination';

export const userI18nStore = defineStore('i18nStore', {
	persist: true,
	state() {
		return {
			// ? 多语言内容
			i18n: {},
			// 多语言列表
			datalist: [],
			// 查询表单
			form: { keyName: '', translation: '', typeName: '' },
			isAddShown: false,
			// ? 分页查询结果
			pagination: {
				currentPage: 1,
				pageSize: 150,
				total: 100,
				pageSizes,
				background: true,
			},
			// 加载
			loading: false,
		};
	},
	getters: {},
	actions: {
		/** 获取多语言 */
		async fetchI18n() {
			const result = await fetchGetI18n();

			if (result.code === 200) {
				localStorage.removeItem('i18nStore');
				// 当前的返回参数
				const data = result.data;
				// 将返回对象中key设置name，后端不好设置
				for (let key in data) if (key !== 'local') data[key].name = key;

				// 赋值返回参数
				this.i18n = data;
			}
		},

		/** 获取多语言列表 */
		async getI18nMangeList() {
			const data = { ...this.pagination, ...this.form };
			delete data.pageSizes;
			delete data.total;
			delete data.background;
			const result = await fetchGetI18nList(data);

			// 公共页面函数hook
			const pagination = storePagination.bind(this);
			return pagination(result);
		},

		/** 添加多语言 */
		async addI18n(data: any) {
			const result = await fetchAddI18n(data);
			return storeMessage(result);
		},

		/** 更新多语言 */
		async updateI18n(data: any) {
			const result = await fetchUpdateI18n(data);
			return storeMessage(result);
		},

		/** 删除多语言 */
		async deleteI18n(data: any) {
			const result = await fetchDeleteI18n(data);
			return storeMessage(result);
		},
	},
});
