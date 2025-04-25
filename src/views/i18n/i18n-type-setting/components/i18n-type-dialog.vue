<script lang="ts" setup>
import { ref } from 'vue';
import { FormInstance } from 'element-plus';
import { FormProps, rules } from '@/views/i18n/i18n-type-setting/utils';
import { frameSureOptions } from '@/enums';
import Segmented from '@/components/ReSegmented';
import { $t } from '@/plugins/i18n';

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    typeName: '',
    summary: '',
    isDefault: true,
  }),
});

const formRef = ref<FormInstance>();
const form = ref(props.formInline);

defineExpose({ formRef });
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
    <el-form-item :label="$t('i18n_typeName')" prop="typeName">
      <el-input
        v-model="form.typeName"
        :placeholder="$t('select') + $t('i18n_typeName')"
        autocomplete="off"
        type="text"
      />
    </el-form-item>
    <el-form-item :label="$t('i18n_summary')" prop="summary">
      <el-input
        v-model="form.summary"
        :placeholder="$t('select') + $t('i18n_summary')"
        autocomplete="off"
        type="text"
      />
    </el-form-item>
    <el-form-item :label="$t('isDefault')" prop="isDefault">
      <Segmented
        :modelValue="form.isDefault ? 0 : 1"
        :options="frameSureOptions"
        @change="({ option: { value } }) => (form.isDefault = value)"
      />
    </el-form-item>
  </el-form>
</template>
