<script lang="ts" setup>
import { useColumns } from "./columns";
import { useRenderIcon } from "@/components/CommonIcon/src/hooks";

const { loading, columns, dataList, pagination, Empty, onCurrentChange } =
  useColumns();
</script>

<template>
  <pure-table
    :columns="columns"
    :data="
      dataList.slice(
        (pagination.currentPage - 1) * pagination.pageSize,
        pagination.currentPage * pagination.pageSize
      )
    "
    :loading="loading"
    :loading-config="{ background: 'transparent' }"
    :pagination="pagination"
    alignWhole="center"
    row-key="id"
    showOverflowTooltip
    @page-current-change="onCurrentChange"
  >
    <template #empty>
      <el-empty :image-size="60" description="暂无数据">
        <template #image>
          <Empty />
        </template>
      </el-empty>
    </template>
    <template #operation="{ row }">
      <el-button
        :icon="useRenderIcon('ri:search-line')"
        :title="`查看序号为${row.id}的详情`"
        circle
        plain
        size="small"
      />
    </template>
  </pure-table>
</template>

<style lang="scss">
.pure-table-filter {
  .el-table-filter__list {
    min-width: 80px;
    padding: 0;

    li {
      line-height: 28px;
    }
  }
}
</style>

<style lang="scss" scoped>
:deep(.el-table) {
  --el-table-border: none;
  --el-table-border-color: transparent;

  .el-empty__description {
    margin: 0;
  }

  .el-scrollbar__bar {
    display: none;
  }
}
</style>
