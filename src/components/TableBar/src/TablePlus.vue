<template>
	<div class="main">
		<pure-table
			ref="tableRef"
			:adaptiveConfig="{ offsetBottom: 108 }"
			:columns="column"
			:data="dataList"
			:header-cell-style="cellHeaderStyle"
			:loading="loading"
			:size="size"
			adaptive
			align-whole="center"
			border
			row-key="id"
			table-layout="auto"
		/>
	</div>
</template>

<script lang="ts" setup>
import { cellHeaderStyle } from '@/components/TableBar/utils/tableStyle';
import PureTable from '@pureadmin/table';
import type { PropType } from 'vue';

// * 传入数据
defineProps({
	// 表格数据
	dataList: {
		type: Array<any>,
		default: [],
	},
	// 表格列字段
	column: {
		type: Array<any>,
		default: [],
	},
	loading: {
		type: Boolean,
		default: false,
	},
	size: {
		type: String as PropType<any>,
		default: 'default',
	},
});
</script>
