<script lang="ts" setup>
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import { PureTableBar } from '@/components/RePureTableBar';
import { selectUserinfo } from '@/components/Table/Userinfo/columns';
import { $t } from '@/plugins/i18n';
import { userI18nStore } from '@/store/i18n/i18n';
import {
  columns,
  deleteIds,
  downloadI18nSetting,
  onAdd,
  onDelete,
  onDeleteBatch,
  onSearch,
  onUpdate,
  updateI18nSetting,
} from '@/views/i18n/i18n-setting/utils';
import PureTable from '@pureadmin/table';
import { onMounted, ref } from 'vue';
import Delete from '~icons/ep/delete';
import Download from '~icons/ep/download';
import EditPen from '~icons/ep/edit-pen';
import Refresh from '~icons/ep/refresh';
import AddFill from '~icons/ri/add-circle-line';
import Upload from '~icons/ri/upload-line';

defineOptions({ name: 'I18n' });

const tableRef = ref();
const pageFormRef = ref();
const i18nStore = userI18nStore();

/** 重置表单 */
const resetForm = async (formEl: any) => {
  if (!formEl) return;
  formEl.resetFields();
  await onSearch();
};

/** 当前页改变时 */
const onCurrentPageChange = async (value: number) => {
  i18nStore.pagination.currentPage = value;
  await onSearch();
};

/** 当分页发生变化 */
const onPageSizeChange = async (value: number) => {
  i18nStore.pagination.pageSize = value;
  await onSearch();
};

/* 选择多行 */
const onSelectionChange = (rows: Array<any>) => {
  deleteIds.value = rows.map((row: any) => row.id);
};

onMounted(() => {
  onSearch();
});
</script>

<template>
  <div class="main">
    <el-form ref="pageFormRef" :inline="true" :model="i18nStore.form" class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto">
      <el-form-item :label="$t('i18n.keyName')" prop="keyName">
        <el-input v-model="i18nStore.form.keyName" :placeholder="`${$t('input')}${$t('i18n.keyName')}`" class="!w-[180px]" clearable />
      </el-form-item>
      <el-form-item :label="$t('i18n.translation')" prop="translation">
        <el-input v-model="i18nStore.form.translation" :placeholder="`${$t('input')}${$t('i18n.translation')}`" class="!w-[180px]" clearable />
      </el-form-item>
      <el-form-item :label="$t('i18n.typeName')" prop="typeName">
        <el-input v-model="i18nStore.form.typeName" :placeholder="`${$t('input')}${$t('i18n.typeName')}`" class="!w-[180px]" clearable />
      </el-form-item>
      <el-form-item>
        <!-- 表格頂部搜索 -->
        <el-button :icon="useRenderIcon('ri/search-line')" :loading="i18nStore.loading" type="primary" @click="onSearch">
          {{ $t('search') }}
        </el-button>
        <!-- 表格頂部重置 -->
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(pageFormRef)">
          {{ $t('buttons.reset') }}
        </el-button>
      </el-form-item>
    </el-form>

    <PureTableBar :columns="columns" :title="$t('multilingualManagement')" @fullscreen="tableRef.setAdaptive()" @refresh="onSearch">
      <template #buttons>
        <!-- 下载多语言配置 -->
        <el-dropdown class="mr-1" type="primary">
          <el-button :icon="useRenderIcon(Download)" plain type="primary">
            {{ $t('download_configuration') }}
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <!-- 到處為JSON -->
              <el-dropdown-item @click="downloadI18nSetting('json')">{{ $t('download_json') }}</el-dropdown-item>
              <!--導出爲Excel-->
              <el-dropdown-item @click="downloadI18nSetting('excel')">{{ $t('download_excel') }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <!-- 更新多语言配置 -->
        <el-dropdown class="mr-1" type="primary">
          <el-button :icon="useRenderIcon(Upload)" plain type="primary">{{ $t('file_import') }}</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="updateI18nSetting('json')">{{ $t('use_json_update') }}</el-dropdown-item>
              <el-dropdown-item @click="updateI18nSetting('excel')">{{ $t('use_excel_update') }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <!-- 添加多语言 -->
        <el-button :icon="useRenderIcon(AddFill)" plain type="success" @click="onAdd">
          {{ $t('addNew') }}
        </el-button>

        <!-- 批量删除按钮 -->
        <el-button :disabled="!(deleteIds.length > 0)" :icon="useRenderIcon(Delete)" plain type="danger" @click="onDeleteBatch">
          {{ $t('deleteBatches') }}
        </el-button>
      </template>

      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          ref="tableRef"
          :adaptiveConfig="{ offsetBottom: 96 }"
          :columns="dynamicColumns"
          :data="i18nStore.datalist"
          :header-cell-style="{
            background: 'var(--el-fill-color-light)',
            color: 'var(--el-text-color-primary)',
          }"
          :loading="i18nStore.loading"
          :pagination="i18nStore.pagination"
          :size="size"
          adaptive
          align-whole="center"
          border
          highlight-current-row
          row-key="id"
          showOverflowTooltip
          stripe
          table-layout="auto"
          @selection-change="onSelectionChange"
          @page-size-change="onPageSizeChange"
          @page-current-change="onCurrentPageChange"
        >
          <!-- 創建用戶名 -->
          <template #createUser="{ row }">
            <el-button v-show="row.createUser" link type="primary" @click="selectUserinfo(row.createUser)">
              {{ row.createUsername }}
            </el-button>
          </template>

          <!-- 更新用戶名 -->
          <template #updateUser="{ row }">
            <el-button v-show="row.updateUser" link type="primary" @click="selectUserinfo(row.updateUser)">
              {{ row.updateUsername }}
            </el-button>
          </template>

          <template #operation="{ row }">
            <!-- 修改 -->
            <el-button :icon="useRenderIcon(EditPen)" :size="size" class="reset-margin" link type="primary" @click="onUpdate(row)">
              {{ $t('modify') }}
            </el-button>

            <!-- 刪除確認 -->
            <el-popconfirm :title="`${$t('confirmDelete')} ${row.translation}`" @confirm="onDelete(row)">
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
