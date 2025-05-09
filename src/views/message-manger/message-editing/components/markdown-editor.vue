<script lang="ts" setup>
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { uploadFile } from '@/api/v1/system/system';
import { formState } from '@/views/message-manger/message-editing/utils';

/* 上传图片 */
const onUploadImg = async (files: any, callback: any) => {
  // 上传图片等待结果
  const res = await Promise.all(
    files.map((file: any) => {
      return new Promise(async (resolve) => {
        const form = new FormData();
        form.append('file', file);
        form.append('type', 'message');

        // markdown上传使用普通上传文件的方式
        // md图片和富文本编辑器不能是缩略图，因为看不清楚
        resolve(await uploadFile(form));
      });
    })
  );

  // 插入图片内容
  callback(res.map((item) => item.data.url));
};
</script>

<template>
  <MdEditor v-model="formState.content" :showToolbarName="true" style="height: calc(100vh - 150px)" @onUploadImg="onUploadImg" />
</template>
