import { http } from '@/api/service';
import type { BaseResult } from '@/types/BaseResult';

export const getAsyncRoutes = () => {
	return http.request<BaseResult<any>>('get', 'router/getRouterAsync');
};
