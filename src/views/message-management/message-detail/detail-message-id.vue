<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import 'plus-pro-components/es/components/check-card-group/style/css';
import MarkdownPreview from '@/components/Editor/MarkdownPreview.vue';
import { fetchGetMessageDetailById } from '@/api/v1/message';
import { decode } from 'js-base64';

const route = useRoute();
const messageDetail = ref<any>({});

/** 获取消息详情 */
const getMessageDetail = async () => {
	// 从路由中获取地址栏信息
	const messageId = route.params.messageId;

	// 获取消息详情
	const result = await fetchGetMessageDetailById({ id: messageId });
	if (result.code !== 200) return;

	// 将消息详情赋值
	messageDetail.value = result.data;

	// 解码消息内容
	messageDetail.value.content = decode(messageDetail.value.content);
};

onMounted(() => {
	getMessageDetail();
});
</script>

<template>
	<div class="flex flex-col">
		<header class="flex items-center h-[80px]">
			<el-avatar :src="messageDetail.cover" size="large" />
			<div class="content ms-3">
				<h3>{{ messageDetail.title }}</h3>

				<p>{{ messageDetail.summary }}</p>
			</div>
		</header>

		<main>
			<span>
				<el-text>{{ messageDetail.updateTime }}</el-text>
				<el-text type="primary">&nbsp;&nbsp; By：{{ messageDetail.sendNickname }}</el-text>
			</span>
			<markdown-preview v-if="messageDetail.editorType === 'markdown'" id="message-detail-markdown" :text="messageDetail.content" />
			<div v-else v-html="messageDetail.content" />
		</main>
	</div>
</template>
