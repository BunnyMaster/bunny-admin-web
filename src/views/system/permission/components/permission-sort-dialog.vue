<script lang="ts" setup>
import { onMounted, ref, toRaw } from 'vue';
import type { TreeInstance } from 'element-plus';
import { FormInstance } from 'element-plus';
import { usePermissionStore } from '@/store/system/power';
import { TreeNode } from 'element-plus/es/components/tree-v2/src/types';
import { handleTree } from '@pureadmin/utils';

interface Tree {
  [key: string]: any;
}

interface Props {
  form: {
    list: any;
  };
}

const props = withDefaults(defineProps<Props>(), {
  form: () => ({
    list: [],
  }),
});

const formRef = ref<FormInstance>();
const treeRef = ref<TreeInstance>();
const powerStore = usePermissionStore();
const form = ref(props.form);
// 所有的权限列表
const powerList = ref([]);
// 加载
const isLoading = ref(false);

/* 加载系统接口列表 */
const onSearch = async () => {
  isLoading.value = true;
  await powerStore.loadPermissionList();
  powerList.value = handleTree(powerStore.allPowerList);
  isLoading.value = false;
};

/* 搜索名称 */
const filterMethod = (value: string, data: Tree) => {
  if (!value) return true;
  return data.summary.includes(value);
};

/* 节点拖拽完成 */
const onNodeDragEnd = (source: TreeNode, target: TreeNode, event: Event) => {
  const current = source.data;
  const parent = target.parent.data;

  // 如果为父级找不到parentId
  if (parent.id) {
    current.parentId = parent.id;
  } else {
    current.parentId = '0';
  }
  const data = toRaw(current);
  form.value.list.push(data);

  // 为数组去重，以最后添加为准
  const map = new Map();
  const array = form.value.list;
  for (const item of array) {
    map.set(item['id'], item);
  }
  form.value.list = Array.from(map.values());
};

onMounted(() => {
  onSearch();
});
defineExpose({ formRef });
</script>

<template>
  <el-tree
    ref="treeRef"
    v-loading="isLoading"
    :data="powerList"
    :expand-on-click-node="true"
    :filter-node-method="filterMethod"
    :props="{ label: 'powerName' }"
    class="my-2 py-1 h-[530px] overflow-y-auto"
    draggable
    highlight-current
    node-key="path"
    @nodeDragEnd="onNodeDragEnd"
  >
    <template #default="{ node, data }">
      <el-tooltip :content="data.powerCode">
        <span>{{ node.label }}</span>
      </el-tooltip>
      <div class="custom-tree-node">
        <el-text type="primary">{{ data.requestUrl }}</el-text>
        <el-text type="danger">{{ data.requestMethod }}</el-text>
      </div>
    </template>
    <template #empty>
      <ElEmpty />
    </template>
  </el-tree>
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
