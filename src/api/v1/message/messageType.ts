import { http } from '@/api/service/request';
import type { BaseResult, ResultTable } from '@/api/service/types';

/** 系统消息类型---获取系统消息类型列表 */
export const fetchGetMessageTypeList = (data: any) => {
  return http.request<BaseResult<ResultTable>>(
    'get',
    `messageType/getMessageTypeList/${data.currentPage}/${data.pageSize}`,
    { params: data }
  );
};

/** 系统消息类型---获取系统消息类型列表 */
export const fetchGetAllMessageTypes = () => {
  return http.request<BaseResult<ResultTable>>('get', '/messageType/noManage/getAllMessageTypes');
};

/** 系统消息类型---添加系统消息类型 */
export const fetchAddMessageType = (data: any) => {
  return http.request<BaseResult<object>>('post', 'messageType/addMessageType', { data });
};

/** 系统消息类型---更新系统消息类型 */
export const fetchUpdateMessageType = (data: any) => {
  return http.request<BaseResult<object>>('put', 'messageType/updateMessageType', { data });
};

/** 系统消息类型---删除系统消息类型 */
export const fetchDeleteMessageType = (data: any) => {
  return http.request<BaseResult<object>>('delete', 'messageType/deleteMessageType', { data });
};
