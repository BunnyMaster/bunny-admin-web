import { http } from '@/api/service/request';
import type { BaseResult } from '@/types/BaseResult';

export const getRouterAsync = () => {
	return http.request<BaseResult<any>>('get', 'router/getRouterAsync');
};
