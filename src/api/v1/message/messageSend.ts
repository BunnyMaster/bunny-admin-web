import { http } from '@/api/service/request';
import type { BaseResult, ResultTable } from '@/api/service/types';

/** 系统消息---获取系统管理消息列表 */
export const fetchGetMessageList = (data: any) => {
	return http.request<BaseResult<ResultTable>>('get', `message/getMessageList/${data.currentPage}/${data.pageSize}`, { params: data });
};

/** 系统消息---根据消息id获取接收人信息 */
export const fetchGetReceivedUserinfoByMessageId = (data: any) => {
	return http.request<BaseResult<any>>('get', `messageReceived/noManage/getReceivedUserinfoByMessageId`, { params: data });
};

/** 系统消息---添加系统消息 */
export const fetchAddMessage = (data: any) => {
	return http.request<BaseResult<object>>('post', 'messageReceived/addMessage', { data });
};

/** 系统消息---更新系统消息 */
export const fetchUpdateMessage = (data: any) => {
	return http.request<BaseResult<object>>('put', 'messageReceived/updateMessage', { data });
};

/** 系统消息---删除系统消息 */
export const fetchDeleteMessage = (data: any) => {
	return http.request<BaseResult<object>>('delete', 'message/deleteMessage', { data });
};

/** 用户系统消息---根据消息id查询消息详情 */
export const fetchGetMessageDetailById = (data: any) => {
	return http.request<BaseResult<any>>('get', `message/noManage/getMessageDetailById`, { params: data });
};
