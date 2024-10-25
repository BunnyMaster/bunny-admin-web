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
		<!--<el-empty v-if="false" :description="$t('no_server')" />-->

		<el-row :gutter="16">
			<system-info v-if="info" :info="info" />
			<system-server />
			<!--<el-col v-for="(product, index) in datalist" :key="index" :lg="6" :md="8" :sm="12" :xl="4" :xs="24">-->
			<!--	<ListCard :product="product" />-->
			<!--</el-col>-->
		</el-row>
	</div>
</template>
