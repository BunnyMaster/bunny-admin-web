<script lang="ts" setup>
import { ref } from 'vue';
import { FormInstance } from 'element-plus';
import { rules } from '@/views/system/files/utils/columns';
import { FormProps } from '@/views/system/files/utils/types';
import { $t } from '@/plugins/i18n';

const props = withDefaults(defineProps<FormProps>(), {
	formInline: () => ({
		// 文件的名称
		filename: undefined,
		// 文件在服务器上的存储路径
		filepath: undefined,
		// 文件的MIME类型
		fileType: undefined,
		// 下载数量
		downloadCount: undefined,
	}),
});

const formRef = ref<FormInstance>();
const form = ref(props.formInline);

defineExpose({ formRef });
</script>

<template>
	<el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
		<el-form-item :label="$t('files_filename')" prop="filename">
			<el-input v-model="form.filename" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item :label="$t('files_filepath')" prop="filepath">
			<el-input v-model="form.filepath" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item :label="$t('files_fileType')" prop="fileType">
			<el-input v-model="form.fileType" autocomplete="off" type="text" />
		</el-form-item>
		<el-form-item :label="$t('files_downloadCount')" prop="downloadCount">
			<el-input v-model="form.downloadCount" autocomplete="off" type="text" />
		</el-form-item>
	</el-form>
</template>
