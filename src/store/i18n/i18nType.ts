import { defineStore } from 'pinia';
import { fetchAddI18nType, fetchDeleteI18nType, fetchGetI18nTypeList, fetchUpdateI18nType } from '@/api/v1/i18n';
import { pageSizes } from '@/enums/baseConstant';
import { storeMessage } from '@/utils/message';

export const userI18nTypeStore = defineStore('i18nTypeStore', {
  state() {
    return {
      // 多语言列表
      datalist: [],
      // 查询表单
      form: { typeName: undefined, summary: undefined },
      isAddShown: false,
      // ? 分页查询结果
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
  getters: {
    translationTypeList(state) {
      return state.datalist.map((item) => ({ key: item.typeName, value: item.summary }));
    },
  },
  actions: {
    /**
     * * 获取多语言类型
     */
    async getI18nTypeList() {
      const result = await fetchGetI18nTypeList(this.form);
      if (result.code === 200) {
        this.datalist = result.data;
        return true;
      }
      return false;
    },

    /**
     * * 添加多语言类型
     */
    async addI18nType(data: any) {
      const result = await fetchAddI18nType(data);
      return storeMessage(result);
    },

    /**
     * * 修改多语言类型
     */
    async updateI18nType(data: any) {
      const result = await fetchUpdateI18nType(data);
      return storeMessage(result);
    },

    /**
     * * 删除多语言类型
     */
    async deleteI18nType(data: any) {
      const result = await fetchDeleteI18nType(data);
      return storeMessage(result);
    },
  },
});
