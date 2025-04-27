import { defineStore } from 'pinia';
import {
  createSchedulers,
  deleteSchedulers,
  getScheduleJobList,
  getSchedulersPage,
  updateSchedulers,
  updateSchedulersByPause,
  updateSchedulersByResume,
} from '@/api/v1/schedulers/schedulers';
import { pageSizes } from '@/enums/baseConstant';
import { storeMessage } from '@/utils/message';
import { storePagination } from '@/store/useStorePagination';

/**
 * Schedulers视图 Store
 */
export const useSchedulersStore = defineStore('schedulersStore', {
  state() {
    return {
      // Schedulers视图列表
      datalist: [],
      // Schedulers视图列表
      allScheduleJobList: [],
      // 查询表单
      form: {
        // 任务名称
        jobName: undefined,
        // 任务分组
        jobGroup: undefined,
        // 任务详情
        description: undefined,
        // 任务类名称
        jobClassName: undefined,
        // 触发器名称
        triggerName: undefined,
        // triggerState触发器状态
        triggerState: undefined,
        // 执行方法
        jobMethodName: undefined,
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
    /** 获取Schedulers视图 */
    async fetchSchedulersPage() {
      // 整理请求参数
      const data = { ...this.pagination, ...this.form };
      delete data.pageSizes;
      delete data.total;
      delete data.background;

      // 获取Schedulers视图列表
      const result = await getSchedulersPage(data);

      // 公共页面函数hook
      const pagination = storePagination.bind(this);
      return pagination(result);
    },

    /** 获取所有可用调度任务 */
    async loadScheduleJobList() {
      const result = await getScheduleJobList();
      if (result.code !== 200) return;
      this.allScheduleJobList = result.data;
    },

    /** 添加Schedulers视图 */
    async addSchedulers(data: any) {
      const result = await createSchedulers(data);
      return storeMessage(result);
    },

    /** 修改Schedulers视图 */
    async editSchedulers(data: any) {
      const result = await updateSchedulers(data);
      return storeMessage(result);
    },

    /** 删除Schedulers视图 */
    async removeSchedulers(data: any) {
      const result = await deleteSchedulers(data);
      return storeMessage(result);
    },

    /** 暂停任务 */
    async pauseSchedulers(data: any) {
      const result = await updateSchedulersByPause(data);
      return storeMessage(result);
    },

    /** 恢复任务 */
    async resumeSchedulers(data: any) {
      const result = await updateSchedulersByResume(data);
      return storeMessage(result);
    },
  },
});
