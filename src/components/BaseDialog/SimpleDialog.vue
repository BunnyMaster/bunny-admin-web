<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps({
	// ? 是否显示
	show: {
		type: Boolean,
	},
	// ? 点击旁白是否关闭
	clickNodalFlag: {
		type: Boolean,
		default: false,
	},
	// ? 是否按下esc关闭
	pressEscapeFlag: {
		type: Boolean,
		default: false,
	},
	// ? 返回文字
	cancelText: {
		type: String as PropType<string>,
		default: '返回',
	},
	// ? 确认文字
	confirmText: {
		type: String as PropType<string>,
		default: '确认',
	},
});
const emits = defineEmits(['onCancel', 'onConfirm']);

const dialogVisible = ref(props.show);

/**
 * * 返回时
 */
const onCancel = () => {
	emits('onCancel', false);
};

/**
 * * 当确认时
 */
const onConfirm = () => {
	emits('onConfirm', false);
};

watch(
	() => props.show,
	() => {
		dialogVisible.value = props.show;
	},
);
</script>

<template>
	<el-dialog v-model="dialogVisible" :close-on-click-modal="clickNodalFlag" :closeOnPressEscape="pressEscapeFlag" :onClose="onCancel" destroy-on-close draggable v-bind="$attrs">
		<template #header>
			<slot name="header" />
		</template>

		<slot name="default" />

		<template #footer>
			<slot name="dialogFooter">
				<div class="dialog-footer">
					<slot name="footer">
						<el-button @click="onCancel">{{ cancelText }}</el-button>
						<el-button type="primary" @click="onConfirm"> {{ confirmText }}</el-button>
					</slot>
					<slot name="footer-add" />
				</div>
			</slot>
		</template>
	</el-dialog>
</template>
