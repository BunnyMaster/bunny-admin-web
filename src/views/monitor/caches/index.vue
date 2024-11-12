<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { fetchSystemCaches } from '@/api/v1/actuator';

const caches = ref([]);
const onSearch = async () => {
	let result = await fetchSystemCaches();
	result = result.cacheManagers.cacheManagerWithMouth.caches;
	caches.value = Object.entries(result).map(([key, value]) => ({ key, value: value.target }));
};

onMounted(() => {
	onSearch();
});
</script>

<template>
	<el-descriptions :column="2" border direction="vertical" title="系统已缓存内容">
		<el-descriptions-item v-for="cache in caches" :key="cache.key" :label="cache.key" style="overflow: auto">
			{{ cache.value }}
		</el-descriptions-item>
	</el-descriptions>
</template>
