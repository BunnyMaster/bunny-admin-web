<script lang="ts" setup>
import { PropType } from 'vue';
import { ListItem } from '../data';
import NoticeItem from './NoticeItem.vue';

defineProps({
  list: {
    type: Array as PropType<Array<ListItem>>,
    default: () => [],
  },
  emptyText: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <div v-if="list.length" class="mb-4">
    <NoticeItem v-for="(item, index) in list" :key="index" :noticeItem="item" />
  </div>
  <el-empty v-else :description="emptyText" />
</template>
