import { http } from '@/api/service/request';
import type { BaseResult } from '@/api/service/types';

/** 菜单管理-列表 */
export const fetchGetMenusList = (data?: any) => {
	return http.request<BaseResult<any>>('get', `router/getMenusList`, { params: data });
};

/** 菜单管理-添加菜单 */
export const fetchAddMenu = (data?: any) => {
	return http.request<BaseResult<any>>('post', `router/addMenu`, { data });
};

/** 菜单管理-更新菜单 */
export const fetchUpdateMenu = (data?: any) => {
	return http.request<BaseResult<any>>('put', `router/updateMenu`, { data });
};

/** 菜单管理-删除菜单 */
export const fetchDeletedMenuByIds = (data?: any) => {
	return http.request<BaseResult<any>>('delete', `router/deletedMenuByIds`, { data });
};

/** 菜单管理-为菜单分配角色 */
export const fetchAssignRolesToRouter = (data: any) => {
	return http.request<BaseResult<any>>('post', `routerRole/assignRolesToRouter`, { data });
};

/**
 * 根据路由id获取所有角色
 */
export const fetchGetRoleListByRouterId = data => {
	return http.request<BaseResult<any>>('get', `routerRole/getRoleListByRouterId`, { params: data });
};
