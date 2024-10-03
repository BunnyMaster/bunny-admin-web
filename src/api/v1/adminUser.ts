import { http } from '@/api/service/request';
import type { BaseResult, ResultTable } from '@/api/service/types';

/**
 * 用户信息---获取用户信息列表
 */
export const fetchGetAdminUserList = (data: any) => {
	return http.request<BaseResult<ResultTable>>('get', `user/getAdminUserList/${data.currentPage}/${data.pageSize}`, { params: data });
};

/**
 * 用户信息---添加用户信息
 */
export const fetchAddAdminUser = (data: any) => {
	return http.request<BaseResult<object>>('post', 'user/addAdminUser', { data });
};

/**
 * 用户信息---更新用户信息
 */
export const fetchUpdateAdminUser = (data: any) => {
	return http.request<BaseResult<object>>('put', 'user/updateAdminUser', { data });
};

/**
 * 用户信息---删除用户信息
 */
export const fetchDeleteAdminUser = (data: any) => {
	return http.request<BaseResult<object>>('delete', 'user/deleteAdminUser', { data });
};
