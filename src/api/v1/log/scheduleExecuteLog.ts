import { http } from '@/api/service/request';
import type { BaseResult, ResultTable } from '@/api/service/types';

/** 调度任务执行日志---分页查询调度任务执行日志 */
export const getScheduleExecuteLogPage = (data: any) => {
  return http.request<BaseResult<ResultTable>>('get', `schedule-execute-log/${data.currentPage}/${data.pageSize}`, {
    params: data,
  });
};

/** 调度任务执行日志---删除调度任务执行日志 */
export const deleteScheduleExecuteLog = (data: any) => {
  return http.request<BaseResult<object>>('delete', 'schedule-execute-log', {
    data,
  });
};
