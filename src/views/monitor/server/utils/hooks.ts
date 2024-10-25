// 系统健康状态
import { fetchSystemHealthList, fetchSystemInfo } from '@/api/v1/actuator';
import { ref } from 'vue';

// 系统服务信息
export const systemServerInfo = ref<any>({});
// 系统运行信息
export const info = ref<any>({});
export const loading = ref(false);

/** 获取系统服务数据 */
export const onSearch = async () => {
	loading.value = true;

	// 获取系统运行状态信息
	systemServerInfo.value = await fetchSystemHealthList();

	// 系统信息
	info.value = await fetchSystemInfo();

	loading.value = false;
};
