import { http } from '@/api/service/request';
import type { BaseResult, ResultTable } from '@/api/service/types';

/** 系统消息---分页查询发送消息 */
export const getMessagePage = (data: any) => {
  return http.request<BaseResult<ResultTable>>('get', `message/${data.currentPage}/${data.pageSize}`, {
    params: data,
  });
};

/** 系统消息---添加系统消息 */
export const createMessage = (data: any) => {
  return http.request<BaseResult<object>>('post', 'message', { data });
};

/** 系统消息---更新系统消息 */
export const updateMessage = (data: any) => {
  return http.request<BaseResult<object>>('put', 'message', { data });
};

/** 系统消息---删除系统消息 */
export const deleteMessage = (data: any) => {
  return http.request<BaseResult<object>>('delete', 'message', { data });
};

/** 用户系统消息---根据消息id查询消息详情 */
export const getMessageDetailById = (data: any) => {
  return http.request<BaseResult<any>>('get', `message/private/getMessageDetailById`, { params: data });
};

/** 系统消息---根据消息id获取接收人信息 */
export const getReceivedUserinfoByMessageId = (data: any) => {
  return http.request<BaseResult<any>>('get', `message/private/getReceivedUserinfoByMessageId`, { params: data });
};
