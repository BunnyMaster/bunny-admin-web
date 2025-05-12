import { http } from '@/api/service/request';
import type { BaseResult, ResultTable } from '@/api/service/types';

/** 邮箱用户发送配置管理---分页查询邮箱用户发送配置 */
export const getEmailUserPage = (data: any) => {
  return http.request<BaseResult<ResultTable>>('get', `email-users/${data.currentPage}/${data.pageSize}`, {
    params: data,
  });
};

/** 邮箱用户发送配置管理---添加邮箱用户发送配置 */
export const createEmailUsers = (data: any) => {
  return http.request<BaseResult<object>>('post', 'email-users', { data });
};

/** 邮箱用户发送配置管理---更新邮箱用户发送配置 */
export const updateEmailUsers = (data: any) => {
  return http.request<BaseResult<object>>('put', 'email-users', { data });
};

/** 邮箱用户发送配置管理---删除邮箱用户 */
export const deleteEmailUsers = (data: any) => {
  return http.request<BaseResult<object>>('delete', 'email-users', { data });
};

/** 邮箱用户发送配置管理---获取全部邮件用户配置 */
export const getEmailUserList = () => {
  return http.request<BaseResult<any>>('get', 'email-users/private');
};
