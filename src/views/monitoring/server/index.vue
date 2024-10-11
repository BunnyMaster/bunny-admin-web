<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import ListCard from '@/views/monitoring/server/list-card.vue';
import { fetchSystemHealthList } from '@/api/v1/system';
import { $t } from '@/plugins/i18n';

const datalist = ref([]);
const loading = ref(false);
const svg = `<path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>`;

/** 获取系统服务数据 */
const onSearch = async () => {
	loading.value = true;

	const result = await fetchSystemHealthList();
	datalist.value = Object.entries(result.components).map(([key, value]: any) => ({
		type: key,
		key: `${key}`,
		status: value.status === 'UP',
		details: value.details && Object.entries(value.details).map(([key, value]: any) => ({ key, value })),
	}));

	loading.value = false;
};

onMounted(() => {
	onSearch();
});
</script>

<template>
	<div v-loading="loading" :element-loading-svg="svg" element-loading-svg-view-box="-10, -10, 50, 50">
		<el-empty v-show="datalist.length === 0" :description="$t('no_server')" />
		<el-row :gutter="16">
			<el-col v-for="(product, index) in datalist" :key="index" :lg="6" :md="8" :sm="12" :xl="4" :xs="24">
				<ListCard :product="product" />
			</el-col>
		</el-row>
	</div>
</template>
