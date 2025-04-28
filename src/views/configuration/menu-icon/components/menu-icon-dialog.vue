<script lang="ts" setup>
import { ref } from 'vue';
import { FormInstance } from 'element-plus';
import { FormProps, rules } from '@/views/configuration/menu-icon/utils';
import { $t } from '@/plugins/i18n';
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import MenuIconSelectIconName from '@/views/configuration/menu-icon/components/menu-icon-select-icon-name.vue';

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    // icon类名
    iconCode: undefined,
    // icon 名称
    iconName: undefined,
  }),
});

const formRef = ref<FormInstance>();
const form = ref(props.formInline);

defineExpose({ formRef });
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
    <el-form-item :label="$t('menuIcon_iconCode')" prop="iconCode">
      <el-input v-model="form.iconCode" autocomplete="off" type="text" />
    </el-form-item>

    <el-form-item :label="$t('menuIcon_iconName')" prop="iconName">
      <MenuIconSelectIconName :formInline="form" />
    </el-form-item>

    <el-form-item v-show="form.iconCode" :label="$t('menuIcon_preview')">
      <div class="flex justify-center">
        <component :is="useRenderIcon(form.iconCode)" class="flex justify-center" style="font-size: 30px" />
      </div>
    </el-form-item>

    <!-- icon 官网 -->
    <el-form-item :label="$t('systemMenuIcon.officialWebsite')">
      <el-link :title="$t('systemMenuIcon.officialWebsite')" :underline="false" href="https://icon-sets.iconify.design/" target="_blank" type="primary">
        {{ $t('systemMenuIcon.officialWebsite') }}
      </el-link>
    </el-form-item>
  </el-form>
</template>
