<script lang="ts" setup>
import { ref } from 'vue';
import { FormInstance } from 'element-plus';
import { rules } from '@/views/i18n/i18n-type-setting/utils/columns';
import { FormProps } from '@/views/i18n/i18n-type-setting/utils/types';
import { frameSureOptions } from '@/enums';
import Segmented from '@/components/Segmented';

const props = withDefaults(defineProps<FormProps>(), {
	formInline: () => ({
		typeName: '',
		summary: '',
		isDefault: true,
	}),
});

const formRef = ref<FormInstance>();
const form = ref(props.formInline);

defineExpose({ formRef });
</script>

<template>
	<el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
		<el-form-item label="语言名称" prop="typeName">
			<el-input v-model="form.typeName" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item label="语言详情" prop="summary">
			<el-input v-model="form.summary" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item label="是否为默认语言" prop="isDefault">
			<el-form-item label="是否为默认语言">
				<Segmented :modelValue="form.isDefault ? 0 : 1" :options="frameSureOptions" @change="({ option: { value } }) => (form.isDefault = value)" />
			</el-form-item>
		</el-form-item>
	</el-form>
</template>
