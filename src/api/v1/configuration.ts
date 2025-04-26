import { http } from '@/api/service/request';
import type { BaseResult } from '@/api/service/types';

/** 获取修改前端配置文件 */
export const getWebConfig = () => {
  return http.request<BaseResult<any>>('get', '/config');
};

/** 更新web配置文件 */
export const updateWebConfiguration = (data: any) => {
  return http.request<BaseResult<any>>('put', '/config', { data });
};
