<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { auth, columns, deleteIds, onAdd, onDelete, onDeleteBatch, onSearch, onUpdate } from '@/views/system/dept/utils';
import PureTableBar from '@/components/TableBar/src/bar';
import AddFill from '@iconify-icons/ri/add-circle-line';
import PureTable from '@pureadmin/table';
import Delete from '@iconify-icons/ep/delete';
import EditPen from '@iconify-icons/ep/edit-pen';
import Refresh from '@iconify-icons/ep/refresh';
import { selectUserinfo } from '@/components/Table/Userinfo/columns';
import { $t } from '@/plugins/i18n';
import { useDeptStore } from '@/store/system/dept';
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import { handleTree } from '@/utils/tree';
import { FormInstance } from 'element-plus';
import { hasAuth } from '@/router/utils';
import ReAuth from '@/components/ReAuth/src/auth';

defineOptions({ name: 'DeptManger' });
const tableRef = ref();
const formRef = ref();
const deptStore = useDeptStore();
const datalist = computed(() => handleTree(deptStore.datalist));

/** 当前页改变时 */
const onCurrentPageChange = async (value: number) => {
  deptStore.pagination.currentPage = value;
  await onSearch();
};

/** 当分页发生变化 */
const onPageSizeChange = async (value: number) => {
  deptStore.pagination.pageSize = value;
  await onSearch();
};

/** 选择多行 */
const onSelectionChange = (rows: Array<any>) => {
  deleteIds.value = rows.map((row: any) => row.id);
};

/** 重置表单 */
const resetForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  await onSearch();
};

onMounted(() => {
  onSearch();
});
</script>

<template>
  <div class="main">
    <ReAuth :value="auth.query">
      <el-form ref="formRef" :inline="true" :model="deptStore.form" class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto">
        <el-form-item :label="$t('dept_deptName')" prop="deptName">
          <el-input v-model="deptStore.form.deptName" :placeholder="`${$t('input')}${$t('dept_deptName')}`" class="!w-[180px]" clearable />
        </el-form-item>
        <el-form-item :label="$t('dept_summary')" prop="summary">
          <el-input v-model="deptStore.form.summary" :placeholder="`${$t('input')}${$t('dept_summary')}`" class="!w-[180px]" clearable />
        </el-form-item>
        <el-form-item>
          <el-button :icon="useRenderIcon('ri:search-line')" :loading="deptStore.loading" type="primary" @click="onSearch">
            {{ $t('search') }}
          </el-button>
          <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">{{ $t('buttons.reset') }}</el-button>
        </el-form-item>
      </el-form>
    </ReAuth>

    <PureTableBar
      :columns="columns"
      :isExpandAll="true"
      :tableRef="tableRef?.getTableRef()"
      :title="$t('dept')"
      @fullscreen="tableRef.setAdaptive()"
      @refresh="onSearch"
    >
      <template #buttons>
        <el-button v-if="hasAuth(auth.add)" :icon="useRenderIcon(AddFill)" plain type="primary" @click="onAdd()">
          {{ $t('addNew') }}
        </el-button>

        <!-- 批量删除按钮 -->
        <el-button v-if="hasAuth(auth.delete)" :disabled="!(deleteIds.length > 0)" :icon="useRenderIcon(Delete)" plain type="danger" @click="onDeleteBatch">
          {{ $t('deleteBatches') }}
        </el-button>
      </template>

      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          ref="tableRef"
          :adaptiveConfig="{ offsetBottom: 96 }"
          :columns="dynamicColumns"
          :data="datalist"
          :header-cell-style="{ background: 'var(--el-fill-color-light)', color: 'var(--el-text-color-primary)' }"
          :loading="deptStore.loading"
          :pagination="deptStore.pagination"
          :size="size"
          adaptive
          align-whole="center"
          border
          default-expand-all
          highlight-current-row
          row-key="id"
          showOverflowTooltip
          table-layout="auto"
          @page-size-change="onPageSizeChange"
          @page-current-change="onCurrentPageChange"
          @selection-change="onSelectionChange"
        >
          <template #createUser="{ row }">
            <el-button v-show="row.createUser" link type="primary" @click="selectUserinfo(row.createUser)">
              {{ row.createUsername }}
            </el-button>
          </template>

          <template #updateUser="{ row }">
            <el-button v-show="row.updateUser" link type="primary" @click="selectUserinfo(row.updateUser)">
              {{ row.updateUsername }}
            </el-button>
          </template>

          <template #operation="{ row }">
            <el-button v-if="hasAuth(auth.update)" :icon="useRenderIcon(EditPen)" :size="size" class="reset-margin" link type="primary" @click="onUpdate(row)">
              {{ $t('modify') }}
            </el-button>
            <el-button v-if="hasAuth(auth.add)" :icon="useRenderIcon(AddFill)" :size="size" class="reset-margin" link type="primary" @click="onAdd(row.id)">
              {{ $t('addNew') }}
            </el-button>
            <el-popconfirm v-if="hasAuth(auth.delete)" :title="`${$t('delete')} ${row.deptName}?`" @confirm="onDelete(row)">
              <template #reference>
                <el-button :icon="useRenderIcon(Delete)" :size="size" class="reset-margin" link type="primary">
                  {{ $t('delete') }}
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>
