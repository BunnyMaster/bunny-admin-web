// 系统健康状态
import { fetchSystemDiskFree, fetchSystemDiskTotal, fetchSystemHealthList, fetchSystemInfo } from '@/api/v1/actuator';
import { ref } from 'vue';

export const loading = ref(false);
// 系统服务信息
export const systemServerInfo = ref<any>({});
// 系统运行信息
export const info = ref<any>({});
// 磁盘可用空间
const free = ref();
// 磁盘总空间
const total = ref();
// 磁盘占用百分比
export const percentage = ref<number>(0);

/** 获取系统服务数据 */
export const onSearch = async () => {
  loading.value = true;

  // 获取系统运行状态信息
  systemServerInfo.value = await fetchSystemHealthList();

  // 系统信息
  info.value = await fetchSystemInfo();

  loading.value = false;
};

/** 获取磁盘信息数据 */
export const onSearchDisk = async () => {
  // 获取数据
  const diskFree = await fetchSystemDiskFree();
  const diskTotal = await fetchSystemDiskTotal();
  free.value = diskFree.measurements[0].value / 1024 / 1024 / 1024;
  total.value = diskTotal.measurements[0].value / 1024 / 1024 / 1024;

  free.value = free.value.toFixed(2);
  total.value = total.value.toFixed(2);

  percentage.value = ((total.value - free.value) / total.value) * 100;
  percentage.value = Number(percentage.value.toFixed(2));
};
