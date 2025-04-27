<script lang="ts" setup>
import { onBeforeUnmount, ref, shallowRef } from 'vue';
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { getToken } from '@/utils/auth';
import { updateMessage } from '@/views/message-manger/message-send/utils';

const mode = 'default';
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
const toolbarConfig: any = { excludeKeys: 'fullScreen' };
const editorConfig = { placeholder: '请输入内容...', MENU_CONF: {} };
const token = ref(getToken().token);

editorConfig.MENU_CONF['uploadImage'] = {
  // 服务端上传地址，根据实际业务改写
  server: '/api/files/private/upload',
  // form-data 的 fieldName，根据实际业务改写
  fieldName: 'file',
  // 选择文件时的类型限制，根据实际业务改写
  allowedFileTypes: ['image/png', 'image/jpg', 'image/jpeg'],
  meta: { type: 'message' },
  headers: { token: token.value },
  // 自定义插入图片
  customInsert(res: any, insertFn) {
    // res.data.url是后端返回的图片地址，根据实际业务改写
    if (res.data.url) {
      setTimeout(() => {
        // insertFn插入图片进编辑器
        insertFn(res.data.url);
      }, 2000);
    }
  },
};

const handleCreated = (editor) => {
  // 记录 editor 实例，重要！
  editorRef.value = editor;
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
</script>

<template>
  <div>
    <Toolbar :defaultConfig="toolbarConfig" :editor="editorRef" :mode="mode" style="border-bottom: 1px solid #ccc" />
    <Editor
      v-model="updateMessage.content"
      :defaultConfig="editorConfig"
      :mode="mode"
      style="height: calc(100vh - 190px); overflow-y: hidden"
      @onCreated="handleCreated"
    />
  </div>
</template>
