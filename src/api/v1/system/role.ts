import { http } from '@/api/service/request';
import type { BaseResult, ResultTable } from '@/api/service/types';

/** 角色---获取角色列表 */
export const fetchGetRoleList = (data: any) => {
  return http.request<BaseResult<ResultTable>>('get', `role/getRoleList/${data.currentPage}/${data.pageSize}`, {
    params: data,
  });
};

/** 角色---获取所有角色 */
export const fetchAllRoles = () => {
  return http.request<BaseResult<any>>('get', `role/noManage/allRoles`);
};

/** 角色---根据用户id获取所有角色 */
export const fetchGetRoleListByUserId = (data) => {
  return http.request<BaseResult<any>>('get', `userRole/getRoleListByUserId`, { params: data });
};

/** 角色---使用Excel导出导出角色列表 */
export const fetchExportByExcel = () => {
  return http.request<BaseResult<any>>('get', `role/exportByExcel`, { responseType: 'blob' });
};

/* 角色---使用Excel更新角色列表 */
export const fetchUpdateRoleByFile = (data: any) => {
  return http.request<BaseResult<any>>(
    'put',
    `/role/update/roleByFile`,
    { data },
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};

/** 角色---添加角色 */
export const fetchAddRole = (data: any) => {
  return http.request<BaseResult<object>>('post', 'role/addRole', { data });
};

/** 角色---为角色分配权限 */
export const fetchAssignPowersToRole = (data: any) => {
  return http.request<BaseResult<object>>('post', 'rolePower/assignPowersToRole', { data });
};

/** 角色---更新角色 */
export const fetchUpdateRole = (data: any) => {
  return http.request<BaseResult<object>>('put', 'role/updateRole', { data });
};

/** 角色---删除角色 */
export const fetchDeleteRole = (data: any) => {
  return http.request<BaseResult<object>>('delete', 'role/deleteRole', { data });
};
