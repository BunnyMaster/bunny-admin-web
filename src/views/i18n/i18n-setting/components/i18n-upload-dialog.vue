<script lang="ts" setup>
import { ElSelect, FormInstance, type FormRules, genFileId, type UploadProps, type UploadRawFile } from 'element-plus';
import { $t } from '@/plugins/i18n';
import { reactive, ref } from 'vue';
import { userI18nTypeStore } from '@/store/i18n/i18nType';

import { UploadFilled } from '@element-plus/icons-vue';

interface Props {
  form: {
    type: string;
    file: any;
    fileType: string;
    isAppend: boolean;
  };
}

const rules = reactive<FormRules>({
  type: [
    {
      required: true,
      message: `${$t('select')}${$t('i18n_type')}`,
      trigger: 'blur',
    },
  ],
  file: [
    {
      required: true,
      message: `${$t('select')}${$t('files')}`,
      trigger: 'blur',
    },
  ],
});

const props = withDefaults(defineProps<Props>(), {
  form: () => ({
    type: '',
    file: undefined,
    fileType: '',
    isAppend: true,
  }),
});

const formRef = ref<FormInstance>();
const form = ref(props.form);
const i18nTypeStore = userI18nTypeStore();

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
    <el-form-item :label="$t('i18n_type')" prop="type">
      <el-select v-model="form.type" :placeholder="$t('select') + $t('i18n.typeName')" filterable>
        <el-option v-for="(item, index) in i18nTypeStore.datalist" :key="index" :label="item.typeName" :value="item.typeName" />
      </el-select>
    </el-form-item>

    <el-form-item :label="$t('isAppend')" prop="isAppend">
      <el-switch v-model="form.isAppend" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
    </el-form-item>

    <el-form-item :label="$t('files')" prop="file">
      <el-upload ref="uploadRef" v-model:file-list="form.file" :autoUpload="false" :limit="1" :on-exceed="handleExceed" class="w-full mt-2" drag>
        <el-icon class="el-icon--upload">
          <UploadFilled />
        </el-icon>
        <div class="el-upload__text">
          <em>{{ `${$t('drop_file_here')} / ${$t('click_to_upload')}` }}</em>
        </div>
      </el-upload>
    </el-form-item>

    <!-- 更新提示 -->
    <el-text type="danger">{{ $t('update_i18n_tip') }}</el-text>
  </el-form>
</template>
