<script lang="ts" setup>
import { useLoggedInStore } from '@/store/monitor/loggedIn';
import { onMounted, ref } from 'vue';
import { $t } from '@/plugins/i18n';
import { PureTableBar } from '@/components/RePureTableBar';
import PureTable from '@pureadmin/table';
import { storeToRefs } from 'pinia';
import { columns } from '@/views/monitor/logged-in/utils/columns';
import { selectUserinfo } from '@/components/Table/Userinfo/columns';
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import Airplane from '@/assets/svg/airplane.svg';
import { onForcedOffline } from '@/views/system/admin-user/utils';

const tableRef = ref();
const loggedInStore = useLoggedInStore();
const { datalist, loading, pagination } = storeToRefs(loggedInStore);

const onSearch = async () => {
  loggedInStore.loading = true;
  await loggedInStore.fetchLoggedInPage();
  loggedInStore.loading = false;
};

/** 当前页改变时 */
const onCurrentPageChange = async (value: number) => {
  loggedInStore.pagination.currentPage = value;
  await onSearch();
};

/** 当分页发生变化 */
const onPageSizeChange = async (value: number) => {
  loggedInStore.pagination.pageSize = value;
  await onSearch();
};

onMounted(() => {
  onSearch();
});
</script>

<template>
  <div class="main">
    <PureTableBar :columns="columns" :title="$t('logged_in_user')" @fullscreen="tableRef.setAdaptive()" @refresh="onSearch">
      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          ref="tableRef"
          :adaptiveConfig="{ offsetBottom: 96 }"
          :columns="dynamicColumns"
          :data="datalist"
          :header-cell-style="{
            background: 'var(--el-fill-color-light)',
            color: 'var(--el-text-color-primary)',
          }"
          :loading="loading"
          :pagination="pagination"
          :size="size"
          adaptive
          align-whole="center"
          border
          highlight-current-row
          row-key="id"
          showOverflowTooltip
          table-layout="auto"
          @page-size-change="onPageSizeChange"
          @page-current-change="onCurrentPageChange"
        >
          <template #username="{ row }">
            <el-button v-show="row.username" link type="primary" @click="selectUserinfo(row.createUser)">
              {{ row.username }}
            </el-button>
          </template>

          <template #operation="{ row }">
            <el-button :icon="useRenderIcon(Airplane)" :size="size" link type="primary" @click="onForcedOffline(row)">
              {{ $t('forced_offline') }}
            </el-button>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>
