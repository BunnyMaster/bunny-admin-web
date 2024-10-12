<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { fetchGetMenuIconList } from '@/api/v1/menuIcon';
import { FormProps } from '@/components/SelectIcon/types';
import { $t } from '@/plugins/i18n';

const props = withDefaults(defineProps<FormProps>(), {
	formInline: () => ({
		icon: '',
	}),
});

const innerForm = reactive({
	datalist: [],
	currentPage: 1,
	pageSize: 30,
	total: 100,
	loading: false,
});
const form = ref(props.formInline);

/**
 * * 搜索和初始化
 */
const onSearch = async () => {
	innerForm.loading = true;
	const { currentPage, pageSize } = innerForm;

	// 获取数据
	const baseResult = await fetchGetMenuIconList({ currentPage, pageSize });
	if (baseResult.code !== 200) return;
	const data = baseResult.data;

	// 赋值内容
	innerForm.datalist = data.list;
	innerForm.currentPage = data.pageNo;
	innerForm.pageSize = data.pageSize;
	innerForm.total = data.total;
	innerForm.loading = false;
};

/**
 * * 修改图标
 * @param value
 */
const onChangeIcon = (value: any) => {
	form.value.icon = value.iconCode;
};

/**
 * * 清除图标
 */
const onClear = () => (form.value.icon = '');

/**
 * * 修改当前页
 * @param value
 */
const onCurrentChange = async (value: number) => {
	innerForm.currentPage = value;
	await onSearch();
};

onMounted(() => {
	onSearch();
});
</script>

<template>
	<div class="selector">
		<el-popover :popper-options="{ placement: 'auto' }" :width="350" popper-class="pure-popper" trigger="click">
			<template #reference>
				<div class="w-[60px] h-[32px] cursor-pointer flex justify-center items-center">
					<el-text v-if="!form.icon" type="primary">{{ $t('select_icon') }}</el-text>
					<IconifyIconOnline v-else :icon="form.icon" style="font-size: 32px" />
				</div>
			</template>

			<ul class="flex flex-wrap px-2 ml-2 h-[210px]">
				<li
					v-for="(item, key) in innerForm.datalist"
					:key="key"
					:class="`icon-item p-2 cursor-pointer mr-2 mt-1 flex justify-center items-center border border-[#e5e7eb] ${item.iconCode === form.icon ? 'current' : ''}`"
					:title="item.iconName"
					@click="onChangeIcon(item)"
				>
					<IconifyIconOnline :icon="item.iconCode" height="20px" width="20px" />
				</li>
			</ul>
			<el-empty v-show="innerForm.datalist.length === 0" :image-size="60" description="图标不存在" />

			<div class="w-full h-9 flex items-center overflow-auto border-t border-[#e5e7eb]">
				<el-pagination
					:current-page="innerForm.currentPage"
					:page-size="innerForm.pageSize"
					:pager-count="5"
					:total="innerForm.total"
					background
					class="flex-auto ml-2"
					hide-on-single-page
					layout="pager"
					size="small"
					@current-change="onCurrentChange"
				/>
				<el-button bg class="justify-end mr-2 ml-2" size="small" text type="danger" @click="onClear"> 清空</el-button>
			</div>
		</el-popover>
	</div>
</template>

<style lang="scss" scoped>
.current {
	color: var(--el-color-primary);
	border-color: var(--el-color-primary);
	transition: all 0.4s;
	transform: scaleX(1.05);
}

.icon-item {
	width: 38px;
	height: 38px;

	&:hover {
		color: var(--el-color-primary);
		border-color: var(--el-color-primary);
		transition: all 0.4s;
		transform: scaleX(1.05);
	}
}

:deep(.el-tabs__nav-next) {
	font-size: 15px;
	line-height: 32px;
	box-shadow: -5px 0 5px -6px #ccc;
}

:deep(.el-tabs__nav-prev) {
	font-size: 15px;
	line-height: 32px;
	box-shadow: 5px 0 5px -6px #ccc;
}

:deep(.el-input-group__append) {
	padding: 0;
}

:deep(.el-tabs__item) {
	height: 30px;
	font-size: 12px;
	font-weight: normal;
	line-height: 30px;
}

:deep(.el-tabs__header),
:deep(.el-tabs__nav-wrap) {
	position: static;
	margin: 0;
	box-shadow: 0 2px 5px rgb(0 0 0 / 6%);
}

:deep(.el-tabs__nav-wrap::after) {
	height: 0;
}

:deep(.el-tabs__nav-wrap) {
	padding: 0 24px;
}

:deep(.el-tabs__content) {
	margin-top: 4px;
}
</style>
