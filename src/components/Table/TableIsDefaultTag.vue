<script lang="ts" setup>
defineProps({
  status: {
    type: Boolean,
  },
});
</script>

<template>
  <el-tag v-show="status" effect="dark" size="large" type="success">是</el-tag>
  <el-tag v-show="!status" effect="dark" size="large" type="danger">否</el-tag>
</template>
