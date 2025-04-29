<script lang="tsx" setup>
import { ref } from 'vue';
import ReCropper from '@/components/ReCropper';
import { formatBytes } from '@pureadmin/utils';
import { $t } from '@/plugins/i18n';

defineProps({
  imgSrc: String,
});

const emit = defineEmits(['cropper']);

const infos = ref();
const popoverRef = ref();
const refCropper = ref();
const showPopover = ref(false);
const cropperImg = ref<string>('');

function onCropper({ base64, blob, info }) {
  infos.value = info;
  cropperImg.value = base64;
  emit('cropper', { base64, blob, info });
}

function hidePopover() {
  popoverRef.value.hide();
}

defineExpose({ hidePopover });
</script>

<template>
  <div v-loading="!showPopover" element-loading-background="transparent">
    <el-popover ref="popoverRef" :visible="showPopover" placement="right" popper-style="top:260px" width="18vw">
      <template #reference>
        <div class="w-[18vw]">
          <ReCropper ref="refCropper" :src="imgSrc" circled @cropper="onCropper" @readied="showPopover = true" />
          <p v-show="showPopover" class="mt-1 text-center">
            {{ $t('cropper_preview_tips') }}
          </p>
        </div>
      </template>
      <div class="flex flex-wrap justify-center items-center text-center">
        <el-image v-if="cropperImg" :preview-src-list="Array.of(cropperImg)" :src="cropperImg" class="cropper-img-preview" fit="contain" />
        <div v-if="infos" class="mt-1">
          <p>{{ $t('image_size') }}：{{ parseInt(infos.width) }} × {{ parseInt(infos.height) }}{{ $t('pixel') }}</p>
          <p>
            {{ $t('file_size') }}：{{ formatBytes(infos.size) }}（{{ infos.size }}
            {{ $t('bytes') }}
          </p>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<style lang="scss" scoped>
.cropper-img-preview {
  height: 200px;

  :deep(.el-image__inner) {
    max-height: 310px;
  }
}
</style>
