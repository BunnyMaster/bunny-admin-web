<template>
	<MdPreview :editorId="id" :modelValue="text" />
</template>

<script setup>
import { MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';

defineProps({
	text: String,
	id: String,
});
</script>
