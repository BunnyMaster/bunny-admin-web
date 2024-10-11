import { http } from '@/api/service/request';
import type { BaseResult } from '@/api/service/types';

/** 系统管理-用户路由获取 */
export const getRouterAsync = () => {
	return http.request<BaseResult<any>>('get', 'router/getRouterAsync');
};

/** 上传文件 */
export const fetchUploadFile = (data: any) => {
	return http.request<BaseResult<any>>('post', '/files/upload', { data }, { headers: { 'Content-Type': 'multipart/form-data' } });
};

/** 系统监控-系统服务获取 */
export const fetchSystemHealthList = () => {
	return http.request<any>('get', '/health');
};
