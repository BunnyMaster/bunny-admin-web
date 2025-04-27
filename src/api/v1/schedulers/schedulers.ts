import { http } from '@/api/service/request';
import type { BaseResult, ResultTable } from '@/api/service/types';

/** Schedulers视图---分页查询任务执行 */
export const getSchedulersPage = (data: any) => {
  return http.request<BaseResult<ResultTable>>('get', `schedulers/${data.currentPage}/${data.pageSize}`, {
    params: data,
  });
};

/** Schedulers视图---添加Schedulers视图 */
export const createSchedulers = (data: any) => {
  return http.request<BaseResult<object>>('post', 'schedulers', { data });
};

/** Schedulers视图---更新Schedulers视图 */
export const updateSchedulers = (data: any) => {
  return http.request<BaseResult<object>>('put', 'schedulers', { data });
};

/** Schedulers视图---删除Schedulers视图 */
export const deleteSchedulers = (data: any) => {
  return http.request<BaseResult<object>>('delete', 'schedulers', { data });
};

/** Schedulers视图---获取所有可用调度任务 */
export const getScheduleJobList = () => {
  return http.request<BaseResult<ResultTable>>('get', 'schedulers/private');
};

/** Schedulers视图---暂停任务 */
export const updateSchedulersByPause = (data: any) => {
  return http.request<BaseResult<object>>('put', 'schedulers/pause', { data });
};

/** Schedulers视图---恢复任务 */
export const updateSchedulersByResume = (data: any) => {
  return http.request<BaseResult<object>>('put', 'schedulers/resume', { data });
};
