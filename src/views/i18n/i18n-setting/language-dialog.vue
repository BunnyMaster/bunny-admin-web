<script lang="ts" setup>
import { ref } from 'vue';
import { FormInstance } from 'element-plus';
import SimpleDialog from '@/components/BaseDialog/SimpleDialog.vue';
import { userI18nStore } from '@/store/i18n/i18n';
import { rules } from '@/views/i18n/i18n-setting/utils/columns';

defineProps({
	// 是否显示弹窗
	visible: {
		type: Boolean,
		default: false,
	},
	// 标题内容
	title: {
		type: String,
	},
	// 表单内容
	form: {
		type: Object as PropType<any>,
	},
	// 关闭弹窗
	onClose: {
		type: Function as PropType<any>,
		default: () => {},
	},
	// 提交呢内容
	onSubmit: {
		type: Function as PropType<any>,
		default: () => {},
	},
});

const ruleFormRef = ref<FormInstance>();
const i18nStore = userI18nStore();

defineExpose({
	ruleFormRef,
});
</script>

<template>
	<SimpleDialog :show="visible" :title="title" width="600" @onCancel="onClose" @onConfirm="onSubmit(ruleFormRef)">
		<el-form ref="ruleFormRef" :model="form" :rules="rules" isDefault-icon label-position="left" label-width="135px">
			<el-form-item label="选择添加语言分类" prop="languageId">
				<el-select v-model="form.languageId!" filterable placeholder="选择添加语言分类">
					<el-option v-for="item in i18nStore.i18nTypeList" :key="item.id" :label="item.value" :value="item.id" />
				</el-select>
			</el-form-item>

			<el-form-item label="多语言key" prop="keyName">
				<el-input v-model="form.keyName!" clearable placeholder="输入多语言key" />
			</el-form-item>

			<el-form-item label="翻译" prop="translate">
				<el-input v-model="form.translate!" clearable placeholder="输入多语言翻译" />
			</el-form-item>
		</el-form>

		<template #footer-add>
			<slot name="footer" />
		</template>
	</SimpleDialog>
</template>
