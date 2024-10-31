<script lang="ts" setup>
import splitpane, { ContextProps } from '@/components/SplitPane';
import { reactive } from 'vue';
import MessageEditorFrom from '@/views/messageManagement/messageEditing/message-editor-from.vue';
import RichEditor from '@/views/messageManagement/messageEditing/rich-editor.vue';
import { formState } from '@/views/messageManagement/messageEditing/utils/hooks';
import MarkdownEditor from '@/views/messageManagement/messageEditing/markdown-editor.vue';

const settingLR: ContextProps = reactive({
	minPercent: 20,
	defaultPercent: 80,
	split: 'vertical',
});
</script>

<template>
	<el-card shadow="never">
		<div class="split-pane">
			<splitpane :splitSet="settingLR">
				<template #paneL>
					<RichEditor v-if="formState.editorType === 'rich'" />
					<markdown-editor v-else />
				</template>

				<template #paneR>
					<message-editor-from />
				</template>
			</splitpane>
		</div>
	</el-card>
</template>

<style lang="scss" scoped>
.split-pane {
	width: 100%;
	height: calc(100vh - 120px);
}
</style>
