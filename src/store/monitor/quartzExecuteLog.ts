import { defineStore } from 'pinia';
import { fetchDeleteQuartzExecuteLog, fetchGetQuartzExecuteLogList } from '@/api/v1/log/quartzExecuteLog';
import { pageSizes } from '@/enums/baseConstant';
import { storeMessage } from '@/utils/message';
import { storePagination } from '@/store/useStorePagination';

/**
 * 调度任务执行日志 Store
 */
export const useQuartzExecuteLogStore = defineStore('quartzExecuteLogStore', {
  state() {
    return {
      // 调度任务执行日志列表
      datalist: [],
      // 查询表单
      form: {
        // 任务名称
        jobName: undefined,
        // 任务分组
        jobGroup: undefined,
        // 执行任务类名
        jobClassName: undefined,
        // 执行任务core表达式
        cronExpression: undefined,
        // 触发器名称
        triggerName: undefined,
        // 结束时间
        endTime: undefined,
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
    /** 获取调度任务执行日志 */
    async getQuartzExecuteLogList() {
      // 整理请求参数
      const data = { ...this.pagination, ...this.form };
      delete data.pageSizes;
      delete data.total;
      delete data.background;

      // 获取调度任务执行日志列表
      const result = await fetchGetQuartzExecuteLogList(data);

      // 公共页面函数hook
      const pagination = storePagination.bind(this);
      return pagination(result);
    },

    /** 删除调度任务执行日志 */
    async deleteQuartzExecuteLog(data: any) {
      const result = await fetchDeleteQuartzExecuteLog(data);
      return storeMessage(result);
    },
  },
});
