import { http } from '@/api/service/request';
import type { BaseResult, ResultTable } from '@/api/service/types';

/** 任务调度分组---分页查询任务调度分组 */
export const getSchedulersGroupPage = (data: any) => {
  return http.request<BaseResult<ResultTable>>('get', `schedulers-group/${data.currentPage}/${data.pageSize}`, {
    params: data,
  });
};

/** 任务调度分组---添加任务调度分组 */
export const createSchedulersGroup = (data: any) => {
  return http.request<BaseResult<object>>('post', 'schedulers-group', { data });
};

/** 任务调度分组---更新任务调度分组 */
export const updateSchedulersGroup = (data: any) => {
  return http.request<BaseResult<object>>('put', 'schedulers-group', { data });
};

/** 任务调度分组---删除任务调度分组 */
export const deleteSchedulersGroup = (data: any) => {
  return http.request<BaseResult<object>>('delete', 'schedulers-group', {
    data,
  });
};

/** 任务调度分组---获取所有任务调度分组 */
export const getSchedulersGroupList = () => {
  return http.request<BaseResult<ResultTable>>('get', 'schedulers-group/scheduler-groups');
};
