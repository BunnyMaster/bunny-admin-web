<script lang="ts" setup>
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import { PureTableBar } from '@/components/RePureTableBar';
import { selectUserinfo } from '@/components/Table/Userinfo/columns';
import { $t } from '@/plugins/i18n';
import { useFilesStore } from '@/store/system/files';
import { columns, onAdd, onDelete, onDeleteBatch, onDownload, onDownloadBatch, onSearch, onUpdate, selectRows } from '@/views/system/files/utils';
import PureTable from '@pureadmin/table';
import { FormInstance } from 'element-plus';
import { onMounted, ref } from 'vue';
import Delete from '~icons/ep/delete';
import Download from '~icons/ep/download';
import EditPen from '~icons/ep/edit-pen';
import Refresh from '~icons/ep/refresh';
import AddFill from '~icons/ri/add-circle-line';

defineOptions({ name: 'FileManger' });

const tableRef = ref();
const formRef = ref();
const filesStore = useFilesStore();

/** 当前页改变时 */
const onCurrentPageChange = async (value: number) => {
  filesStore.pagination.currentPage = value;
  await onSearch();
};

/** 当分页发生变化 */
const onPageSizeChange = async (value: number) => {
  filesStore.pagination.pageSize = value;
  await onSearch();
};

/** 重置表单 */
const resetForm = async (formEl: FormInstance) => {
  if (!formEl) return;
  formEl.resetFields();
  await onSearch();
};

/** 选择多行 */
const onSelectionChange = (rows: Array<any>) => {
  selectRows.value = rows;
};

onMounted(() => {
  onSearch();
});
</script>

<template>
  <div class="main">
    <el-form ref="formRef" :inline="true" :model="filesStore.form" class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto">
      <!--文件的名称-->
      <el-form-item :label="$t('files_filename')" prop="filename">
        <el-input v-model="filesStore.form.filename" :placeholder="`${$t('input')}${$t('files_filename')}`" class="!w-[180px]" clearable />
      </el-form-item>
      <!--文件在服务器上的存储路径-->
      <el-form-item :label="$t('files_filepath')" prop="filepath">
        <el-input v-model="filesStore.form.filepath" :placeholder="`${$t('input')}${$t('files_filepath')}`" class="!w-[180px]" clearable />
      </el-form-item>
      <!--文件的MIME类型-->
      <el-form-item :label="$t('files_fileType')" prop="contentType">
        <el-input v-model="filesStore.form.contentType" :placeholder="`${$t('input')}${$t('files_fileType')}`" class="!w-[180px]" clearable />
      </el-form-item>
      <!--扩展名-->
      <el-form-item :label="$t('ext')" prop="ext">
        <el-input v-model="filesStore.form.ext" :placeholder="`${$t('input')}${$t('ext')}`" class="!w-[180px]" clearable />
      </el-form-item>
      <!--平台-->
      <el-form-item :label="$t('platform')" prop="platform">
        <el-input v-model="filesStore.form.platform" :placeholder="`${$t('input')}${$t('platform')}`" class="!w-[180px]" clearable />
      </el-form-item>
      <!--下载量-->
      <el-form-item :label="$t('files_downloadCount')" prop="downloadCount">
        <el-input
          v-model="filesStore.form.downloadCount"
          :placeholder="`${$t('input')}${$t('files_downloadCount')}`"
          class="!w-[180px]"
          clearable
          min="0"
          type="number"
        />
      </el-form-item>

      <el-form-item>
        <el-button :icon="useRenderIcon('ri/search-line')" :loading="filesStore.loading" type="primary" @click="onSearch">
          {{ $t('search') }}
        </el-button>
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">{{ $t('buttons.reset') }}</el-button>
      </el-form-item>
    </el-form>

    <PureTableBar :columns="columns" :title="$t('system_file')" @fullscreen="tableRef.setAdaptive()" @refresh="onSearch">
      <template #buttons>
        <!-- 批量下载 -->
        <el-button :disabled="!(selectRows.length > 0)" :icon="useRenderIcon(Download)" plain type="primary" @click="onDownloadBatch">
          {{ $t('download_batch') }}
        </el-button>

        <!-- 新增 -->
        <el-button :icon="useRenderIcon(AddFill)" plain type="success" @click="onAdd">
          {{ $t('addNew') }}
        </el-button>

        <!-- 批量删除按钮 -->
        <el-button :disabled="!(selectRows.length > 0)" :icon="useRenderIcon(Delete)" plain type="danger" @click="onDeleteBatch">
          {{ $t('deleteBatches') }}
        </el-button>
      </template>

      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          ref="tableRef"
          :adaptiveConfig="{ offsetBottom: 96 }"
          :columns="dynamicColumns"
          :data="filesStore.datalist"
          :header-cell-style="{ background: 'var(--el-fill-color-light)', color: 'var(--el-text-color-primary)' }"
          :loading="filesStore.loading"
          :pagination="filesStore.pagination"
          :size="size"
          adaptive
          align-whole="center"
          border
          highlight-current-row
          row-key="id"
          showOverflowTooltip
          table-layout="auto"
          @page-size-change="onPageSizeChange"
          @selection-change="onSelectionChange"
          @page-current-change="onCurrentPageChange"
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
            <el-button :icon="useRenderIcon(EditPen)" :size="size" class="reset-margin" link type="primary" @click="onUpdate(row)">
              {{ $t('modify') }}
            </el-button>
            <el-button :icon="useRenderIcon(EditPen)" :size="size" class="reset-margin" link type="primary" @click="onDownload(row)">
              {{ $t('download') }}
            </el-button>
            <el-popconfirm :title="`${$t('delete')} ${row.filename}?`" @confirm="onDelete(row)">
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
