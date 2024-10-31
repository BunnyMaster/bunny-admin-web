import { reactive } from 'vue';

// 提交表单信息
export const formState = reactive({
	title: '',
	receivedUserIds: undefined,
	messageType: undefined,
	content: '',
	editorType: 'markdown',
	status: false,
});
