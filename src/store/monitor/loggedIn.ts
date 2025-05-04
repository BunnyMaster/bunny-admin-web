import { defineStore } from 'pinia';
import { pageSizes } from '@/enums/baseConstant';
import { getCacheLoggedInPage } from '@/api/v1/system/adminUser';
import { storePagination } from '@/store/useStorePagination';

export const useLoggedInStore = defineStore('loggedInStore', {
  state() {
    return {
      datalist: [],
      loading: false,
      pagination: {
        currentPage: 1,
        pageSize: 30,
        total: 1,
        pageSizes,
      },
    };
  },
  getters: {},
  actions: {
    /* 查詢已登錄用戶 */
    async fetchLoggedInPage() {
      // 整理请求参数
      const data = { ...this.pagination };
      delete data.pageSizes;
      delete data.total;

      // 获取调度任务执行日志列表
      const result = await getCacheLoggedInPage(data);

      // 公共页面函数hook
      const pagination = storePagination.bind(this);
      return pagination(result);
    },
  },
});
