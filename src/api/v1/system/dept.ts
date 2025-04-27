import { http } from '@/api/service/request';
import type { BaseResult, ResultTable } from '@/api/service/types';

/** 部门管理---获取部门管理列表 */
export const getDeptPage = (data: any) => {
  return http.request<BaseResult<ResultTable>>('get', `dept/${data.currentPage}/${data.pageSize}`, {
    params: data,
  });
};

/** 部门管理---添加部门管理 */
export const createDept = (data: any) => {
  return http.request<BaseResult<object>>('post', 'dept', { data });
};

/** 部门管理---更新部门管理 */
export const updateDept = (data: any) => {
  return http.request<BaseResult<object>>('put', 'dept', { data });
};

/** 部门管理---删除部门管理 */
export const deleteDept = (data: any) => {
  return http.request<BaseResult<object>>('delete', 'dept', { data });
};

/** 部门管理---获取所有部门管理列表 */
export const getDeptList = () => {
  return http.request<BaseResult<object>>('get', 'dept/private/getDeptList');
};
