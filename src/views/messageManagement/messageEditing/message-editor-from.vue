<script lang="ts" setup>
import { formState } from '@/views/messageManagement/messageEditing/utils/hooks';
import { onMounted, ref, toRaw } from 'vue';
import { $t } from '@/plugins/i18n';
import { rules } from '@/views/messageManagement/messageEditing/utils/columns';
import { FormInstance } from 'element-plus';
import { editorTypeList } from '@/views/messageManagement/message/utils/columns';
import LoadingSvg from '@/assets/svg/loading.svg';
import { useAdminUserStore } from '@/store/system/adminUser';
import { useMessageTypeStore } from '@/store/message/messageType';
import { encode } from 'js-base64';
import { message } from '@/utils/message';
import { useMessageStore } from '@/store/message/message';
import { usePublicHooks } from '@/views/hooks';

const formRef = ref();
// 用户信息列表
const userDataList = ref();
// 搜索用户加载
const loading = ref(false);
// 用户是否停用样式
const { switchStyle } = usePublicHooks();
const adminUserStore = useAdminUserStore();
const messageTypeStore = useMessageTypeStore();
const messageStore = useMessageStore();

/** 搜索 */
const onSearchUserinfo = async (keyword: string) => {
	loading.value = true;
	userDataList.value = await adminUserStore.queryUser({ keyword });
	loading.value = false;
};

/** 提交消息 */
const submitForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;

	// 内容过短
	if (formState.content.trim().length <= 30) {
		message($t('contentTooShortTip'), { type: 'warning' });
		return;
	}

	formEl.validate(async valid => {
		if (valid) {
			// 复制数据
			const data = toRaw(formState);
			data.content = encode(formState.content);

			// 添加消息
			const result = await messageStore.addMessage(data);
			if (!result) return;

			// 清除数据
			resetForm(formEl);
		}
	});
};

/** 重置消息 */
const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	const data = toRaw(formState);
	formEl.resetFields();
	formState.content = '';
};

onMounted(() => {
	messageTypeStore.getAllMessageTypeList();
});
</script>
<template>
	<el-form ref="formRef" :model="formState" :rules="rules" class="w-[100%] p-5" label-width="auto">
		<!-- 标题 -->
		<el-form-item :label="$t('title')" prop="title">
			<el-input v-model="formState.title" />
		</el-form-item>

		<!-- 消息类型 -->
		<el-form-item :label="$t('messageType')" prop="messageType">
			<el-select v-model="formState.messageType" :placeholder="`${$t('select')}${$t('messageType')}`" clearable filterable>
				<el-option v-for="(item, index) in messageTypeStore.allMessageTypeList" :key="index" :label="item.messageName" :navigationBar="false" :value="item.messageType" />
			</el-select>
		</el-form-item>

		<!-- 接收人ID -->
		<el-form-item :label="$t('receivedUserIds')" prop="receivedUserIds">
			<el-select v-model="formState.receivedUserIds" :loading="loading" :placeholder="$t('receivedUserIdTip')" :remote-method="onSearchUserinfo" clearable filterable multiple remote remote-show-suffix>
				<el-option v-for="item in userDataList" :key="item.id" :label="item.username" :value="item.id" />
				<template #loading>
					<el-icon class="is-loading">
						<LoadingSvg />
					</el-icon>
				</template>
			</el-select>
		</el-form-item>

		<!-- 编辑器类型 -->
		<el-form-item :label="$t('editorType')" prop="editorType">
			<el-radio-group v-model="formState.editorType">
				<el-radio v-for="(item, index) in editorTypeList" :key="index" :navigationBar="false" :value="item.value">
					{{ item.label }}
				</el-radio>
			</el-radio-group>
		</el-form-item>

		<!-- 是否已读 -->
		<el-form-item :label="$t('isRead')" prop="status">
			<el-switch v-model="formState.status" :active-text="$t('readAlready')" :active-value="true" :inactive-text="$t('unread')" :inactive-value="false" :style="switchStyle" inline-prompt />
		</el-form-item>

		<!-- 简介 -->
		<el-form-item :label="$t('summary')" prop="summary">
			<el-input v-model="formState.summary" :autosize="{ minRows: 3, maxRows: 6 }" maxlength="200" minlength="10" show-word-limit type="textarea" />
		</el-form-item>

		<!-- 提交 -->
		<el-form-item>
			<el-button type="primary" @click="submitForm(formRef)">{{ $t('submit') }}</el-button>
			<el-button @click="resetForm(formRef)">{{ $t('buttons.reset') }}</el-button>
		</el-form-item>
	</el-form>
</template>
