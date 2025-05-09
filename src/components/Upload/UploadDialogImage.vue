<template>
  <el-upload :auto-upload="true" :before-upload="beforeUpload" :http-request="onUpload" :show-file-list="false" accept="image/*" drag>
    <el-image v-if="imageSrc" :src="imageSrc" fit="cover" lazy>
      <template #placeholder>
        <ImageLoading />
      </template>
    </el-image>
    <el-icon v-else size="36">
      <Plus />
    </el-icon>
  </el-upload>
  <el-button v-show="imageSrc" link type="primary" @click="onRemoveImage">删除图片</el-button>
</template>

<script lang="ts" setup>
import { Plus } from '@element-plus/icons-vue';
import { ElMessage, UploadRawFile, UploadRequestOptions } from 'element-plus';
import { onMounted, ref } from 'vue';
import { SystemEnum } from '@/enums/upload';
import { uploadImage } from '@/api/v1/system/system';
import ImageLoading from '@/components/Upload/ImageLoading.vue';

const props = defineProps({
  imageUrl: String,
  type: String,
});
const emits = defineEmits(['uploadCallback']);

const imageSrc = ref('');

/* 上传图片 */
const onUpload = async (options: UploadRequestOptions) => {
  // 整理参数
  const file = options.file;
  const type = props.type;
  const data = { file, type };

  // 上传文件并返回文件地址
  const result: any = await uploadImage(data);
  imageSrc.value = result.data.thUrl;
  emits('uploadCallback', result);
};

/* 删除图片 */
const onRemoveImage = () => {
  // 清除图片地址和文件信息
  imageSrc.value = '';

  // 重新赋值
  const data: any = {
    url: '',
    filename: '',
    filepath: '',
    fileSize: 0,
    size: '',
    fileType: '',
  };
  emits('uploadCallback', data);
};

/* 上传之前 */
const beforeUpload = (file: UploadRawFile) => {
  if (file.size > SystemEnum.IMAGE_SIZE) {
    ElMessage.error(SystemEnum.IMAGE_MESSAGE);
    return false;
  }
};

/* 初始化图片地址 */
const handleInitiateImageSrc = () => {
  const value = props.imageUrl;
  if (value) imageSrc.value = value;
};

onMounted(() => {
  handleInitiateImageSrc();
});
</script>
