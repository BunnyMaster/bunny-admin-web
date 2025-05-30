<script lang="ts" setup>
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import { PureTableBar } from '@/components/RePureTableBar';
import { isReadStatus } from '@/enums/baseConstant';
import { $t } from '@/plugins/i18n';
import { useMessageTypeStore } from '@/store/message/messageType';
import { useMessageUserStore } from '@/store/message/messageUser';
import { columns, markAsAllRead, markAsRead, onDelete, onSearch, selectIds } from '@/views/message-manger/message-detail/utils';
import { Message } from '@element-plus/icons-vue';
import PureTable from '@pureadmin/table';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Delete from '~icons/ep/delete';

const tableRef = ref();
const formRef = ref();
const messageTypeStore = useMessageTypeStore();
const messageUserStore = useMessageUserStore();
const route = useRoute();
const router = useRouter();

/** 当前页改变时 */
const onCurrentPageChange = (value: number) => {
  messageUserStore.pagination.currentPage = value;
  onSearch((route.params as any)?.messageType);
};

/* 当分页发生变化 */
const onPageSizeChange = (value: number) => {
  messageUserStore.pagination.pageSize = value;
  onSearch((route.params as any).messageType);
};

/**
 * * 选择多行
 * @param rows
 */
const onSelectionChange = (rows: Array<any>) => {
  selectIds.value = rows.map((row: any) => row.messageReceivedId);
};

onMounted(() => {
  onSearch((route.params as any).messageType);
});
</script>

<template>
  <div class="main">
    <PureTableBar :columns="columns" @fullscreen="tableRef.setAdaptive()" @refresh="onSearch((route.params as any).messageType)">
      <template #title>
        <el-segmented v-model="messageUserStore.form.status" :options="isReadStatus" @change="onSearch((route.params as any).messageType)" />
      </template>

      <template #buttons>
        <!-- 删除按钮 -->
        <el-button :disabled="!(selectIds.length > 0)" :icon="useRenderIcon(Delete)" plain type="danger" @click="onDelete">
          {{ $t('delete') }}
        </el-button>

        <!-- 标为已读 -->
        <el-button :disabled="!(selectIds.length > 0)" :icon="useRenderIcon('octicon:read-24')" plain type="primary" @click="markAsRead">
          {{ $t('markAsRead') }}
        </el-button>

        <!-- 全部标为已读 -->
        <el-button :icon="useRenderIcon('octicon:read-24')" plain type="primary" @click="markAsAllRead">
          {{ $t('allMarkAsRead') }}
        </el-button>

        <!-- 标题搜索 -->
        <el-input
          v-model="messageUserStore.form.title"
          :placeholder="`${$t('input')}${$t('title')}`"
          class="!w-[180px] ml-3"
          clearable
          @input="onSearch((route.params as any).messageType)"
        />
      </template>

      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          ref="tableRef"
          :adaptiveConfig="{ offsetBottom: 96 }"
          :columns="dynamicColumns"
          :data="messageUserStore.datalist"
          :header-cell-style="{
            background: 'var(--el-fill-color-light)',
            color: 'var(--el-text-color-primary)',
          }"
          :loading="messageUserStore.loading"
          :pagination="messageUserStore.pagination"
          :size="size"
          adaptive
          highlight-current-row
          row-key="id"
          showOverflowTooltip
          table-layout="auto"
          @page-size-change="onPageSizeChange"
          @selection-change="onSelectionChange"
          @page-current-change="onCurrentPageChange"
        >
          <template #title="{ row }">
            <el-link
              v-if="row.status"
              :icon="useRenderIcon('octicon:read-24')"
              :underline="false"
              type="info"
              @click="router.push(`/message-detail/${messageTypeStore?.form?.messageType}/${row.id}`)"
            >
              {{ row.title }}
            </el-link>

            <el-link
              v-else
              :icon="Message"
              :underline="false"
              type="primary"
              @click="router.push(`/message-detail/${messageTypeStore?.form?.messageType}/${row.id}`)"
            >
              {{ row.title }}
            </el-link>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<style lang="scss" scoped>
.el-link {
  :deep(.el-icon) {
    margin: 0 5px 0 0;
  }
}
</style>
