<script lang="ts" setup>
import { $t } from '@/plugins/i18n';
import { useUserLoginLogStore } from '@/store/monitor/userLoginLog';
import { columns } from '@/views/account-settings/utils';
import { PureTable } from '@pureadmin/table';
import { deviceDetection } from '@pureadmin/utils';
import { onMounted, reactive } from 'vue';

const userLoginLogStore = useUserLoginLogStore();
const userLoginLogs = reactive({
  loading: false,
  datalist: [],
  currentPage: 1,
  pageSize: 15,
  total: 0,
  background: true,
  layout: 'prev, pager, next',
});

/** 获取用户登录日志内容 */
const onSearchByLoginLog = async () => {
  userLoginLogs.loading = true;

  const data = await userLoginLogStore.fetchUserLoginLogPageByUser(userLoginLogs);
  userLoginLogs.datalist = data.list;
  userLoginLogs.currentPage = data.pageNo;
  userLoginLogs.pageSize = data.pageSize;
  userLoginLogs.total = data.total;

  userLoginLogs.loading = false;
};

/** 当前页改变时 */
const onCurrentPageChange = async (value: number) => {
  userLoginLogs.currentPage = value;
  await onSearchByLoginLog();
};

onMounted(() => {
  onSearchByLoginLog();
});
</script>

<template>
  <div :class="['min-w-[280px]', deviceDetection() ? 'max-w-[100%]' : 'max-w-[70%]']">
    <h3 class="my-8">{{ $t('security_log') }}</h3>
    <pure-table
      :columns="columns"
      :data="userLoginLogs.datalist"
      :loading="userLoginLogs.loading"
      :pagination="userLoginLogs"
      row-key="id"
      table-layout="auto"
      @page-current-change="onCurrentPageChange"
    />
  </div>
</template>
