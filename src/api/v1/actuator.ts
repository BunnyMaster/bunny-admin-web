import { http } from '@/api/service/request';

/** actuator断端点-系统服务获取 */
export const fetchSystemHealthList = () => {
	return http.request<any>('get', '/health');
};

/** actuator断端点-系统信息 */
export const fetchSystemInfo = () => {
	return http.request<any>('get', '/info');
};

/** actuator断端点-系统缓存 */
export const fetchSystemCaches = () => {
	return http.request<any>('get', '/caches');
};