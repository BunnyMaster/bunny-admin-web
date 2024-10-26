<script lang="ts" setup>
import MarkdownPreview from '@/components/Markdown/MarkdownPreview.vue';
import { onMounted, ref } from 'vue';
import { decode } from 'js-base64';

const content = ref();

/** 获取文档信息 */
const onSearch = async () => {
	const response = await fetch('http://129.211.31.58:3000/api/v1/repos/auth/auth-web/contents/ReadMe.md');
	const json = await response.json();
	content.value = decode(json.content);
};

onMounted(() => {
	onSearch();
});
</script>

<template>
	<MarkdownPreview id="web-read-me" :text="content" />
</template>
