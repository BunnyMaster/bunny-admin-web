<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { FormInstance } from 'element-plus';
import { FormProps, rules } from '@/views/i18n/i18n-setting/utils';
import { userI18nTypeStore } from '@/store/i18n/i18nType';
import { $t } from '@/plugins/i18n';

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    keyName: '',
    translation: '',
    typeName: '',
  }),
});

const ruleFormRef = ref<FormInstance>();
const form = ref(props.formInline);
const i18nTypeStore = userI18nTypeStore();

onMounted(() => {
  i18nTypeStore.loadI18nTypeList();
});
defineExpose({ ruleFormRef });
</script>

<template>
  <el-form ref="ruleFormRef" :model="form" :rules="rules" isDefault-icon label-position="left" label-width="135px">
    <el-form-item :label="$t('i18n.typeName')" prop="typeName">
      <el-select v-model="form.typeName" :placeholder="$t('select') + $t('i18n.typeName')" filterable>
        <el-option
          v-for="item in i18nTypeStore.datalist"
          :key="item.id"
          :label="item.typeName"
          :value="item.typeName"
        />
      </el-select>
    </el-form-item>

    <el-form-item :label="$t('i18n.typeName')" prop="keyName">
      <el-input v-model="form.keyName" :placeholder="$t('select') + $t('i18n.keyName')" clearable />
    </el-form-item>

    <el-form-item :label="$t('i18n.translation')" prop="translation">
      <el-input v-model="form.translation" :placeholder="$t('select') + $t('i18n.translation')" clearable />
    </el-form-item>
  </el-form>
</template>
