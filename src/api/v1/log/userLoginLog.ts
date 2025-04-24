import { http } from '@/api/service/request';
import type { BaseResult, ResultTable } from '@/api/service/types';

/** 用户登录日志---获取用户登录日志列表 */
export const fetchGetUserLoginLogList = (data: any) => {
  return http.request<BaseResult<ResultTable>>(
    'get',
    `userLoginLog/getUserLoginLogList/${data.currentPage}/${data.pageSize}`,
    { params: data }
  );
};

/** 用户登录日志---获取用户登录日志列表 */
export const fetchGetUserLoginLogListByLocalUser = (data: any) => {
  return http.request<BaseResult<ResultTable>>(
    'get',
    `userLoginLog/noManage/getUserLoginLogListByLocalUser/${data.currentPage}/${data.pageSize}`
  );
};

/** 用户登录日志---删除用户登录日志 */
export const fetchDeleteUserLoginLog = (data: any) => {
  return http.request<BaseResult<object>>('delete', 'userLoginLog/deleteUserLoginLog', { data });
};
