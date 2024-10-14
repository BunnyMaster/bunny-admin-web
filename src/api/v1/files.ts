import { http } from '@/api/service/request';
import type { BaseResult, ResultTable } from '@/api/service/types';

/** 系统文件管理---获取系统文件管理列表 */
export const fetchGetFilesList = (data: any) => {
	return http.request<BaseResult<ResultTable>>('get', `files/getFilesList/${data.currentPage}/${data.pageSize}`, { params: data });
};

/** 系统文件管理---下载系统文件 */
export const downloadFilesByFileId = (data: any) => {
	return http.request<any>('get', `files/downloadFilesByFileId/${data.id}`, { responseType: 'blob' });
};

/** 系统文件管理---下载系统文件 */
export const downloadFilesByFilepath = (data: any) => {
	return http.request<any>('get', `files/downloadFilesByFilepath`, { params: data, responseType: 'blob' });
};

/** 系统文件管理---获取所有文件类型 */
export const fetchGetAllMediaTypes = () => {
	return http.request<BaseResult<any>>('get', `files/getAllMediaTypes`);
};

/** 系统文件管理---获取所有文件类型 */
export const fetchGetAllFilesStoragePath = () => {
	return http.request<BaseResult<any>>('get', `files/getAllFilesStoragePath`);
};

/** 系统文件管理---添加系统文件管理 */
export const fetchAddFiles = (data: any) => {
	return http.request<BaseResult<any>>('post', 'files/addFiles', { data }, { headers: { 'Content-Type': 'multipart/form-data' } });
};

/** 系统文件管理---更新系统文件管理 */
export const fetchUpdateFiles = (data: any) => {
	return http.request<BaseResult<object>>('put', 'files/updateFiles', { data }, { headers: { 'Content-Type': 'multipart/form-data' } });
};

/** 系统文件管理---删除系统文件管理 */
export const fetchDeleteFiles = (data: any) => {
	return http.request<BaseResult<any>>('delete', 'files/deleteFiles', { data });
};
