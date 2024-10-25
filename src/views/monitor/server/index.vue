<script lang="ts" setup>
import { onMounted } from 'vue';
import SystemInfo from '@/views/monitor/server/system-info.vue';
import { svg } from '@/views/monitor/server/utils/columns';
import { info, loading, onSearch } from '@/views/monitor/server/utils/hooks';
import SystemServer from '@/views/monitor/server/system-server.vue';
import SystemCpu from '@/views/monitor/server/system-cpu.vue';
import SystemJvmCpu from '@/views/monitor/server/system-jvm-cpu.vue';
import SystemDisk from '@/views/monitor/server/system-disk.vue';

onMounted(() => {
	onSearch();
});
</script>

<template>
	<div v-loading="loading" :element-loading-svg="svg" element-loading-svg-view-box="-10, -10, 50, 50">
		<el-row :gutter="16">
			<system-info v-if="info" :info="info" />
			<system-server />
			<system-cpu />
			<system-jvm-cpu />
			<system-disk />
		</el-row>
	</div>
</template>
