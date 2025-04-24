import { http } from '@/api/service/request';
import type { BaseResult, ResultTable } from '@/api/service/types';

/** 部门管理---获取部门管理列表 */
export const fetchGetDeptList = (data: any) => {
  return http.request<BaseResult<ResultTable>>('get', `dept/getDeptList/${data.currentPage}/${data.pageSize}`, {
    params: data,
  });
};

/** 部门管理---获取所有部门管理列表 */
export const fetchGetAllDeptList = () => {
  return http.request<BaseResult<object>>('get', 'dept/noManage/getAllDeptList');
};

/** 部门管理---添加部门管理 */
export const fetchAddDept = (data: any) => {
  return http.request<BaseResult<object>>('post', 'dept/addDept', { data });
};

/** 部门管理---更新部门管理 */
export const fetchUpdateDept = (data: any) => {
  return http.request<BaseResult<object>>('put', 'dept/updateDept', { data });
};

/** 部门管理---删除部门管理 */
export const fetchDeleteDept = (data: any) => {
  return http.request<BaseResult<object>>('delete', 'dept/deleteDept', { data });
};
