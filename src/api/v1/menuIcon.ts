import { http } from '@/api/service/request';
import type { BaseResult, ResultTable } from '@/api/service/types';

/** 系统菜单图标---获取多语言列表 */
export const fetchGetMenuIconList = (data: any) => {
	return http.request<BaseResult<ResultTable>>('get', `menuIcon/getMenuIconList/${data.currentPage}/${data.pageSize}`, { params: data });
};

/** 系统菜单图标---添加多语言 */
export const fetchAddMenuIcon = (data: any) => {
	return http.request<BaseResult<object>>('post', 'menuIcon/addMenuIcon', { data });
};

/** 系统菜单图标---更新多语言 */
export const fetchUpdateMenuIcon = (data: any) => {
	return http.request<BaseResult<object>>('put', 'menuIcon/updateMenuIcon', { data });
};

/** 系统菜单图标---删除多语言 */
export const fetchDeleteMenuIcon = (data: any) => {
	return http.request<BaseResult<object>>('delete', 'menuIcon/deleteMenuIcon', { data });
};

/** 系统菜单图标---根据iconName搜索menuIc */
export const fetchGetIconNameList = (data: any) => {
	return http.request<BaseResult<object>>('get', 'menuIcon/noManage/getIconNameList', { params: data });
};
