<template>
	<div class="main">
		<el-form ref="formRef" :inline="true" :model="form" class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto">
			<slot name="tableForm" />
		</el-form>

		<div class="mt-2 p-2 bg-bg_color">
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
	</div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { cellHeaderStyle } from '@/components/TableBar/utils/tableStyle';
import PureTable from '@pureadmin/table';

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
	// 表单参数
	form: {
		type: Object as PropType<any>,
		default: Object,
	},
});
</script>

<style lang="scss" scoped>
:deep(.el-dropdown-menu__item i) {
	margin: 0;
}

.main-content {
	margin: 24px 24px 0 !important;
}

.search-form {
	:deep(.el-form-item) {
		margin-bottom: 12px;
	}
}
</style>
