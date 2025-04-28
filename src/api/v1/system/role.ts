import { http } from '@/api/service/request';
import type { BaseResult, ResultTable } from '@/api/service/types';

/** 角色---获取角色列表 */
export const getRolePage = (data: any) => {
  return http.request<BaseResult<ResultTable>>('get', `role/${data.currentPage}/${data.pageSize}`, {
    params: data,
  });
};
/** 角色---添加角色 */
export const crateRole = (data: any) => {
  return http.request<BaseResult<object>>('post', 'role', { data });
};

/** 角色---更新角色 */
export const updateRole = (data: any) => {
  return http.request<BaseResult<object>>('put', 'role', { data });
};

/** 角色---删除角色 */
export const deleteRole = (data: any) => {
  return http.request<BaseResult<object>>('delete', 'role', { data });
};

/** 角色---获取所有角色 */
export const getRoleList = () => {
  return http.request<BaseResult<any>>('get', `role/private/roleList`);
};

/** 角色---使用Excel导出导出角色列表 */
export const exportRoleList = () => {
  return http.request<BaseResult<any>>('get', `role/file/export`, { responseType: 'blob' });
};

/* 角色---使用Excel更新角色列表 */
export const updateRoleByFile = (data: any) => {
  return http.request<BaseResult<any>>('put', `/role/file/import`, { data }, { headers: { 'Content-Type': 'multipart/form-data' } });
};

/** 为用户分配角色---根据用户id获取所有角色 */
export const getRoleListByUserId = (data: any) => {
  return http.request<BaseResult<any>>('get', `userRole/private/getRoleListByUserId`, { params: data });
};

/** 为用户分配角色---为用户分配角色 */
export const createUserRole = (data: object) => {
  return http.request<BaseResult<any>>('post', 'userRole', { data });
};

/** 角色和权限---为角色分配权限 */
export const createRolePermission = (data: any) => {
  return http.request<BaseResult<object>>('post', 'rolePermission', { data });
};
