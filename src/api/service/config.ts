import type { AxiosRequestConfig, CustomParamsSerializer } from 'axios';
import { stringify } from 'qs';

export const whiteList = ['/refresh-token', '/login'];

// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
export const defaultConfig: AxiosRequestConfig = {
  // 默认请求地址
  baseURL: '/api',
  // 设置超时时间
  timeout: 19000,
  // @ts-expect-error
  retry: 3, //设置全局重试请求次数（最多重试几次请求）
  retryDelay: 3000, //设置全局请求间隔
  // 跨域允许携带凭证
  // withCredentials: true,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer,
  },
};

// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
export const defaultMockConfig: AxiosRequestConfig = {
  timeout: import.meta.env.VITE_BASE_API_TIMEOUT,
  baseURL: import.meta.env.VITE_MOCK_BASE_API || '/mock',
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer,
  },
};
