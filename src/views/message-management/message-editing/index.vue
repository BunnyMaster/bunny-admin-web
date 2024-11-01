<script lang="ts" setup>
import SplitPane from '@/components/SplitPane';
import MessageEditorFrom from '@/views/message-management/message-editing/message-editor-from.vue';
import RichEditor from '@/views/message-management/message-editing/rich-editor.vue';
import { formState } from '@/views/message-management/message-editing/utils/hooks';
import MarkdownEditor from '@/views/message-management/message-editing/markdown-editor.vue';
import { settingLR } from '@/views/message-management/message-editing/utils/columns';
</script>

<template>
	<el-card shadow="never">
		<div class="split-pane">
			<SplitPane :splitSet="settingLR">
				<template #paneL>
					<rich-editor v-if="formState.editorType === 'rich'" />
					<markdown-editor v-else />
				</template>

				<template #paneR>
					<message-editor-from />
				</template>
			</SplitPane>
		</div>
	</el-card>
</template>

<style lang="scss" scoped>
.split-pane {
	width: 100%;
	height: calc(100vh - 120px);
}
</style>
