import { http } from '@/api/service/request';
import type { BaseResult, ResultTable } from '@/api/service/types';

/** 系统管理-用户路由获取 */
export const getRouterAsync = () => {
	return http.request<BaseResult<any>>('get', 'router/getRouterAsync');
};

/** 菜单管理-列表 */
export const getMenusList = (data?: any) => {
	return http.request<BaseResult<ResultTable>>('get', `router/getMenusList`, { params: data });
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

/** 上传文件 */
export const fetchUploadFile = (data: any) => {
	return http.post<BaseResult<any>>('/files/upload', { data }, { headers: { 'Content-Type': 'multipart/form-data' } });
};
