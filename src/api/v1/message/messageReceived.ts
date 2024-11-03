import { http } from '@/api/service/request';
import type { BaseResult, ResultTable } from '@/api/service/types';

/** 管理员操作用户消息---获取系统管理消息列表 */
export const fetchGetMessageReceivedList = (data: any) => {
	return http.request<BaseResult<ResultTable>>('get', `messageReceived/getMessageReceivedList/${data.currentPage}/${data.pageSize}`, { params: data });
};

/** 管理员操作用户消息---将用户消息标为已读 */
export const fetchMarkMessageReceivedAsRead = (data: any) => {
	return http.request<BaseResult<object>>('put', 'messageReceived/markMessageReceivedAsRead', { data });
};

/** 管理员操作用户消息---管理删除用户消息 */
export const fetchDeleteMessageReceivedByIds = (data: any) => {
	return http.request<BaseResult<object>>('delete', 'messageReceived/deleteMessageReceivedByIds', { data });
};
