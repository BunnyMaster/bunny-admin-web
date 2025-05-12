import { http } from '@/api/service/request';
import type { BaseResult } from '@/api/service/types';

/** 读取web配置文件并返回给前端 */
export const getWebConfig = () => {
  return http.request<any>('get', '/config/public/web-config');
};

/** 更新web配置文件 */
export const updateWebConfiguration = (data: any) => {
  return http.request<BaseResult<any>>('put', '/config', { data });
};
