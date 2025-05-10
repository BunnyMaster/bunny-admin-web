<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import type { TreeInstance } from 'element-plus';
import { FormInstance } from 'element-plus';
import { FormProps, powerCascadeProps, rules } from '@/views/system/permission/utils';
import { $t } from '@/plugins/i18n';
import { handleTree } from '@pureadmin/utils';
import { usePermissionStore } from '@/store/system/power';
import { RequestMethod } from '@/enums/baseConstant';
import { storeToRefs } from 'pinia';

interface Tree {
  [key: string]: any;
}

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
const treeRef = ref<TreeInstance>();
const form = ref(props.formInline);
const powerStore = usePermissionStore();
const { allPowerList, systemApiInfoList } = storeToRefs(powerStore);

// 过滤搜索
const queryText = ref('');

/* 搜索名称 */
const filterMethod = (value: string, data: Tree) => {
  if (!value) return true;
  return data.summary.includes(value);
};
/* 输入时搜索 */
const onQueryChange = (val: string) => {
  treeRef.value!.filter(val);
};

const onNodeClick = (node) => {
  form.value.powerName = node.summary;
  form.value.requestMethod = node.httpMethod;
  form.value.requestUrl = node.path;
  if (node.powerCodes && node.powerCodes.length > 0) {
    form.value.powerCode = node.powerCodes[0];
  }
};

onMounted(() => {
  powerStore.loadPermissionList();
  powerStore.loadSystemApiInfoList();
});
defineExpose({ formRef });
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
    <el-input v-model="queryText" clearable placeholder="搜索名称" @input="onQueryChange" />
    <el-tree
      ref="treeRef"
      :data="systemApiInfoList"
      :expand-on-click-node="true"
      :filter-node-method="filterMethod"
      :props="{ label: 'summary' }"
      accordion
      class="my-2 py-1 h-[350px] overflow-y-auto"
      highlight-current
      node-key="path"
      @node-click="onNodeClick"
    >
      <template #default="{ node, data }">
        <el-tooltip :content="data.description">
          <span>{{ node.label }}</span>
        </el-tooltip>
        <div class="custom-tree-node">
          <el-text type="primary">{{ data.path }}</el-text>
          <el-text type="danger">{{ data.httpMethod }}</el-text>
        </div>
      </template>
      <template #empty>
        <ElEmpty />
      </template>
    </el-tree>
    <el-form-item :label="$t('power_parentId')" prop="parentId">
      <el-cascader
        v-model="form.parentId"
        :options="handleTree(allPowerList)"
        :props="powerCascadeProps"
        class="w-full"
        clearable
        filterable
        show-all-levels
        style="max-height: 200px"
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
<style scoped>
.custom-tree-node {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  font-size: 14px;
}
</style>
