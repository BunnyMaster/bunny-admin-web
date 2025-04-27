import { http } from '@/api/service/request';
import type { BaseResult, ResultTable } from '@/api/service/types';

/** 多语言管理---获取多语言内容 */
export const getI18nMap = () => {
  return http.request<BaseResult<object>>('get', 'i18n/public');
};

/** 多语言管理---分页查询多语言 */
export const getI18nPage = (data: any) => {
  return http.request<BaseResult<ResultTable>>('get', `i18n/${data.currentPage}/${data.pageSize}`, {
    params: data,
  });
};

/** 多语言管理---添加多语言 */
export const createI18n = (data: any) => {
  return http.request<BaseResult<object>>('post', 'i18n', { data });
};

/** 多语言管理---更新多语言 */
export const updateI18n = (data: any) => {
  return http.request<BaseResult<object>>('put', 'i18n', { data });
};

/** 多语言管理---删除多语言 */
export const deleteI18n = (data: any) => {
  return http.request<BaseResult<object>>('delete', 'i18n', { data });
};

/** 多语言管理---文件导出并下载多语言 */
export const downloadI18n = (params: object) => {
  return http.request<any>('get', 'i18n/file', { params }, { responseType: 'blob' });
};

/** 多语言管理---文件更新多语言可以是JSON、Excel */
export const uploadI18nFile = (data: any) => {
  return http.request<BaseResult<object>>(
    'put',
    'i18n/file',
    { data },
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};

// ------------------------------------------------
// 多语言类型管理
// ------------------------------------------------

/** 多语言类型管理---添加多语言类型 */
export const createI18Type = (data: any) => {
  return http.request<BaseResult<object>>('post', 'i18nType', { data });
};

/** 多语言类型管理---更新多语言类型 */
export const updateI18nType = (data: any) => {
  return http.request<BaseResult<object>>('put', 'i18nType', { data });
};

/** 多语言类型管理---删除多语言类型 */
export const deleteI18nType = (data: any) => {
  return http.request<BaseResult<object>>('delete', 'i18nType', { data });
};

/** 多语言类型管理---获取全部多语言类型列表 */
export const getI18nTypeList = (data: any) => {
  return http.request<BaseResult<ResultTable>>('get', 'i18nType/public', {
    params: data,
  });
};
