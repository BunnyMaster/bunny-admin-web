<script lang="ts" setup>
import { $t } from '@/plugins/i18n';
import { reactive, ref } from 'vue';
import { FormInstance } from 'element-plus';

interface FormProps {
	formInline: {
		confirmText: string;
	};
}

const props = withDefaults(defineProps<FormProps>(), {
	formInline: () => ({
		// 是否确认删除名称
		confirmText: '',
	}),
});

const rules = reactive({
	confirmText: [{ required: true, message: $t('deleteBatchPlaceholder'), trigger: 'blur' }],
});

const formDeletedBatchRef = ref<FormInstance>();
const form = ref(props.formInline);

defineExpose({ formDeletedBatchRef });
</script>

<template>
	<el-form ref="formDeletedBatchRef" :model="form" :rules="rules" label-width="auto">
		<el-form-item :label="$t('confirmText')" prop="confirmText">
			<el-input v-model="form.confirmText" :placeholder="$t('deleteBatchPlaceholder')" autocomplete="off" type="text" />
		</el-form-item>
	</el-form>
</template>
