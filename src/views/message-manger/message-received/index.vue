<script lang="ts" setup>
import ReAuth from '@/components/ReAuth/src/auth';
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import { PureTableBar } from '@/components/RePureTableBar';
import { selectUserinfo } from '@/components/Table/Userinfo/columns';
import { isReadStatus } from '@/enums/baseConstant';
import { $t } from '@/plugins/i18n';
import { hasAuth } from '@/router/utils';
import { useMessageReceivedStore } from '@/store/message/messageReceived';
import { useMessageTypeStore } from '@/store/message/messageType';
import { messageLevel } from '@/views/message-manger/message-editing/utils';
import { auth, columns, onDeleteBatch, onSearch, selectIds, updateMarkMessageReceived } from '@/views/message-manger/message-received/utils';
import { Message } from '@element-plus/icons-vue';
import PureTable from '@pureadmin/table';
import { FormInstance } from 'element-plus';
import { onMounted, ref } from 'vue';
import Delete from '~icons/ep/delete';
import Refresh from '~icons/ep/refresh';

defineOptions({ name: 'MessageReceived' });

const tableRef = ref();
const formRef = ref();
const messageReceivedStore = useMessageReceivedStore();
const messageTypeStore = useMessageTypeStore();

/** 当前页改变时 */
const onCurrentPageChange = async (value: number) => {
  messageReceivedStore.pagination.currentPage = value;
  await onSearch();
};

/** 当分页发生变化 */
const onPageSizeChange = async (value: number) => {
  messageReceivedStore.pagination.pageSize = value;
  await onSearch();
};

/** 选择多行 */
const onSelectionChange = (rows: Array<any>) => {
  selectIds.value = rows.map((row: any) => row.id);
};

/** 重置表单 */
const resetForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  await onSearch();
};

onMounted(() => {
  onSearch();
});
</script>

