<script lang="ts" setup>
import MarkdownPreview from '@/components/Markdown/MarkdownPreview.vue';
import { onMounted, ref } from 'vue';
import { decode } from 'js-base64';

const content = ref();

/** 获取文档信息 */
const onSearch = async () => {
	const response = await fetch('https://gitee.com/api/v5/repos/BunnyBoss/bunny-admin-server/contents/ReadMe.md?access_token=1dc76ba34226aea3eca52c1121c51617');
	const json = await response.json();
	content.value = decode(json.content);
};

onMounted(() => {
	onSearch();
});
</script>

<template>
	<MarkdownPreview id="server-read-me" :text="content" />
</template>
