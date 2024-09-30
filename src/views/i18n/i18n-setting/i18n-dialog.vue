<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { FormInstance } from 'element-plus';
import { rules } from '@/views/i18n/i18n-setting/utils/columns';
import { FormProps } from '@/views/i18n/i18n-setting/utils/types';
import { userI18nTypeStore } from '@/store/i18n/i18nType';

const props = withDefaults(defineProps<FormProps>(), {
	formInline: () => ({
		keyName: '',
		translation: '',
		typeName: '',
	}),
});

const ruleFormRef = ref<FormInstance>();
const form = ref(props.formInline);
const i18nTypeStore = userI18nTypeStore();

onMounted(() => {
	i18nTypeStore.getI18nTypeList();
});
defineExpose({ ruleFormRef });
</script>

<template>
	<el-form ref="ruleFormRef" :model="form" :rules="rules" isDefault-icon label-position="left" label-width="135px">
		<el-form-item label="选择添加语言分类" prop="typeName">
			<el-select v-model="form.typeName" filterable placeholder="选择添加语言分类">
				<el-option v-for="item in i18nTypeStore.datalist" :key="item.id" :label="item.typeName" :value="item.typeName" />
			</el-select>
		</el-form-item>

		<el-form-item label="多语言key" prop="keyName">
			<el-input v-model="form.keyName" clearable placeholder="输入多语言key" />
		</el-form-item>

		<el-form-item label="翻译" prop="translation">
			<el-input v-model="form.translation" clearable placeholder="输入多语言翻译" />
		</el-form-item>
	</el-form>
</template>
