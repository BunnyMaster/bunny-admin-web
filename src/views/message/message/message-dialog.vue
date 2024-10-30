<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { FormInstance } from 'element-plus';
import { editorTypeList, rules } from '@/views/message/message/utils/columns';
import { FormProps } from '@/views/message/message/utils/types';
import { $t } from '@/plugins/i18n';
import { usePublicHooks } from '@/views/hooks';
import { useMessageTypeStore } from '@/store/message/messageType';
import LoadingSvg from '@/assets/svg/loading.svg';
import { useAdminUserStore } from '@/store/system/adminUser';

const props = withDefaults(defineProps<FormProps>(), {
	formInline: () => ({
		// 消息标题
		title: undefined,
		// 接收人用户ID
		receivedUserId: undefined,
		// 发送人用户ID
		sendUserId: undefined,
		// 发送人昵称
		sendNickName: undefined,
		// 消息类型
		messageType: undefined,
		// 消息内容
		content: undefined,
		// 编辑器类型
		editorType: undefined,
		// 0:未读 1:已读
		status: undefined,
	}),
});
// 用户是否停用样式
const { switchStyle } = usePublicHooks();
const formRef = ref<FormInstance>();
const form = ref(props.formInline);
const adminUserStore = useAdminUserStore();
const messageTypeStore = useMessageTypeStore();
// 搜索用户加载
const loading = ref(false);
// 用户信息列表
const userDataList = ref();

/** 搜索 */
const onSearchUserinfo = async (keyword: string) => {
	loading.value = true;
	userDataList.value = await adminUserStore.queryUser({ keyword });
	loading.value = false;
};

/** 当选择发送用户 */
const onSelectSendUser = (va: any) => {
	const user = userDataList.value.filter((user: any) => user.id === va)[0];
	form.value.sendNickName = user.nickname;
};

onMounted(() => {
	messageTypeStore.getAllMessageTypeList();
});
defineExpose({ formRef });
</script>

<template>
	<el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
		<!-- 消息标题 -->
		<el-form-item :label="$t('title')" prop="title">
			<el-input v-model="form.title" :placeholder="$t('input') + $t('title')" autocomplete="off" maxlength="100" type="text" />
		</el-form-item>

		<!-- 接收人用户ID -->
		<el-form-item :label="$t('receivedUserId')" prop="receivedUserId">
			<el-input v-model="form.receivedUserId" :placeholder="$t('receivedUserIdTip')" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 发送人用户ID -->
		<el-form-item :label="$t('sendUserId')" prop="sendUserId">
			<el-select
				v-model="form.sendUserId"
				:loading="loading"
				:placeholder="$t('select') + $t('sendUserId')"
				:remote-method="onSearchUserinfo"
				clearable
				filterable
				remote
				remote-show-suffix
				@change="onSelectSendUser"
			>
				<el-option v-for="item in userDataList" :key="item.id" :label="item.username" :value="item.id" />
				<template #loading>
					<el-icon class="is-loading">
						<LoadingSvg />
					</el-icon>
				</template>
			</el-select>
		</el-form-item>

		<!-- 消息类型 -->
		<el-form-item :label="$t('messageType')" prop="messageType">
			<el-select v-model="form.messageType" :placeholder="`${$t('select')}${$t('messageType')}`" clearable filterable>
				<el-option v-for="(item, index) in messageTypeStore.allMessageTypeList" :key="index" :label="item.messageName" :navigationBar="false" :value="item.messageType" />
			</el-select>
		</el-form-item>

		<!-- 编辑器类型 -->
		<el-form-item :label="$t('editorType')" prop="editorType">
			<el-select v-model="form.editorType" :placeholder="`${$t('select')}${$t('editorType')}`" clearable filterable>
				<el-option v-for="(item, index) in editorTypeList" :key="index" :label="item.label" :navigationBar="false" :value="item.value" />
			</el-select>
		</el-form-item>

		<!-- 消息内容 -->
		<el-form-item :label="$t('content')" prop="content">
			<el-input v-model="form.content" :placeholder="$t('input') + $t('content')" autocomplete="off" type="textarea" />
		</el-form-item>

		<!-- 0:未读 1:已读 -->
		<el-form-item :label="$t('status')" prop="status">
			<el-switch v-model="form.status" :active-text="$t('readAlready')" :active-value="true" :inactive-text="$t('unread')" :inactive-value="false" :style="switchStyle" inline-prompt />
		</el-form-item>
	</el-form>
</template>
