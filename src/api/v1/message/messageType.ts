import { http } from '@/api/service/request';
import type { BaseResult, ResultTable } from '@/api/service/types';

/** 系统消息类型---分页查询系统消息类型 */
export const getMessageTypePage = (data: any) => {
  return http.request<BaseResult<ResultTable>>('get', `messageType/${data.currentPage}/${data.pageSize}`, {
    params: data,
  });
};

/** 系统消息类型---添加系统消息类型 */
export const createMessageType = (data: any) => {
  return http.request<BaseResult<object>>('post', 'messageType', { data });
};

/** 系统消息类型---更新系统消息类型 */
export const updateMessageType = (data: any) => {
  return http.request<BaseResult<object>>('put', 'messageType', { data });
};

/** 系统消息类型---删除系统消息类型 */
export const deleteMessageType = (data: any) => {
  return http.request<BaseResult<object>>('delete', 'messageType', { data });
};

/** 系统消息类型---获取所有消息列表 */
export const getMessageTypeList = () => {
  return http.request<BaseResult<ResultTable>>('get', '/messageType/private/messages');
};
