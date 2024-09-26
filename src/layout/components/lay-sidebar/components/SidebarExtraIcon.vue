<script lang="ts" setup>
import { useRenderIcon } from "@/components/CommonIcon/src/hooks";
import { toRaw } from "vue";

defineProps({
  extraIcon: {
    type: String,
    default: ""
  }
});
</script>

<template>
  <div v-if="extraIcon" class="flex justify-center items-center">
    <component
      :is="useRenderIcon(toRaw(extraIcon))"
      class="w-[30px] h-[30px]"
    />
  </div>
</template>
