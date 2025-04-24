import { http } from '@/api/service/request';

/** actuator断端点-系统服务获取 */
export const fetchSystemHealthList = () => {
  return http.request<any>('get', 'actuator/health');
};

/** actuator断端点-系统信息 */
export const fetchSystemInfo = () => {
  return http.request<any>('get', 'actuator/info');
};

/** actuator断端点-系统缓存 */
export const fetchSystemCaches = () => {
  return http.request<any>('get', 'actuator/caches');
};

/** actuator断端点-CPU占用 */
export const fetchSystemCPU = () => {
  return http.request<any>('get', 'actuator/metrics/system.cpu.usage');
};

/** actuator断端点-CPU占用 */
export const fetchSystemProcessCPU = () => {
  return http.request<any>('get', 'actuator/metrics/process.cpu.usage');
};

/** actuator断端点-磁盘可用 */
export const fetchSystemDiskFree = () => {
  return http.request<any>('get', 'actuator/metrics/disk.free');
};

/** actuator断端点-磁盘总量 */
export const fetchSystemDiskTotal = () => {
  return http.request<any>('get', 'actuator/metrics/disk.total');
};
