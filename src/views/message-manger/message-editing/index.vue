<script lang="ts" setup>
import SplitPane from '@/components/SplitPane';
import MessageEditorFrom from '@/views/message-manger/message-editing/components/message-editor-from.vue';
import RichEditor from '@/views/message-manger/message-editing/components/rich-editor.vue';
import { formState, settingLR } from '@/views/message-manger/message-editing/utils';
import MarkdownEditor from '@/views/message-manger/message-editing/components/markdown-editor.vue';
import { onMounted } from 'vue';

/** 退出提醒 */
const exitAlter = () => {
  window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    // 为了兼容旧版浏览器
    e.returnValue = '';
  });
};

onMounted(() => {
  exitAlter();
});
</script>

<template>
  <el-card shadow="never">
    <div class="split-pane">
      <SplitPane :splitSet="settingLR">
        <template #paneL>
          <rich-editor v-if="formState.editorType === 'rich'" />
          <markdown-editor v-else />
        </template>

        <template #paneR>
          <message-editor-from />
        </template>
      </SplitPane>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.split-pane {
  width: 100%;
  height: calc(100vh - 150px);
}
</style>
