import { http } from '@/api/service/request';
import type { BaseResult, ResultTable } from '@/api/service/types';

/** 用户系统消息---用户获取系统消息列表 */
export const fetchGetUserMessageList = (data: any) => {
	return http.request<BaseResult<ResultTable>>('get', `message/noManage/getUserMessageList/${data.currentPage}/${data.pageSize}`, { params: data });
};

/** 系统消息---用户将消息标为已读 */
export const fetchUpdateUserMarkAsRead = (data: any) => {
	return http.request<BaseResult<object>>('put', 'messageReceived/noManage/updateUserMarkAsRead', { data });
};

/** 系统消息---用户删除系统消息 */
export const fetchDeleteUserMessageByIds = (data: any) => {
	return http.request<BaseResult<object>>('delete', 'message/noManage/deleteUserMessageByIds', { data });
};
