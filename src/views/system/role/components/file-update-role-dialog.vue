<script lang="ts" setup>
import { FormInstance, type FormRules, genFileId, type UploadProps, type UploadRawFile } from 'element-plus';
import { $t } from '@/plugins/i18n';
import { reactive, ref } from 'vue';

import { UploadFilled } from '@element-plus/icons-vue';

interface Props {
  form: {
    file: any;
  };
}

const rules = reactive<FormRules>({
  file: [{ required: true, message: `${$t('select')}${$t('files')}`, trigger: 'blur' }],
});

const props = withDefaults(defineProps<Props>(), {
  form: () => ({
    file: undefined,
  }),
});

const formRef = ref<FormInstance>();
const form = ref(props.form);
const uploadRef = ref();

const handleExceed: UploadProps['onExceed'] = (files) => {
  uploadRef.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  uploadRef.value!.handleStart(file);
};

defineExpose({ formRef });
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="rules" isDefault-icon>
    <el-form-item :label="$t('files')" prop="file">
      <el-upload
        ref="uploadRef"
        v-model:file-list="form.file"
        :autoUpload="false"
        :limit="1"
        :on-exceed="handleExceed"
        class="w-full mt-2"
        drag
      >
        <el-icon class="el-icon--upload">
          <UploadFilled />
        </el-icon>
        <div class="el-upload__text">
          <em>{{ `${$t('drop_file_here')} / ${$t('click_to_upload')}` }}</em>
        </div>
      </el-upload>
    </el-form-item>

    <!-- 更新提示 -->
    <el-text type="danger">{{ $t('update_tip') }}</el-text>
  </el-form>
</template>
