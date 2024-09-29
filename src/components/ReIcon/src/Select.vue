<script lang="ts" setup>
import LocalSelect from '@/components/ReIcon/src/LocalSelect.vue';
import { inputValue } from '@/components/ReIcon/src/hooks';

defineOptions({
	name: 'IconSelect',
});
</script>

<template>
	<div class="selector">
		<el-input v-model="inputValue" disabled>
			<template #append>
				<LocalSelect />
			</template>
		</el-input>
	</div>
</template>

<style lang="scss" scoped>
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