<template>
  <div class="main">
    <ReAuth :value="auth.query">
      <el-form ref="formRef" :inline="true" :model="messageReceivedStore.form" class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto">
        <!-- 消息标题 -->
        <el-form-item :label="$t('title')" prop="title">
          <el-input v-model="messageReceivedStore.form.title" :placeholder="`${$t('input')}${$t('title')}`" class="!w-[180px]" clearable />
        </el-form-item>

        <!-- 发送人昵称 -->
        <el-form-item :label="$t('sendNickname')" prop="sendNickname">
          <el-input v-model="messageReceivedStore.form.sendNickname" :placeholder="`${$t('input')}${$t('sendNickname')}`" class="!w-[180px]" clearable />
        </el-form-item>

        <!-- 消息类型 -->
        <el-form-item :label="$t('messageType')" prop="messageType">
          <el-select
            v-model="messageReceivedStore.form.messageType"
            :placeholder="`${$t('select')}${$t('messageType')}`"
            class="!w-[180px]"
            clearable
            filterable
          >
            <el-option
              v-for="(item, index) in messageTypeStore.allMessageTypeList"
              :key="index"
              :label="item.messageName"
              :navigationBar="false"
              :value="item.messageType"
            />
          </el-select>
        </el-form-item>

        <!-- 编辑器类型 -->
        <el-form-item :label="$t('editorType')" prop="editorType">
          <el-select v-model="messageReceivedStore.form.editorType" :placeholder="`${$t('select')}${$t('editorType')}`" class="!w-[180px]" clearable filterable>
            <el-option v-for="(item, index) in ['rich', 'markdown']" :key="index" :label="item" :navigationBar="false" :value="item" />
          </el-select>
        </el-form-item>

        <!-- 消息等级 -->
        <el-form-item :label="$t('level')" prop="level">
          <el-select v-model="messageReceivedStore.form.level" :placeholder="$t('level')" class="!w-[180px]" clearable filterable remote remote-show-suffix>
            <el-option v-for="item in messageLevel" :key="item" :label="$t(item)" :value="item" />
          </el-select>
        </el-form-item>

        <!-- 消息等级简介 -->
        <el-form-item :label="$t('extra')" prop="extra">
          <el-input v-model="messageReceivedStore.form.extra" class="!w-[180px]" maxlength="20" minlength="10" show-word-limit type="text" />
        </el-form-item>

        <!-- 0:未读 1:已读 -->
        <el-form-item :label="$t('status')" prop="status">
          <el-select v-model="messageReceivedStore.form.status" :placeholder="$t('status')" class="!w-[180px]" clearable filterable remote remote-show-suffix>
            <el-option v-for="(item, index) in isReadStatus" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button :icon="useRenderIcon('ri/search-line')" :loading="messageReceivedStore.loading" type="primary" @click="onSearch">
            {{ $t('search') }}
          </el-button>
          <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">{{ $t('buttons.reset') }}</el-button>
        </el-form-item>
      </el-form>
    </ReAuth>

    <PureTableBar :columns="columns" title="系统消息" @fullscreen="tableRef.setAdaptive()" @refresh="onSearch">
      <template #buttons>
        <!-- 标为已读 -->
        <el-button
          v-if="hasAuth(auth.update)"
          :disabled="!(selectIds.length > 0)"
          :icon="useRenderIcon('octicon:read-24')"
          plain
          type="primary"
          @click="updateMarkMessageReceived(true)"
        >
          {{ $t('markAsRead') }}
        </el-button>

        <!-- 标为未读 -->
        <el-button
          v-if="hasAuth(auth.update)"
          :disabled="!(selectIds.length > 0)"
          :icon="Message"
          plain
          type="primary"
          @click="updateMarkMessageReceived(false)"
        >
          {{ $t('markAsUnread') }}
        </el-button>

        <!-- 批量删除按钮 -->
        <el-button v-if="hasAuth(auth.delete)" :disabled="!(selectIds.length > 0)" :icon="useRenderIcon(Delete)" plain type="danger" @click="onDeleteBatch">
          {{ $t('delete_batches') }}
        </el-button>
      </template>

      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          ref="tableRef"
          :adaptiveConfig="{ offsetBottom: 96 }"
          :columns="dynamicColumns"
          :data="messageReceivedStore.datalist"
          :header-cell-style="{
            background: 'var(--el-fill-color-light)',
            color: 'var(--el-text-color-primary)',
          }"
          :loading="messageReceivedStore.loading"
          :pagination="messageReceivedStore.pagination"
          :size="size"
          adaptive
          align-whole="center"
          border
          highlight-current-row
          row-key="id"
          showOverflowTooltip
          table-layout="auto"
          @page-size-change="onPageSizeChange"
          @selection-change="onSelectionChange"
          @page-current-change="onCurrentPageChange"
        >
          <template #sendNickname="{ row }">
            <el-button link type="primary" @click="selectUserinfo(row.sendUserId)">
              {{ row.sendNickname }}
            </el-button>
          </template>

          <template #receivedUserNickname="{ row }">
            <el-button link type="primary" @click="selectUserinfo(row.receivedUserId)">
              {{ row.receivedUserNickname }}
            </el-button>
          </template>

          <template #cover="{ row }">
            <el-image
              :initial-index="0"
              :preview-src-list="[row.cover]"
              :src="row.cover"
              class="w-[50px] h-[50px]"
              fit="cover"
              loading="lazy"
              preview-teleported
            />
          </template>

          <template #extra="{ row }">
            <el-text type="danger">{{ row.extra }}</el-text>
          </template>

          <template #messageType="{ row }">
            <el-tag effect="plain" round>{{ row.messageType }}</el-tag>
          </template>

          <template #createUser="{ row }">
            <el-button v-show="row.createUser" link type="primary" @click="selectUserinfo(row.createUser)">
              {{ row.createUsername }}
            </el-button>
          </template>

          <template #updateUser="{ row }">
            <el-button v-show="row.updateUser" link type="primary" @click="selectUserinfo(row.updateUser)">
              {{ row.updateUsername }}
            </el-button>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>
