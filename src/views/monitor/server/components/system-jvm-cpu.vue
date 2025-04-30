<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { UtilsEChartsOption } from '@pureadmin/utils';
// import 'echarts-gl';
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import * as echarts from 'echarts';
import { useIntervalFn } from '@vueuse/core';
import dayjs from 'dayjs';
import { fetchSystemProcessCPU } from '@/api/v1/actuator';
import SystemCardItem from '@/components/ReCol/SystemCardItem.vue';
import { message } from '@/utils/message';

const jvmCPUECharts = ref();
const myChart = ref<any>();

// 初始化ECharts
const seriesData = ref([]);
const xSeriesData = ref([]);
// 数据显示长度
const dateDisplayLength = ref(20);

// 是否有权限继续访问
const hasAuthority = ref(true);

const option = reactive<UtilsEChartsOption>({
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'cross' },
    extraCssText: 'width: 170px',
  },
  legend: {
    top: '0%',
    left: 'center',
  },
  grid: {
    top: '20px',
    right: '20px',
    bottom: '20px',
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    inverse: true,
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: seriesData.value,
      type: 'line',
      areaStyle: {},
      animationDelay: function (idx) {
        // 设置动画延迟时间
        return idx * 10;
      },
      // 设置动画持续时间
      animationDuration: 1000,
    },
  ],
  animationDuration: 666,
  animationDurationUpdate: 200,
  animationEasing: 'linear',
  animationEasingUpdate: 'linear',
});

/** 初始化数据 */
const onSearch = async () => {
  // 保留数组中的最新10条数据
  if (seriesData.value.length > dateDisplayLength.value) {
    seriesData.value = seriesData.value.slice(-dateDisplayLength.value);
    xSeriesData.value = xSeriesData.value.slice(-dateDisplayLength.value);
  }

  // 获取数据
  const result = await fetchSystemProcessCPU();

  // 当前i请求是否可以继续
  if (result.code) {
    if (result.code == 403) {
      hasAuthority.value = false;
      message('Access Denied');
    }
    if (result.code != 200) {
      hasAuthority.value = false;
    }
  }

  const measurement = result.measurements[0];
  if (measurement) {
    const value = measurement.value;
    seriesData.value.push(value * 100);
    xSeriesData.value.push(dayjs().format('mm:ss'));
  }

  myChart.value.setOption({
    xAxis: { data: xSeriesData.value },
    series: [{ type: 'line', data: seriesData.value }],
  });
};

onMounted(() => {
  // 初始化eacharts
  myChart.value = echarts.init(jvmCPUECharts.value);
  option && myChart.value.setOption(option);

  onSearch();

  // 定时刷新，并且当前有权限才能继续请求
  useIntervalFn(() => hasAuthority.value && onSearch(), 2000);
});
</script>

<template>
  <SystemCardItem :md="24" :xl="12" title="JVM CPU使用率">
    <template #icon>
      <component :is="useRenderIcon('carbon:logo-vmware')" />
    </template>
    <div ref="jvmCPUECharts" style="width: 100%; height: 230px" />
  </SystemCardItem>
</template>
