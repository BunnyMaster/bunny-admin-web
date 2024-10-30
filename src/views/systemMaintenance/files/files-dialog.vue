<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { FormInstance, genFileId, UploadProps, UploadRawFile } from 'element-plus';
import { addRules, uploadRules } from '@/views/systemMaintenance/files/utils/columns';
import { FormProps } from '@/views/systemMaintenance/files/utils/types';
import { $t } from '@/plugins/i18n';
import { useFilesStore } from '@/store/monitor/files';
import { UploadFilled } from '@element-plus/icons-vue';

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
		// 文件列表
		files: [],
		// 是否是上传
		isUpload: false,
	}),
});

const formRef = ref<FormInstance>();
const upload = ref();
const form = ref(props.formInline);
const filesStore = useFilesStore();

/**
 * * 修改时替换之前文件
 * @param files
 */
const handleExceed: UploadProps['onExceed'] = files => {
	upload.value!.clearFiles();
	const file = files[0] as UploadRawFile;
	file.uid = genFileId();
	upload.value!.handleStart(file);
};

onMounted(() => {
	filesStore.getAllMediaTypes();
	filesStore.getAllFilesStoragePath();
});

defineExpose({ formRef });
</script>

<template>
	<el-form ref="formRef" :model="form" :rules="form.isUpload ? uploadRules : addRules" label-width="auto">
		<!-- 文件名称---上传显示 -->
		<el-form-item v-show="form.isUpload" :label="$t('files_filename')" prop="filename">
			<el-input v-model="form.filename" autocomplete="off" type="text" />
		</el-form-item>

		<!-- 文件路径---上传显示文本框 -->
		<el-form-item :label="$t('files_filepath')" prop="filepath">
			<el-input v-if="form.isUpload" v-model="form.filepath" autocomplete="off" disabled type="text" />

			<el-select v-else v-model="form.filepath" :placeholder="$t('select') + $t('files_filepath')" clearable filterable>
				<el-option v-for="(item, index) in filesStore.allFilesStoragePath" :key="index" :label="item" :navigationBar="false" :value="item" />
			</el-select>
		</el-form-item>

		<!-- 文件类型---上传显示 -->
		<el-form-item v-show="form.isUpload" :label="$t('files_fileType')" prop="fileType">
			<el-select v-model="form.fileType" :placeholder="$t('select') + $t('files_fileType')" clearable filterable>
				<el-option v-for="(item, index) in filesStore.allMediaTypes" :key="index" :label="item" :navigationBar="false" :value="item" />
			</el-select>
		</el-form-item>

		<el-form-item :label="$t('files_downloadCount')" prop="downloadCount">
			<el-input v-model="form.downloadCount" :min="0" autocomplete="off" type="number" />
		</el-form-item>

		<!-- 文件列表---上传不显示 -->
		<el-form-item :label="$t('files')" prop="files">
			<el-upload v-if="form.isUpload" ref="upload" v-model:file-list="form.files" :auto-upload="false" :limit="1" :on-exceed="handleExceed" class="w-full" drag>
				<el-icon class="el-icon--upload">
					<UploadFilled />
				</el-icon>
				<div class="el-upload__text">
					{{ $t('drop_file_here') }}/<em>{{ $t('click_to_upload') }}</em>
				</div>
			</el-upload>

			<el-upload v-else v-model:file-list="form.files" :auto-upload="false" class="w-full" drag multiple>
				<el-icon class="el-icon--upload">
					<UploadFilled />
				</el-icon>
				<div class="el-upload__text">
					{{ $t('drop_file_here') }}/<em>{{ $t('click_to_upload') }}</em>
				</div>
			</el-upload>
		</el-form-item>
	</el-form>
</template>
