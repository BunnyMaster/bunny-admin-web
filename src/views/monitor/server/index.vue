<script lang="ts" setup>
import { onMounted } from 'vue';
import SystemInfo from '@/views/monitor/server/system-info.vue';
import { svg } from '@/views/monitor/server/utils/columns';
import { info, loading, onSearch } from '@/views/monitor/server/utils/hooks';
import SystemServer from '@/views/monitor/server/system-server.vue';

onMounted(() => {
	onSearch();
});
</script>

<template>
	<div v-loading="loading" :element-loading-svg="svg" element-loading-svg-view-box="-10, -10, 50, 50">
		<el-row :gutter="16">
			<system-info v-if="info" :info="info" />
			<system-server />
		</el-row>
	</div>
</template>
