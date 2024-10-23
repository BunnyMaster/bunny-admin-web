<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import Info from '@/views/monitor/server/info.vue';
import { fetchSystemHealthList, fetchSystemInfo } from '@/api/v1/actuator';
import { $t } from '@/plugins/i18n';
import { svg } from '@/views/monitor/server/utils/columns';
import ListCard from '@/views/monitor/server/list-card.vue';

// 系统健康状态
const datalist = ref([]);
// 系统运行信息
const info = ref({ java: { vendor: {}, runtime: {}, jvm: {} }, os: {} });
const loading = ref(false);

/** 获取系统服务数据 */
const onSearch = async () => {
	loading.value = true;

	// 获取系统运行状态信息
	const result = await fetchSystemHealthList();
	datalist.value = Object.entries(result.components).map(([key, value]: any) => ({
		type: key,
		key: `${key}`,
		status: value.status === 'UP',
		details: value.details && Object.entries(value.details).map(([key, value]: any) => ({ key, value })),
	}));

	// 系统信息
	info.value = await fetchSystemInfo();

	loading.value = false;
};

onMounted(() => {
	onSearch();
});
</script>

<template>
	<div v-loading="loading" :element-loading-svg="svg" element-loading-svg-view-box="-10, -10, 50, 50">
		<el-empty v-if="false" :description="$t('no_server')" />

		<el-row :gutter="16">
			<info v-if="info.java.jvm" :info="info" />
			<el-col v-for="(product, index) in datalist" :key="index" :lg="6" :md="8" :sm="12" :xl="4" :xs="24">
				<ListCard :product="product" />
			</el-col>
		</el-row>
	</div>
</template>
