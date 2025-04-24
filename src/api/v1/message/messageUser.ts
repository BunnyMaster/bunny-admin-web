import { http } from '@/api/service/request';
import type { BaseResult, ResultTable } from '@/api/service/types';

/** 用户系统消息---用户获取系统消息列表 */
export const fetchGetUserMessageList = (data: any) => {
  return http.request<BaseResult<ResultTable>>(
    'get',
    `messageReceived/noManage/getUserMessageList/${data.currentPage}/${data.pageSize}`,
    { params: data }
  );
};

/** 用户系统消息---根据消息id查询消息详情 */
export const fetchGetMessageDetailById = (data: any) => {
  return http.request<BaseResult<any>>('get', `message/noManage/getMessageDetailById`, { params: data });
};

/** 系统消息---用户将消息标为已读 */
export const fetchUpdateUserMarkAsRead = (data: any) => {
  return http.request<BaseResult<object>>('put', 'messageReceived/noManage/userMarkAsRead', { data });
};

/** 系统消息---用户删除系统消息 */
export const fetchDeleteUserMessageByIds = (data: any) => {
  return http.request<BaseResult<object>>('delete', 'messageReceived/noManage/deleteUserMessageByIds', { data });
};
