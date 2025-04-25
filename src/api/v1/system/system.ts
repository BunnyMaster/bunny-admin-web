import { http } from '@/api/service/request';
import type { BaseResult } from '@/api/service/types';

/** 系统管理-用户路由获取 */
export const fetchRouterAsync = () => {
  return http.request<BaseResult<any>>('get', 'router/noManage/routerAsync');
};

/** 上传文件 */
export const fetchUploadFile = (data: any) => {
  return http.request<BaseResult<any>>(
    'post',
    '/files/upload',
    { data },
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};
