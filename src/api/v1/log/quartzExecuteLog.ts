import { http } from '@/api/service/request';
import type { BaseResult, ResultTable } from '@/api/service/types';

/** 调度任务执行日志---获取调度任务执行日志列表 */
export const fetchGetQuartzExecuteLogList = (data: any) => {
	return http.request<BaseResult<ResultTable>>('get', `quartzExecuteLog/getQuartzExecuteLogList/${data.currentPage}/${data.pageSize}`, { params: data });
};

/** 调度任务执行日志---删除调度任务执行日志 */
export const fetchDeleteQuartzExecuteLog = (data: any) => {
	return http.request<BaseResult<object>>('delete', 'quartzExecuteLog/deleteQuartzExecuteLog', { data });
};
