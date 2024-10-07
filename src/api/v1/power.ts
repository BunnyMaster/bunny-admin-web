import { http } from '@/api/service/request';
import type { BaseResult, ResultTable } from '@/api/service/types';

/**
 * 权限---获取权限列表
 */
export const fetchGetPowerList = (data: any) => {
	return http.request<BaseResult<ResultTable>>('get', `power/getPowerList/${data.currentPage}/${data.pageSize}`, { params: data });
};

/**
 * 权限---根据角色id获取权限内容
 */
export const fetchGetPowerListByRoleId = (data: any) => {
	return http.request<BaseResult<object>>('get', 'rolePower/getPowerListByRoleId', { data });
};

/**
 * 权限---添加权限
 */
export const fetchAddPower = (data: any) => {
	return http.request<BaseResult<object>>('post', 'power/addPower', { data });
};

/**
 * 权限---更新权限
 */
export const fetchUpdatePower = (data: any) => {
	return http.request<BaseResult<object>>('put', 'power/updatePower', { data });
};

/**
 * 权限---删除权限
 */
export const fetchDeletePower = (data: any) => {
	return http.request<BaseResult<object>>('delete', 'power/deletePower', { data });
};

/**
 * 获取所有权限
 */
export const fetchGetAllPowers = () => {
	return http.request<BaseResult<any>>('get', `power/getAllPowers`);
};
