<script lang="ts" setup>
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import CloseIcon from '~icons/ep/close';
import StarIcon from '~icons/ep/star';
import type { optionsItem } from '../types';
import { $t } from '../../../../plugins/i18n';

interface Props {
  item: optionsItem;
}

interface Emits {
  (e: 'collectItem', val: optionsItem): void;

  (e: 'deleteItem', val: optionsItem): void;
}

const emit = defineEmits<Emits>();
withDefaults(defineProps<Props>(), {});

function handleCollect(item) {
  emit('collectItem', item);
}

function handleDelete(item) {
  emit('deleteItem', item);
}
</script>

<template>
  <component :is="useRenderIcon(item.meta?.icon)" />
  <span class="history-item-title">
    {{ $t(item.meta?.title) }}
  </span>
  <IconifyIconOffline v-show="item.type === 'history'" :icon="StarIcon" class="w-[18px] h-[18px] mr-2 hover:text-[#d7d5d4]" @click.stop="handleCollect(item)" />
  <IconifyIconOffline :icon="CloseIcon" class="w-[18px] h-[18px] hover:text-[#d7d5d4] cursor-pointer" @click.stop="handleDelete(item)" />
</template>

<style lang="scss" scoped>
.history-item-title {
  display: flex;
  flex: 1;
  margin-left: 5px;
}
</style>
