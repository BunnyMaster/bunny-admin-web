<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { decode } from 'js-base64';
import { MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';

const content = ref();

/** 获取文档信息 */
const onSearch = async () => {
	const response = await fetch('http://129.211.31.58:3000/api/v1/repos/auth/auth-server-java/contents/ReadMe.md');
	const json = await response.json();
	content.value = decode(json.content);
};

onMounted(() => {
	onSearch();
});
</script>

<template>
	<MdPreview id="server-read-me" :modelValue="content" />
</template>
