<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { FormInstance } from 'element-plus';
import { coverUrl, editorTypeList, loading, onSearchUserinfo, onUpload, rules, updateMessage, userDataList } from '@/views/message-manger/message-send/utils';
import { $t } from '@/plugins/i18n';
import { useMessageTypeStore } from '@/store/message/messageType';
import LoadingSvg from '@/assets/svg/loading.svg';
import { beforeUpload, messageLevel, settingLR } from '@/views/message-manger/message-editing/utils';
import { Plus } from '@element-plus/icons-vue';
import SplitPane from '@/components/SplitPane';
import RichEditor from '@/views/message-manger/message-send/components/rich-editor.vue';
import MarkdownEditor from '@/views/message-manger/message-send/components/markdown-editor.vue';
import ImageLoading from '@/components/Upload/ImageLoading.vue';

const formRef = ref<FormInstance>();
const messageTypeStore = useMessageTypeStore();

onMounted(() => {
  messageTypeStore.loadMessageTypeList();
});

defineExpose({ formRef });
</script>

<template>
  <el-card shadow="never" style="height: calc(100vh - 300px); overflow: auto">
    <div class="split-pane">
      <SplitPane :splitSet="settingLR">
        <template #paneL>
          <rich-editor v-if="updateMessage.editorType === 'rich'" />
          <markdown-editor v-else />
        </template>

        <template #paneR>
          <el-form ref="formRef" :model="updateMessage" :rules="rules" class="w-[100%] p-5" label-width="auto">
            <!-- 标题 -->
            <el-form-item :label="$t('title')" prop="title">
              <el-input v-model="updateMessage.title" maxlength="8" show-word-limit />
            </el-form-item>

            <!-- 消息类型 -->
            <el-form-item :label="$t('messageType')" prop="messageTypeId">
              <el-select v-model="updateMessage.messageTypeId" :placeholder="`${$t('select')}${$t('messageType')}`" clearable filterable>
                <el-option
                  v-for="(item, index) in messageTypeStore.allMessageTypeList"
                  :key="index"
                  :label="item.messageName"
                  :navigationBar="false"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>

            <!-- 发送人 -->
            <el-form-item :label="$t('sendUserId')" prop="sendUserId">
              <el-select
                v-model="updateMessage.sendUserId"
                :loading="loading"
                :placeholder="$t('receivedUserIdTip')"
                :remote-method="onSearchUserinfo"
                clearable
                filterable
                remote
                remote-show-suffix
              >
                <el-option v-for="item in userDataList" :key="item.id" :label="item.username" :value="item.id" />
                <template #loading>
                  <el-icon class="is-loading">
                    <LoadingSvg />
                  </el-icon>
                </template>
              </el-select>
            </el-form-item>

            <!-- 接收人ID -->
            <el-form-item :label="$t('receivedUserIds')" prop="receivedUserIds">
              <el-select
                v-model="updateMessage.receivedUserIds"
                :loading="loading"
                :placeholder="$t('receivedUserIdTip')"
                :remote-method="onSearchUserinfo"
                clearable
                filterable
                multiple
                remote
                remote-show-suffix
              >
                <el-option v-for="item in userDataList" :key="item.id" :label="item.username" :value="item.id" />
                <template #loading>
                  <el-icon class="is-loading">
                    <LoadingSvg />
                  </el-icon>
                </template>
              </el-select>
            </el-form-item>

            <!-- 编辑器类型 -->
            <el-form-item :label="$t('editorType')" prop="editorType">
              <el-radio-group v-model="updateMessage.editorType">
                <el-radio v-for="(item, index) in editorTypeList" :key="index" :navigationBar="false" :value="item.value">
                  {{ item.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>

            <!-- 封面内容 -->
            <el-form-item :label="$t('cover')" prop="cover">
              <el-upload :auto-upload="true" :before-upload="beforeUpload" :http-request="onUpload" :show-file-list="false" accept="image/*" drag>
                <el-image v-if="coverUrl" :src="coverUrl" fit="cover" lazy>
                  <template #placeholder>
                    <ImageLoading />
                  </template>
                </el-image>
                <el-icon v-else size="36">
                  <Plus />
                </el-icon>
              </el-upload>
              <el-button v-show="coverUrl" link type="primary" @click="coverUrl = ''">删除图片</el-button>
            </el-form-item>

            <!-- 简介 -->
            <el-form-item :label="$t('summary')" prop="summary">
              <el-input v-model="updateMessage.summary" :autosize="{ minRows: 3, maxRows: 6 }" maxlength="50" minlength="10" show-word-limit type="textarea" />
            </el-form-item>

            <!-- 消息等级 -->
            <el-form-item :label="$t('level')" prop="level">
              <el-select v-model="updateMessage.level" :placeholder="$t('level')" clearable filterable remote remote-show-suffix>
                <el-option v-for="item in messageLevel" :key="item" :label="$t(item)" :value="item" />
              </el-select>
            </el-form-item>

            <!-- 消息等级简介 -->
            <el-form-item :label="$t('extra')" prop="extra">
              <el-input v-model="updateMessage.extra" maxlength="4" show-word-limit type="text" />
            </el-form-item>
          </el-form>
        </template>
      </SplitPane>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
:deep(.el-upload-dragger) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 90px;
}
</style>
