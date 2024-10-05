<script lang="ts" setup>
import { $t } from '@/plugins/i18n';
import { ref } from 'vue';
import { fetchGetIconNameList } from '@/api/v1/menuIcon';
import LoadingSvg from '@/assets/svg/loading.svg';
import { FormProps } from '@/views/system/menuIcon/utils/types';

const props = withDefaults(defineProps<FormProps>(), {
	formInline: () => ({}),
});

const loading = ref(false);
const iconNameList = ref([]);
const form = ref(props.formInline);

/**
 * * 搜索
 */
const onRequestIconName = async (iconName: string) => {
	const data = { currentPage: 1, pageSize: 20, iconName };
	loading.value = true;

	if (iconName) {
		const result = await fetchGetIconNameList(data);
		if (result.code === 200) iconNameList.value = result.data;
	} else iconNameList.value = [];

	loading.value = false;
};
</script>

<template>
	<el-select
		v-model="form.iconName"
		:loading="loading"
		:placeholder="$t('input') + $t('menuIcon_iconName')"
		:remote-method="onRequestIconName"
		allow-create
		clearable
		filterable
		remote
		remote-show-suffix
	>
		<el-option v-for="menuIcon in iconNameList" :key="menuIcon.id" :label="menuIcon.iconName" :value="menuIcon.iconName" />
		<template #loading>
			<el-icon class="is-loading">
				<LoadingSvg />
			</el-icon>
		</template>
	</el-select>
</template>

<style>
.el-select-dropdown__loading {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100px;
	font-size: 20px;
}

.circular {
	display: inline;
	width: 30px;
	height: 30px;
	animation: loading-rotate 2s linear infinite;
}

.path {
	stroke: var(--el-color-primary);
	stroke-dasharray: 90, 150;
	stroke-dashoffset: 0;
	stroke-linecap: round;
	stroke-width: 2;
	animation: loading-dash 1.5s ease-in-out infinite;
}

.loading-path .dot1 {
	opacity: 0.3;
	fill: var(--el-color-primary);
	transform: translate(3.75px, 3.75px);
	animation: custom-spin-move 1s infinite linear alternate;
}

.loading-path .dot2 {
	opacity: 0.3;
	fill: var(--el-color-primary);
	transform: translate(calc(100% - 3.75px), 3.75px);
	animation: custom-spin-move 1s infinite linear alternate;
	animation-delay: 0.4s;
}

.loading-path .dot3 {
	opacity: 0.3;
	fill: var(--el-color-primary);
	transform: translate(3.75px, calc(100% - 3.75px));
	animation: custom-spin-move 1s infinite linear alternate;
	animation-delay: 1.2s;
}

.loading-path .dot4 {
	opacity: 0.3;
	fill: var(--el-color-primary);
	transform: translate(calc(100% - 3.75px), calc(100% - 3.75px));
	animation: custom-spin-move 1s infinite linear alternate;
	animation-delay: 0.8s;
}

@keyframes loading-rotate {
	to {
		transform: rotate(360deg);
	}
}

@keyframes loading-dash {
	0% {
		stroke-dasharray: 1, 200;
		stroke-dashoffset: 0;
	}

	50% {
		stroke-dasharray: 90, 150;
		stroke-dashoffset: -40px;
	}

	100% {
		stroke-dasharray: 90, 150;
		stroke-dashoffset: -120px;
	}
}

@keyframes custom-spin-move {
	to {
		opacity: 1;
	}
}
</style>
