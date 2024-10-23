<script lang="ts" setup>
import { onMounted } from 'vue';
import SystemInfo from '@/views/monitor/server/info.vue';
import { $t } from '@/plugins/i18n';
import { svg } from '@/views/monitor/server/utils/columns';
import ListCard from '@/views/monitor/server/list-card.vue';
import { datalist, info, loading, onSearch } from '@/views/monitor/server/utils/hooks';

onMounted(() => {
	onSearch();
});
</script>

<template>
	<div v-loading="loading" :element-loading-svg="svg" element-loading-svg-view-box="-10, -10, 50, 50">
		<el-empty v-if="false" :description="$t('no_server')" />

		<el-row :gutter="16">
			<system-info v-if="info.java.jvm" :info="info" />
			<el-col v-for="(product, index) in datalist" :key="index" :lg="6" :md="8" :sm="12" :xl="4" :xs="24">
				<ListCard :product="product" />
			</el-col>
		</el-row>
	</div>
</template>
