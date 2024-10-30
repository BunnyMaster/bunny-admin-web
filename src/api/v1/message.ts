import { http } from '@/api/service/request';
import type { BaseResult, ResultTable } from '@/api/service/types';

/** 系统消息---获取系统消息列表 */
export const fetchGetMessageList = (data: any) => {
	return http.request<BaseResult<ResultTable>>('get', `message/getMessageList/${data.currentPage}/${data.pageSize}`, { params: data });
};

/** 系统消息---添加系统消息 */
export const fetchAddMessage = (data: any) => {
	return http.request<BaseResult<object>>('post', 'message/addMessage', { data });
};

/** 系统消息---更新系统消息 */
export const fetchUpdateMessage = (data: any) => {
	return http.request<BaseResult<object>>('put', 'message/updateMessage', { data });
};

/** 系统消息---删除系统消息 */
export const fetchDeleteMessage = (data: any) => {
	return http.request<BaseResult<object>>('delete', 'message/deleteMessage', { data });
};
