import { http } from '@/api/service/request';
import type { BaseResult, ResultTable } from '@/api/service/types';

/** 用户登录日志---获取用户登录日志列表 */
export const getUserLoginLogPageByAdmin = (data: any) => {
  return http.request<BaseResult<ResultTable>>('get', `userLoginLog/${data.currentPage}/${data.pageSize}`, {
    params: data,
  });
};

/** 用户登录日志---删除用户登录日志 */
export const deleteUserLoginLog = (data: any) => {
  return http.request<BaseResult<object>>('delete', 'userLoginLog', { data });
};

/** 用户登录日志---获取用户登录日志列表 */
export const getUserLoginLogPageByUser = (data: any) => {
  return http.request<BaseResult<ResultTable>>('get', `userLoginLog/private/${data.currentPage}/${data.pageSize}`);
};
