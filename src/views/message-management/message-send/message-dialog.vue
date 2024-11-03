<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { FormInstance } from 'element-plus';
import { editorTypeList, rules } from '@/views/message-management/message-send/utils/columns';
import { $t } from '@/plugins/i18n';
import { usePublicHooks } from '@/views/hooks';
import { useMessageTypeStore } from '@/store/message/messageType';
import LoadingSvg from '@/assets/svg/loading.svg';
import { coverUrl, loading, onSearchUserinfo, onUpload, updateMessage, userDataList } from '@/views/message-management/message-send/utils/hooks';
import { messageLevel, settingLR } from '@/views/message-management/message-editing/utils/columns';
import { Plus } from '@element-plus/icons-vue';
import { beforeUpload } from '@/views/message-management/message-editing/utils/hooks';
import SplitPane from '@/components/SplitPane';
import RichEditor from '@/views/message-management/message-send/rich-editor.vue';
import MarkdownEditor from '@/views/message-management/message-send/markdown-editor.vue';

// 用户是否停用样式
const { switchStyle } = usePublicHooks();
const formRef = ref<FormInstance>();
const messageTypeStore = useMessageTypeStore();

onMounted(() => {
	messageTypeStore.getAllMessageTypeList();
});

defineExpose({ formRef });
</script>

<template>
	<el-card shadow="never" style="height: calc(100vh - 200px); overflow: auto">
		<div class="split-pane">
			<SplitPane :splitSet="settingLR">
				<template #paneL>
					<rich-editor v-if="updateMessage.editorType === 'rich'" />
					<markdown-editor v-else />
				</template>

				<template #paneR>
					<el-form ref="formRef" :model="updateMessage" :rules="rules" class="w-[100%] p-5" label-width="auto">
						<!-- 标题 -->
						<el-form-item :label="$t('title')" prop="title">
							<el-input v-model="updateMessage.title" />
						</el-form-item>

						<!-- 消息类型 -->
						<el-form-item :label="$t('messageType')" prop="messageTypeId">
							<el-select v-model="updateMessage.messageTypeId" :placeholder="`${$t('select')}${$t('messageType')}`" clearable filterable>
								<el-option v-for="(item, index) in messageTypeStore.allMessageTypeList" :key="index" :label="item.messageName" :navigationBar="false" :value="item.id" />
							</el-select>
						</el-form-item>

						<!-- 发送人 -->
						<el-form-item :label="$t('sendUserId')" prop="sendUserId">
							<el-select v-model="updateMessage.sendUserId" :loading="loading" :placeholder="$t('receivedUserIdTip')" :remote-method="onSearchUserinfo" clearable filterable remote remote-show-suffix>
								<el-option v-for="item in userDataList" :key="item.id" :label="item.username" :value="item.id" />
								<template #loading>
									<el-icon class="is-loading">
										<LoadingSvg />
									</el-icon>
								</template>
							</el-select>
						</el-form-item>

						<!-- 接收人ID -->
						<el-form-item :label="$t('receivedUserIds')" prop="receivedUserIds">
							<el-select
								v-model="updateMessage.receivedUserIds"
								:loading="loading"
								:placeholder="$t('receivedUserIdTip')"
								:remote-method="onSearchUserinfo"
								clearable
								filterable
								multiple
								remote
								remote-show-suffix
							>
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
							<el-radio-group v-model="updateMessage.editorType">
								<el-radio v-for="(item, index) in editorTypeList" :key="index" :navigationBar="false" :value="item.value">
									{{ item.label }}
								</el-radio>
							</el-radio-group>
						</el-form-item>

						<!-- 封面内容 -->
						<el-form-item :label="$t('cover')" prop="cover">
							<el-upload :auto-upload="true" :before-upload="beforeUpload" :http-request="onUpload" :show-file-list="false" accept="image/*" drag>
								<el-image v-if="coverUrl" :src="coverUrl" fit="cover" lazy>
									<template #placeholder>
										<img alt="" src="../../../assets/images/tip/loading.gif" />
									</template>
								</el-image>
								<el-icon v-else size="36">
									<Plus />
								</el-icon>
							</el-upload>
							<el-button v-show="coverUrl" link type="primary" @click="coverUrl = ''"> 删除图片</el-button>
						</el-form-item>

						<!-- 简介 -->
						<el-form-item :label="$t('summary')" prop="summary">
							<el-input v-model="updateMessage.summary" :autosize="{ minRows: 3, maxRows: 6 }" maxlength="200" minlength="10" show-word-limit type="textarea" />
						</el-form-item>

						<!-- 消息等级 -->
						<el-form-item :label="$t('level')" prop="level">
							<el-select v-model="updateMessage.level" :placeholder="$t('level')" clearable filterable remote remote-show-suffix>
								<el-option v-for="item in messageLevel" :key="item" :label="$t(item)" :value="item" />
							</el-select>
						</el-form-item>

						<!-- 消息等级简介 -->
						<el-form-item :label="$t('extra')" prop="extra">
							<el-input v-model="updateMessage.extra" maxlength="20" minlength="10" show-word-limit type="text" />
						</el-form-item>
					</el-form>
				</template>
			</SplitPane>
		</div>
	</el-card>
</template>

<style lang="scss" scoped>
:deep(.el-upload-dragger) {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 90px;
	height: 90px;
}
</style>
