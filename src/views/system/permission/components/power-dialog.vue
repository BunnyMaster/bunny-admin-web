<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { FormInstance } from 'element-plus';
import { FormProps, powerCascadeProps, rules } from '@/views/system/permission/utils';
import { $t } from '@/plugins/i18n';
import { handleTree } from '@pureadmin/utils';
import { usePermissionStore } from '@/store/system/power';
import { RequestMethod } from '@/enums/baseConstant';

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    // 父级id
    parentId: undefined,
    // 权限编码
    powerCode: undefined,
    // 权限名称
    powerName: undefined,
    // 请求路径
    requestUrl: undefined,
    // 请求方法
    requestMethod: undefined,
  }),
});

const formRef = ref<FormInstance>();
const form = ref(props.formInline);
const powerStore = usePermissionStore();

onMounted(() => {
  powerStore.loadPermissionList();
});

defineExpose({ formRef });
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
    <el-form-item :label="$t('power_parentId')" prop="parentId">
      <el-cascader
        v-model="form.parentId"
        :options="handleTree(powerStore.allPowerList)"
        :props="powerCascadeProps"
        class="w-full"
        clearable
        filterable
        show-all-levels
      />
    </el-form-item>
    <el-form-item :label="$t('power_powerCode')" prop="powerCode">
      <el-input v-model="form.powerCode" :placeholder="$t('power_powerCode')" autocomplete="off" type="text" />
    </el-form-item>
    <el-form-item :label="$t('power_powerName')" prop="powerName">
      <el-input v-model="form.powerName" :placeholder="$t('power_powerName')" autocomplete="off" type="text" />
    </el-form-item>
    <el-form-item :label="$t('power_requestUrl')" prop="requestUrl">
      <el-input v-model="form.requestUrl" :placeholder="$t('inputRequestUrlTip')" autocomplete="off" type="text" />
    </el-form-item>
    <el-form-item :label="$t('requestMethod')" prop="requestMethod">
      <el-select v-model="form.requestMethod" :placeholder="$t('requestMethod')" autocomplete="off" clearable filterable>
        <el-option v-for="item in RequestMethod" :key="item" :label="item" :value="item" />
      </el-select>
    </el-form-item>
  </el-form>
</template>
