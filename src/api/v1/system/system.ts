import { http } from '@/api/service/request';
import type { BaseResult } from '@/api/service/types';

/** 系统管理-用户路由获取 */
export const fetchRouterAsync = () => {
  return http.request<BaseResult<any>>('get', 'router/private/router-async');
};

/** 上传文件 */
export const uploadFile = (data: any) => {
  return http.request<BaseResult<any>>('post', '/files/private/file', { data }, { headers: { 'Content-Type': 'multipart/form-data' } });
};

/** 上传文件 */
export const uploadImage = (data: any) => {
  return http.request<BaseResult<any>>('post', '/files/private/image', { data }, { headers: { 'Content-Type': 'multipart/form-data' } });
};
