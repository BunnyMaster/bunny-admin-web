// 系统健康状态
import { fetchSystemHealthList, fetchSystemInfo } from '@/api/v1/actuator';
import { ref } from 'vue';

export const datalist = ref([]);
// 系统运行信息
export const info = ref({ java: { vendor: {}, runtime: {}, jvm: {} }, os: {} });
export const loading = ref(false);

/** 获取系统服务数据 */
export const onSearch = async () => {
	loading.value = true;

	// 获取系统运行状态信息
	const result = await fetchSystemHealthList();
	datalist.value = Object.entries(result.components).map(([key, value]: any) => ({
		type: key,
		key: `${key}`,
		status: value.status === 'UP',
		details: value.details && Object.entries(value.details).map(([key, value]: any) => ({ key, value })),
	}));

	// 系统信息
	info.value = await fetchSystemInfo();

	loading.value = false;
};
