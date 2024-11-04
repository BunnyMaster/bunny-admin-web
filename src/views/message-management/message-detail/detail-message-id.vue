<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import 'plus-pro-components/es/components/check-card-group/style/css';
import { MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';
import { useMessageUserStore } from '@/store/message/messageUser';

const route = useRoute();
const messageUserStore = useMessageUserStore();

/** 获取消息详情 */
const getMessageDetail = async () => {
	// 从路由中获取地址栏信息
	const messageId = route.params.messageId;

	// 获取消息详情
	await messageUserStore.getMessageDetailById(messageId);
};

onMounted(() => {
	getMessageDetail();
});
</script>

<template>
	<div class="flex flex-col">
		<header class="flex items-center h-[80px]">
			<el-avatar :src="messageUserStore.messageDetail?.cover" size="large" />
			<div class="content ms-3">
				<h3>{{ messageUserStore.messageDetail?.title }}</h3>

				<p>{{ messageUserStore.messageDetail?.summary }}</p>
			</div>
		</header>

		<main>
			<span>
				<el-text>{{ messageUserStore.messageDetail?.updateTime }}</el-text>
				<el-text type="primary">&nbsp;&nbsp; By：{{ messageUserStore.messageDetail?.sendNickname }}</el-text>
			</span>
			<MdPreview v-if="messageUserStore.messageDetail?.editorType === 'markdown'" id="message-detail-markdown" :model-value="messageUserStore.messageDetail?.content" />
			<div v-else v-html="messageUserStore.messageDetail?.content" />
		</main>
	</div>
</template>
