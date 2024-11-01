<script lang="ts" setup>
import { ref } from 'vue';
import { FormInstance } from 'element-plus';
import { rules } from '@/views/message-management/message-type/utils/columns';
import { FormProps } from '@/views/message-management/message-type/utils/types';
import { $t } from '@/plugins/i18n';
import { usePublicHooks } from '@/views/hooks';

const props = withDefaults(defineProps<FormProps>(), {
	formInline: () => ({
		// 是否启用
		status: true,
		// 消息名称
		messageName: undefined,
		// 消息类型
		messageType: undefined,
		// 消息备注
		summary: undefined,
	}),
});

const formRef = ref<FormInstance>();
const form = ref(props.formInline);
// 用户是否停用样式
const { switchStyle } = usePublicHooks();

defineExpose({ formRef });
</script>

<template>
	<el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
		<!-- 消息类型 -->
		<el-form-item :label="$t('messageType')" prop="messageType">
			<el-input v-model="form.messageType" :placeholder="$t('input') + $t('messageType')" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 消息名称 -->
		<el-form-item :label="$t('messageName')" prop="messageName">
			<el-input v-model="form.messageName" :placeholder="$t('input') + $t('messageName')" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 消息备注 -->
		<el-form-item :label="$t('summary')" prop="summary">
			<el-input v-model="form.summary" :placeholder="$t('input') + $t('summary')" autocomplete="off" maxlength="300" show-word-limit type="textarea" />
		</el-form-item>

		<!-- 是否启用 -->
		<el-form-item :label="$t('status')" prop="status">
			<el-switch v-model="form.status" :active-text="$t('enable')" :active-value="true" :inactive-text="$t('disable')" :inactive-value="false" :style="switchStyle" inline-prompt />
		</el-form-item>
	</el-form>
</template>
