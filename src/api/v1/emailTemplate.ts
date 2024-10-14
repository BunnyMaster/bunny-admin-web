import { http } from '@/api/service/request';
import type { BaseResult, ResultTable } from '@/api/service/types';

/** 邮件模板表---获取邮件模板表列表 */
export const fetchGetEmailTemplateList = (data: any) => {
	return http.request<BaseResult<ResultTable>>('get', `emailTemplate/getEmailTemplateList/${data.currentPage}/${data.pageSize}`, { params: data });
};

/** 邮件模板表---添加邮件模板表 */
export const fetchAddEmailTemplate = (data: any) => {
	return http.request<BaseResult<object>>('post', 'emailTemplate/addEmailTemplate', { data });
};

/** 邮件模板表---更新邮件模板表 */
export const fetchUpdateEmailTemplate = (data: any) => {
	return http.request<BaseResult<object>>('put', 'emailTemplate/updateEmailTemplate', { data });
};

/** 邮件模板表---删除邮件模板表 */
export const fetchDeleteEmailTemplate = (data: any) => {
	return http.request<BaseResult<object>>('delete', 'emailTemplate/deleteEmailTemplate', { data });
};
