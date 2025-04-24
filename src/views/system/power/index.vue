<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import {
  auth,
  columns,
  onAdd,
  onDelete,
  onDeleteBatch,
  onSearch,
  onUpdate,
  onUpdateBatchParent,
  powerIds,
} from '@/views/system/power/utils';
import PureTableBar from '@/components/TableBar/src/bar';
import AddFill from '@iconify-icons/ri/add-circle-line';
import PureTable from '@pureadmin/table';
import Delete from '@iconify-icons/ep/delete';
import EditPen from '@iconify-icons/ep/edit-pen';
import Refresh from '@iconify-icons/ep/refresh';
import { selectUserinfo } from '@/components/Table/Userinfo/columns';
import { $t } from '@/plugins/i18n';
import { usePowerStore } from '@/store/system/power';
import { useRenderIcon } from '@/components/CommonIcon/src/hooks';
import { handleTree } from '@pureadmin/utils';
import { FormInstance } from 'element-plus';
import { hasAuth } from '@/router/utils';

const tableRef = ref();
const formRef = ref();
const powerStore = usePowerStore();
const datalist = computed(() => handleTree(powerStore.datalist));

/**
 * * 当前页改变时
 */
const onCurrentPageChange = async (value: number) => {
  powerStore.pagination.currentPage = value;
  await onSearch();
};

/**
 * * 当分页发生变化
 * @param value
 */
const onPageSizeChange = async (value: number) => {
  powerStore.pagination.pageSize = value;
  await onSearch();
};

/**
 * * 选择多行
 * @param rows
 */
const onSelectionChange = (rows: Array<any>) => {
  powerIds.value = rows.map((row: any) => row.id);
};

/**
 * 重置表单
 * @param formEl
 */
const resetForm = async (formEl: FormInstance) => {
  if (!formEl) return;
  formEl.resetFields();
  await onSearch();
};
computed(() => ['!h-[20px]', 'reset-margin', '!text-gray-500', 'dark:!text-white', 'dark:hover:!text-primary']);
onMounted(() => {
  onSearch();
});
</script>

<template>
  <div class="main">
    <Auth :value="auth.search">
      <el-form
        ref="formRef"
        :inline="true"
        :model="powerStore.form"
        class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto"
      >
        <el-form-item :label="$t('power_powerCode')" prop="powerCode">
          <el-input
            v-model="powerStore.form.powerCode"
            :placeholder="`${$t('input')}${$t('power_powerCode')}`"
            class="!w-[180px]"
            clearable
          />
        </el-form-item>
        <el-form-item :label="$t('power_powerName')" prop="powerName">
          <el-input
            v-model="powerStore.form.powerName"
            :placeholder="`${$t('input')}${$t('power_powerName')}`"
            class="!w-[180px]"
            clearable
          />
        </el-form-item>
        <el-form-item :label="$t('power_requestUrl')" prop="requestUrl">
          <el-input
            v-model="powerStore.form.requestUrl"
            :placeholder="`${$t('input')}${$t('power_requestUrl')}`"
            class="!w-[180px]"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button
            :icon="useRenderIcon('ri:search-line')"
            :loading="powerStore.loading"
            type="primary"
            @click="onSearch"
          >
            {{ $t('search') }}
          </el-button>
          <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">{{ $t('buttons.reset') }}</el-button>
        </el-form-item>
      </el-form>
    </Auth>

    <PureTableBar
      :columns="columns"
      :isExpandAll="true"
      :tableRef="tableRef?.getTableRef()"
      :title="$t('power')"
      @fullscreen="tableRef.setAdaptive()"
      @refresh="onSearch"
    >
      <template #buttons>
        <!-- 添加权限按钮 -->
        <el-button v-if="hasAuth(auth.add)" :icon="useRenderIcon(AddFill)" bg text type="primary" @click="onAdd()">
          {{ $t('addNew') }}
        </el-button>

        <!-- 批量更新父级id -->
        <el-button
          v-if="hasAuth(auth.updateBatchByPowerWithParentId)"
          :disabled="!(powerIds.length > 0)"
          :icon="useRenderIcon(EditPen)"
          bg
          text
          type="primary"
          @click="onUpdateBatchParent"
        >
          {{ $t('update_batches_parent') }}
        </el-button>

        <!-- 批量删除按钮 -->
        <el-button
          v-if="hasAuth(auth.deleted)"
          :disabled="!(powerIds.length > 0)"
          :icon="useRenderIcon(Delete)"
          bg
          text
          type="danger"
          @click="onDeleteBatch"
        >
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
          :loading="powerStore.loading"
          :pagination="powerStore.pagination"
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
            <!-- 修改 -->
            <el-button
              v-if="hasAuth(auth.update)"
              :icon="useRenderIcon(EditPen)"
              :size="size"
              class="reset-margin"
              link
              type="primary"
              @click="onUpdate(row)"
            >
              {{ $t('modify') }}
            </el-button>
            <!-- 添加 -->
            <el-button
              v-if="hasAuth(auth.add)"
              :icon="useRenderIcon(AddFill)"
              :size="size"
              class="reset-margin"
              link
              type="primary"
              @click="onAdd(row.id)"
            >
              {{ $t('addNew') }}
            </el-button>
            <!-- 删除 -->
            <el-popconfirm
              v-if="hasAuth(auth.deleted)"
              :title="`${$t('delete')}${row.powerName}?`"
              @confirm="onDelete(row)"
            >
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
