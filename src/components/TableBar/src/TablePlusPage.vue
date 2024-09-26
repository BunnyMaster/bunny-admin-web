<template>
	<div class="main mt-2 p-2 bg-bg_color">
		<pure-table
			ref="tableRef"
			:adaptiveConfig="{ offsetBottom: 108 }"
			:columns="column"
			:data="dataList"
			:header-cell-style="cellHeaderStyle"
			:loading="loading"
			:pagination="pagination"
			:paginationSmall="size === 'small'"
			:size="size"
			adaptive
			align-whole="center"
			border
			row-key="id"
			table-layout="auto"
			@selection-change="handleSelectionChange"
			@page-size-change="handleSizeChange"
			@page-current-change="handleCurrentChange"
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
	// 是否加载
	loading: {
		type: Boolean,
		default: false,
	},
	// 页面字体大小，small | default | large
	size: {
		type: String as PropType<any>,
		default: 'default',
	},
	// 分页器参数
	pagination: {
		type: Object,
		default: Object,
	},
	// 一页大小变化
	handleSelectionChange: {
		type: Function as PropType<Function>,
		default: () => {},
	},
	// 分页大小变化
	handleSizeChange: {
		type: Function as PropType<Function>,
		default: () => {},
	},
	// 当前页变化
	handleCurrentChange: {
		type: Function as PropType<Function>,
		default: () => {},
	},
});
</script>

<style lang="scss" scoped></style>
