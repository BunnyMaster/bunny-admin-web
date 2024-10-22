<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { deviceDetection } from '@pureadmin/utils';
import { PaginationProps, PureTable } from '@pureadmin/table';
import { columns } from '@/views/account-settings/utils/columns';
import { $t } from '@/plugins/i18n';

const loading = ref(true);
const dataList = ref([]);
const pagination = reactive<PaginationProps>({
	total: 0,
	pageSize: 10,
	currentPage: 1,
	background: true,
	layout: 'prev, pager, next',
});

async function onSearch() {
	// loading.value = true;
	// const { data } = await getMineLogs();
	// dataList.value = data.list;
	// pagination.total = data.total;
	// pagination.pageSize = data.pageSize;
	// pagination.currentPage = data.currentPage;
	//
	// setTimeout(() => {
	// 	loading.value = false;
	// }, 200);
}

onMounted(() => {
	onSearch();
});
</script>

<template>
	<div :class="['min-w-[180px]', deviceDetection() ? 'max-w-[100%]' : 'max-w-[70%]']">
		<h3 class="my-8">{{ $t('security_log') }}</h3>
		<pure-table :columns="columns" :data="dataList" :loading="loading" :pagination="pagination" row-key="id" table-layout="auto" />
	</div>
</template>
