import { http } from '@/api/service/request';
import type { BaseResult, ResultTable } from '@/api/service/types';

/** 系统菜单图标---分页查询系统菜单图标 */
export const getMenuIconPage = (data: any) => {
  return http.request<BaseResult<ResultTable>>('get', `menuIcon/${data.currentPage}/${data.pageSize}`, {
    params: data,
  });
};

/** 系统菜单图标---添加系统菜单图标 */
export const createMenuIcon = (data: any) => {
  return http.request<BaseResult<object>>('post', 'menuIcon', { data });
};

/** 系统菜单图标---更新系统菜单图标 */
export const updateMenuIcon = (data: any) => {
  return http.request<BaseResult<object>>('put', 'menuIcon', { data });
};

/** 系统菜单图标---删除系统菜单图标 */
export const deleteMenuIcon = (data: any) => {
  return http.request<BaseResult<object>>('delete', 'menuIcon', { data });
};

/** 系统菜单图标---根据名称搜索图标 */
export const getIconNameListByIconName = (data: any) => {
  return http.request<BaseResult<object>>('get', 'menuIcon/public', {
    params: data,
  });
};
