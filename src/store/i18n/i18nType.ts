import { defineStore } from 'pinia';
import { createI18Type, deleteI18nType, getI18nTypeList, updateI18nType } from '@/api/v1/i18n';
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
      return state.datalist.map((item) => ({
        key: item.typeName,
        value: item.summary,
      }));
    },
  },
  actions: {
    /* 获取多语言类型 */
    async loadI18nTypeList() {
      const result = await getI18nTypeList(this.form);
      if (result.code === 200) {
        this.datalist = result.data as any;
        return true;
      }
      return false;
    },

    /* 添加多语言类型 */
    async addI18nType(data: any) {
      const result = await createI18Type(data);
      return storeMessage(result);
    },

    /* 修改多语言类型 */
    async editI18nType(data: any) {
      const result = await updateI18nType(data);
      return storeMessage(result);
    },

    /* 删除多语言类型 */
    async removeI18nType(data: any) {
      const result = await deleteI18nType(data);
      return storeMessage(result);
    },
  },
});
