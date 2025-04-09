import { http } from '@/api/service/request';
import type { BaseResult, ResultTable } from '@/api/service/types';

/** 多语言类型管理---获取多语言内容 */
export const fetchGetI18n = () => {
	return http.request<BaseResult<object>>('get', 'i18n/getI18n');
};

/** 多语言类型管理---下载多语言配置 */
export const fetchDownloadI18nSetting = () => {
	return http.request<any>('get', 'i18n/downloadI18n', { responseType: 'blob' });
};

/** 多语言类型管理---获取多语言列表 */
export const fetchGetI18nList = (data: any) => {
	return http.request<BaseResult<ResultTable>>('get', `i18n/getI18nList/${data.currentPage}/${data.pageSize}`, { params: data });
};

/** 多语言类型管理---添加多语言 */
export const fetchAddI18n = (data: any) => {
	return http.request<BaseResult<object>>('post', 'i18n/addI18n', { data });
};

/** 多语言类型管理---更新多语言 */
export const fetchUpdateI18n = (data: any) => {
	return http.request<BaseResult<object>>('put', 'i18n/updateI18n', { data });
};

/** 多语言类型管理---用文件更新多语言 */
export const updateI18nByFile = (data: any) => {
	return http.request<BaseResult<object>>('put', 'i18n/updateI18nByFile', { data }, { headers: { 'Content-Type': 'multipart/form-data' } });
};

/** 多语言类型管理---删除多语言 */
export const fetchDeleteI18n = (data: any) => {
	return http.request<BaseResult<object>>('delete', 'i18n/deleteI18n', { data });
};

/** 多语言类型管理---获取多语言类型列表 */
export const fetchGetI18nTypeList = (data: any) => {
	return http.request<BaseResult<ResultTable>>('get', 'i18nType/noAuth/getI18nTypeList', { params: data });
};

/** 多语言类型管理---添加多语言类型 */
export const fetchAddI18nType = (data: any) => {
	return http.request<BaseResult<object>>('post', 'i18nType/addI18nType', { data });
};

/** 多语言类型管理---更新多语言类型 */
export const fetchUpdateI18nType = (data: any) => {
	return http.request<BaseResult<object>>('put', 'i18nType/updateI18nType', { data });
};

/** 多语言类型管理---删除多语言类型 */
export const fetchDeleteI18nType = (data: any) => {
	return http.request<BaseResult<object>>('delete', 'i18nType/deleteI18nType', { data });
};
