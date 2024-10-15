import { http } from '@/api/service/request';
import type { BaseResult, ResultTable } from '@/api/service/types';

/** 任务调度分组---获取任务调度分组列表 */
export const fetchGetSchedulersGroupList = (data: any) => {
	return http.request<BaseResult<ResultTable>>('get', `schedulersGroup/getSchedulersGroupList/${data.currentPage}/${data.pageSize}`, { params: data });
};

/** 任务调度分组---获取所有任务调度分组 */
export const fetchGetAllSchedulersGroup = () => {
	return http.request<BaseResult<ResultTable>>('get', 'schedulersGroup/getAllSchedulersGroup');
};

/** 任务调度分组---添加任务调度分组 */
export const fetchAddSchedulersGroup = (data: any) => {
	return http.request<BaseResult<object>>('post', 'schedulersGroup/addSchedulersGroup', { data });
};

/** 任务调度分组---更新任务调度分组 */
export const fetchUpdateSchedulersGroup = (data: any) => {
	return http.request<BaseResult<object>>('put', 'schedulersGroup/updateSchedulersGroup', { data });
};

/** 任务调度分组---删除任务调度分组 */
export const fetchDeleteSchedulersGroup = (data: any) => {
	return http.request<BaseResult<object>>('delete', 'schedulersGroup/deleteSchedulersGroup', { data });
};
