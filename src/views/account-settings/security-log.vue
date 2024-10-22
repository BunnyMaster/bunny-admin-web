<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { deviceDetection } from '@pureadmin/utils';
import { PureTable } from '@pureadmin/table';
import { columns } from '@/views/account-settings/utils/columns';
import { $t } from '@/plugins/i18n';
import { useUserLoginLogStore } from '@/store/monitor/userLoginLog';

const userLoginLogStore = useUserLoginLogStore();
const userLoginLogs = reactive({
	loading: false,
	datalist: [],
	currentPage: 1,
	pageSize: 150,
	total: 100,
	background: true,
	layout: 'prev, pager, next',
});

/** 获取用户登录日志内容 */
const onSearchByLoginLog = async () => {
	userLoginLogs.loading = true;

	const data = await userLoginLogStore.getUserLoginLogListByLocalUser(userLoginLogs);
	userLoginLogs.datalist = data.list;

	userLoginLogs.loading = false;
};

onMounted(() => {
	onSearchByLoginLog();
});
</script>

<template>
	<div :class="['min-w-[280px]', deviceDetection() ? 'max-w-[100%]' : 'max-w-[70%]']">
		<h3 class="my-8">{{ $t('security_log') }}</h3>
		<pure-table :columns="columns" :data="userLoginLogs.datalist" :loading="userLoginLogs.loading" :pagination="userLoginLogs" row-key="id" table-layout="auto" />
	</div>
</template>
