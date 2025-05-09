<script lang="ts" setup>
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { uploadImage } from '@/api/v1/system/system';
import { updateMessage } from '@/views/message-manger/message-send/utils';

/* 上传图片 */
const onUploadImg = async (files: any, callback: any) => {
  // 上传图片等待结果
  const res = await Promise.all(
    files.map((file: any) => {
      return new Promise(async (resolve) => {
        const form = new FormData();
        form.append('file', file);
        form.append('type', 'message');
        resolve(await uploadImage(form));
      });
    })
  );

  // 插入图片内容
  callback(res.map((item) => item.data.url));
};
</script>

<template>
  <MdEditor v-model="updateMessage.content" :showToolbarName="true" style="height: calc(100vh - 130px)" @onUploadImg="onUploadImg" />
</template>
