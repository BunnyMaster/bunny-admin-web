import { http } from '@/api/service/request';
import type { BaseResult, ResultTable } from '@/api/service/types';

/** 系统管理-用户路由获取 */
export const getRouterAsync = () => {
	return http.request<BaseResult<any>>('get', 'router/getRouterAsync');
};

/** 图标管理-获取系统图标 */
export const getMenuIconList = (data: any) => {
	return http.request<BaseResult<ResultTable>>('get', `menuIcon/getMenuIconList/${data.page}/${data.limit}`, { data });
};

/** 菜单管理-列表 */
export const getMenuList = (data?: any) => {
	return http.request<BaseResult<ResultTable>>('get', `router/getMenus`, { data });
};

/** 菜单管理-添加菜单 */
export const addMenu = (data?: any) => {
	return http.request<BaseResult<any>>('post', `router/addMenu`, { data });
};

/** 菜单管理-更新菜单 */
export const updateMenu = (data?: any) => {
	return http.request<BaseResult<any>>('put', `router/updateMenu`, { data });
};

/** 菜单管理-删除菜单 */
export const deletedMenuByIds = (data?: any) => {
	return http.request<BaseResult<any>>('delete', `router/deletedMenuByIds`, { data });
};

// ------------未确认------------
/** 获取系统管理-用户管理列表 */
export const getUserList = (data?: object) => {
	return http.request<BaseResult<ResultTable>>('post', '/user', { data });
};

/** 系统管理-用户管理-获取所有角色列表 */
export const getAllRoleList = () => {
	return http.request<any>('get', '/list-all-role');
};

/** 系统管理-用户管理-根据userId，获取对应角色id列表（userId：用户id） */
export const getRoleIds = (data?: object) => {
	return http.request<any>('post', '/list-role-ids', { data });
};

/** 获取系统管理-角色管理列表 */
export const getRoleList = (data?: object) => {
	return http.request<ResultTable>('post', '/role', { data });
};

/** 获取系统管理-部门管理列表 */
export const getDeptList = (data?: object) => {
	return http.request<any>('post', '/dept', { data });
};

/** 获取系统监控-在线用户列表 */
export const getOnlineLogsList = (data?: object) => {
	return http.request<ResultTable>('post', '/online-logs', { data });
};

/** 获取系统监控-登录日志列表 */
export const getLoginLogsList = (data?: object) => {
	return http.request<ResultTable>('post', '/login-logs', { data });
};

/** 获取系统监控-操作日志列表 */
export const getOperationLogsList = (data?: object) => {
	return http.request<ResultTable>('post', '/operation-logs', { data });
};

/** 获取系统监控-系统日志列表 */
export const getSystemLogsList = (data?: object) => {
	return http.request<ResultTable>('post', '/system-logs', { data });
};

/** 获取系统监控-系统日志-根据 id 查日志详情 */
export const getSystemLogsDetail = (data?: object) => {
	return http.request<any>('post', '/system-logs-detail', { data });
};

/** 获取角色管理-权限-菜单权限 */
export const getRoleMenu = (data?: object) => {
	return http.request<any>('post', '/role-menu', { data });
};

/** 获取角色管理-权限-菜单权限-根据角色 id 查对应菜单 */
export const getRoleMenuIds = (data?: object) => {
	return http.request<any>('post', '/role-menu-ids', { data });
};
