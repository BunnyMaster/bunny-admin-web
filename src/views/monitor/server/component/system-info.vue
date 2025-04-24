<script lang="ts" setup>
import { useRenderIcon } from '@/components/CommonIcon/src/hooks';
import SystemCardItem from '@/components/MyCol/SystemCardItem.vue';
import { info, onSearch, onSearchDisk, percentage } from '@/views/monitor/server/utils/hooks';
import { onMounted } from 'vue';

onMounted(() => {
  onSearch();
  onSearchDisk();
});
</script>

<template>
  <SystemCardItem title="java">
    <template #icon>
      <component :is="useRenderIcon('devicon:java')" />
    </template>
    <el-text>
      <div>Java版本：{{ info?.java?.version }}</div>

      <div>供应商：{{ info?.java?.vendor?.name }}</div>
      <div>供应商版本：{{ info?.java?.vendor?.version }}</div>

      <div>运行时：{{ info?.java?.runtime?.name }}</div>
      <div>运行时版本：{{ info?.java?.runtime?.version }}</div>

      <div>jvm：{{ info?.java?.jvm?.name }}</div>
      <div>jvm版本：{{ info?.java?.jvm?.version }}</div>
    </el-text>
  </SystemCardItem>

  <SystemCardItem title="系统信息">
    <template #icon>
      <component :is="useRenderIcon('mdi:server')" />
    </template>
    <div>系统名称： {{ info?.os?.name }}</div>
    <div>系统版本： {{ info?.os?.version }}</div>
    <div>系统架构： {{ info?.os?.arch }}</div>
    <el-divider />
    <div class="flex flex-col items-center">
      <p class="list-card-item_detail--name text-text_color_primary">磁盘占用率</p>

      <div>
        <el-progress :percentage="percentage" type="dashboard" />
      </div>
    </div>
  </SystemCardItem>
</template>
