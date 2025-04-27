import { defineStore } from 'pinia';
import {
  createSchedulersGroup,
  deleteSchedulersGroup,
  getSchedulersGroupList,
  getSchedulersGroupPage,
  updateSchedulersGroup,
} from '@/api/v1/schedulers/schedulersGroup';
import { pageSizes } from '@/enums/baseConstant';
import { storeMessage } from '@/utils/message';
import { storePagination } from '@/store/useStorePagination';

/**
 * 任务调度分组 Store
 */
export const useSchedulersGroupStore = defineStore('schedulersGroupStore', {
  state() {
    return {
      // 任务调度分组列表
      datalist: [],
      // 所有任务分组
      allSchedulersGroup: [],
      // 查询表单
      form: {
        // 分组名称
        groupName: undefined,
        // 分组详情
        description: undefined,
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
    /** 获取任务调度分组 */
    async fetchSchedulersGroupPage() {
      // 整理请求参数
      const data = { ...this.pagination, ...this.form };
      delete data.pageSizes;
      delete data.total;
      delete data.background;

      // 获取任务调度分组列表
      const result = await getSchedulersGroupPage(data);

      // 公共页面函数hook
      const pagination = storePagination.bind(this);
      return pagination(result);
    },

    /** 获取所有任务调度分组 */
    async loadSchedulersGroupList() {
      const result = await getSchedulersGroupList();
      if (result.code !== 200) return;
      this.allSchedulersGroup = result.data;
    },

    /** 添加任务调度分组 */
    async addSchedulersGroup(data: any) {
      const result = await createSchedulersGroup(data);
      return storeMessage(result);
    },

    /** 修改任务调度分组 */
    async editSchedulersGroup(data: any) {
      const result = await updateSchedulersGroup(data);
      return storeMessage(result);
    },

    /** 删除任务调度分组 */
    async removeSchedulersGroup(data: any) {
      const result = await deleteSchedulersGroup(data);
      return storeMessage(result);
    },
  },
});
