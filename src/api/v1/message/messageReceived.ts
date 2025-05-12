import { http } from '@/api/service/request';
import type { BaseResult, ResultTable } from '@/api/service/types';

/** 管理员操作用户消息---管理员分页查询用户消息 */
export const getMessageReceivedPage = (data: any) => {
  return http.request<BaseResult<ResultTable>>('get', `message-received/${data.currentPage}/${data.pageSize}`, {
    params: data,
  });
};

/** 管理员操作用户消息---管理员将用户消息标为已读 */
export const updateMessageReceivedByAdmin = (data: any) => {
  return http.request<BaseResult<object>>('put', 'message-received', { data });
};

/** 管理员操作用户消息---管理删除用户消息 */
export const deleteMessageReceivedByAdmin = (data: any) => {
  return http.request<BaseResult<object>>('delete', 'message-received', {
    data,
  });
};

/** 用户系统消息---用户获取系统消息列表 */
export const getMessageReceivedPageByUser = (data: any) => {
  return http.request<BaseResult<ResultTable>>('get', `message-received/private/${data.currentPage}/${data.pageSize}`, {
    params: data,
  });
};

/** 系统消息---用户将消息标为已读 */
export const updateMessageByUser = (data: any) => {
  return http.request<BaseResult<object>>('put', 'message-received/private/user/messages/read-status', { data });
};

/** 系统消息---用户删除系统消息 */
export const deleteMessageReceivedByUser = (data: any) => {
  return http.request<BaseResult<object>>('delete', 'message-received/private/user/messages', { data });
};
