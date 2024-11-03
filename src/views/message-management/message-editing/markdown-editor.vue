<script lang="ts" setup>
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { fetchUploadFile } from '@/api/v1/system';
import { formState } from '@/views/message-management/message-editing/utils/hooks';

/**
 * * 上传图片
 * @param files
 * @param callback
 */
const onUploadImg = async (files: any, callback: any) => {
	// 上传图片等待结果
	const res = await Promise.all(
		files.map((file: any) => {
			return new Promise(async resolve => {
				const form = new FormData();
				form.append('file', file);
				form.append('type', 'message');
				resolve(await fetchUploadFile(form));
			});
		}),
	);

	// 插入图片内容
	callback(res.map(item => item.data.url));
};
</script>

<template>
	<MdEditor v-model="formState.content" :showToolbarName="true" style="height: calc(100vh - 150px)" @onUploadImg="onUploadImg" />
</template>
