import { http } from '@/api/service/request';
import type { BaseResult, ResultTable } from '@/api/service/types';

/** 邮件模板表---分页查询邮件模板 */
export const getEmailTemplatePage = (data: any) => {
  return http.request<BaseResult<ResultTable>>('get', `email-template/${data.currentPage}/${data.pageSize}`, {
    params: data,
  });
};

/** 邮件模板表---添加邮件模板 */
export const createEmailTemplate = (data: any) => {
  return http.request<BaseResult<object>>('post', 'email-template', { data });
};

/** 邮件模板表---更新邮件模板 */
export const updateEmailTemplate = (data: any) => {
  return http.request<BaseResult<object>>('put', 'email-template', { data });
};

/** 邮件模板表---删除邮件模板 */
export const deleteEmailTemplate = (data: any) => {
  return http.request<BaseResult<object>>('delete', 'email-template', { data });
};

/** 邮件模板表---获取全部邮件类型列表 */
export const getEmailTypeList = () => {
  return http.request<BaseResult<any>>('get', 'email-template/private');
};
