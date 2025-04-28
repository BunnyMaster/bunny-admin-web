<script lang="ts" setup>
defineProps({
  index: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
  },
});
</script>

<template>
  <el-image :initial-index="index" :preview-src-list="[image]" :src="image" class="w-[50px] h-[50px]" fit="fill" loading="lazy" preview-teleported />
</template>
