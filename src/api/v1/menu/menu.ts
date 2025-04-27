import { http } from '@/api/service/request';
import type { BaseResult } from '@/api/service/types';

/** 菜单管理-列表 */
export const getRouterList = () => {
  return http.request<BaseResult<any>>('get', `router/routerList`);
};

/* 根据路由id获取所有角色 */
export const getRoleListByRouterId = (data: any) => {
  return http.request<BaseResult<any>>('get', `routerRole/private/getRoleListByRouterId`, { params: data });
};

/** 菜单管理-添加菜单 */
export const createRouter = (data?: any) => {
  return http.request<BaseResult<any>>('post', `router`, { data });
};

/** 菜单管理-清除选中菜单所有角色 */
export const clearRouterRole = (data: any) => {
  return http.request<BaseResult<any>>('delete', `routerRole/clearRouterRole`, { data });
};

/** 菜单管理-更新菜单 */
export const updateRouter = (data?: any) => {
  return http.request<BaseResult<any>>('put', `router`, { data });
};

/** 菜单管理-删除菜单 */
export const deletedRouterByIds = (data?: any) => {
  return http.request<BaseResult<any>>('delete', `router`, { data });
};
