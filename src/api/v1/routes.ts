import { http } from '@/api/service/request';
import type { BaseResult } from '@/api/service/types';

export const getRouterAsync = () => {
	return http.request<BaseResult<any>>('get', 'router/getRouterAsync');
};
