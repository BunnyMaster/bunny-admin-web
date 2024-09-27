import { http } from '@/api/service/mockRequest';
import type { Result } from '@/types/store/baseStoreState';

/**
 * * 获取多语言内容
 */
export const fetchGetI18n = () => {
	return http.request<Result<object>>('get', 'getI18n');
};
