import { createI18n, deleteI18n, downloadI18n, getI18nMap, getI18nPage, updateI18n, uploadI18nFile } from '@/api/v1/i18n';
import { pageSizes } from '@/enums/baseConstant';
import { storePagination } from '@/store/useStorePagination';
import { storeMessage } from '@/utils/message';
import { downloadBlob } from '@/utils/sso';
import { defineStore } from 'pinia';

export const userI18nStore = defineStore('i18nStore', {
  persist: true,
  state() {
    return {
      // ? 多语言内容
      i18n: { local: '' } as any,
      // 多语言列表
      datalist: [],
      // 查询表单
      form: { keyName: '', translation: '', typeName: '' },
      isAddShown: false,
      // ? 分页查询结果
      pagination: {
        currentPage: 1,
        pageSize: 30,
        total: 1,
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
    async loadI18nMap() {
      const result = await getI18nMap();

      if (result.code === 200) {
        localStorage.removeItem('i18nStore');
        // 当前的返回参数
        const data = result.data;
        // 将返回对象中key设置name，后端不好设置
        for (const key in data) if (key !== 'local') data[key].name = key;

        // 赋值返回参数
        this.i18n = data;
      }
    },

    /** 获取多语言列表 */
    async fetchI18nPage() {
      const data = { ...this.pagination, ...this.form };
      delete data.pageSizes;
      delete data.total;
      delete data.background;
      const result = await getI18nPage(data);

      // 公共页面函数hook
      const pagination = storePagination.bind(this);
      return pagination(result);
    },

    /* 下载多语言配置 */
    async downloadI18nFile(params: object) {
      const result = await downloadI18n(params);

      downloadBlob(result, 'i18n.zip');
    },

    /** 添加多语言 */
    async addI18n(data: any) {
      const result = await createI18n(data);
      return storeMessage(result);
    },

    /* 用文件更新多语言 */
    async editI18nByFile(data: any) {
      const result = await uploadI18nFile(data);
      return storeMessage(result);
    },

    /** 更新多语言 */
    async editI18n(data: any) {
      const result = await updateI18n(data);
      return storeMessage(result);
    },

    /** 删除多语言 */
    async removeI18n(data: any) {
      const result = await deleteI18n(data);
      return storeMessage(result);
    },
  },
});
