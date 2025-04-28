import { http } from '@/api/service/request';
import type { BaseResult, ResultTable } from '@/api/service/types';

/** 权限---获取权限列表 */
export const getPermissionPage = (data: any) => {
  return http.request<BaseResult<ResultTable>>('get', `permission/${data.currentPage}/${data.pageSize}`, {
    params: data,
  });
};

/** 权限---添加权限 */
export const createPermission = (data: any) => {
  return http.request<BaseResult<object>>('post', 'permission', { data });
};

/** 权限---更新权限 */
export const updatePermission = (data: any) => {
  return http.request<BaseResult<object>>('put', 'permission', { data });
};

/** 权限---删除权限 */
export const deletePermission = (data: any) => {
  return http.request<BaseResult<object>>('delete', 'permission', { data });
};

/** 权限---导出权限 */
export const exportPermission = (data: any) => {
  return http.request<any>('get', 'permission/file/export', { params: data }, { responseType: 'blob' });
};

/** 权限---导入权限权限 */
export const importPermission = (data: any) => {
  return http.request<any>('put', 'permission/file/import', { data }, { headers: { 'Content-Type': 'multipart/form-data' } });
};

/** 权限---获取所有权限 */
export const getPermissionList = () => {
  return http.request<BaseResult<any>>('get', `permission/getPermissionList`);
};

/** 权限---更新权限 */
export const updatePermissionListByParentId = (data: any) => {
  return http.request<BaseResult<object>>('put', 'permission/update/permissionListByParentId', { data });
};

/** 角色和权限---根据角色id获取权限内容 */
export const getPowerListByRoleId = (data: any) => {
  return http.request<BaseResult<object>>('get', 'rolePermission/private/getPermissionListByRoleId', {
    params: data,
  });
};
