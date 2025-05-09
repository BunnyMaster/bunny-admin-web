import { http } from '@/api/service/request';
import type { BaseResult, ResultTable } from '@/api/service/types';

/** 系统文件管理---获取系统文件管理列表 */
export const getFilesPage = (data: any) => {
  return http.request<BaseResult<ResultTable>>('get', `files/${data.currentPage}/${data.pageSize}`, {
    params: data,
  });
};
/** 系统文件管理---添加系统文件 */
export const fetchAddFiles = (data: any) => {
  return http.request<BaseResult<any>>('post', 'files', { data }, { headers: { 'Content-Type': 'multipart/form-data' } });
};

/** 系统文件管理---更新系统文件 */
export const updateFiles = (data: any) => {
  return http.request<BaseResult<object>>('put', 'files', { data }, { headers: { 'Content-Type': 'multipart/form-data' } });
};

/** 系统文件管理---删除系统文件 */
export const deleteFiles = (data: any) => {
  return http.request<BaseResult<any>>('delete', 'files', { data });
};

/** 系统文件管理---根据文件id下载文件 */
export const downloadFilesByFileId = (data: any) => {
  return http.request<any>('get', `files/file/${data.id}`, {
    responseType: 'blob',
  });
};

/** 系统文件管理---获取所有文件存储基础路径 */
export const getFilesStoragePath = () => {
  return http.request<BaseResult<any>>('get', `files/private/getAllFilesStoragePath`);
};
