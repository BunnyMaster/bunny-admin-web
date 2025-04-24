import { http } from '@/api/service/request';
import type { BaseResult, ResultTable } from '@/api/service/types';

/** 邮箱用户发送配置管理---获取邮箱用户发送配置管理列表 */
export const fetchGetEmailUsersList = (data: any) => {
  return http.request<BaseResult<ResultTable>>(
    'get',
    `emailUsers/getEmailUsersList/${data.currentPage}/${data.pageSize}`,
    { params: data }
  );
};

/** 邮箱用户发送配置管理---获取所有邮箱配置用户 */
export const fetchGetAllMailboxConfigurationUsers = () => {
  return http.request<BaseResult<any>>('get', 'emailUsers/noManage/getAllMailboxConfigurationUsers');
};

/** 邮箱用户发送配置管理---添加邮箱用户发送配置管理 */
export const fetchAddEmailUsers = (data: any) => {
  return http.request<BaseResult<object>>('post', 'emailUsers/addEmailUsers', { data });
};

/** 邮箱用户发送配置管理---更新邮箱用户发送配置管理 */
export const fetchUpdateEmailUsers = (data: any) => {
  return http.request<BaseResult<object>>('put', 'emailUsers/updateEmailUsers', { data });
};

/** 邮箱用户发送配置管理---更新邮箱用户状态 */
export const fetchUpdateEmailUserStatus = (data: any) => {
  return http.request<BaseResult<object>>('put', 'emailUsers/updateEmailUserStatus', { data });
};

/** 邮箱用户发送配置管理---删除邮箱用户发送配置管理 */
export const fetchDeleteEmailUsers = (data: any) => {
  return http.request<BaseResult<object>>('delete', 'emailUsers/deleteEmailUsers', { data });
};
