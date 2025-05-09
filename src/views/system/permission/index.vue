<script lang="ts" setup>
import { addDialog } from '@/components/ReDialog/index';
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import { PureTableBar } from '@/components/RePureTableBar';
import { selectUserinfo } from '@/components/Table/Userinfo/columns';
import { RequestMethod } from '@/enums/baseConstant';
import { $t } from '@/plugins/i18n';
import { usePermissionStore } from '@/store/system/power';
import { columns, onAdd, onDelete, onDeleteBatch, onSearch, onUpdate, onUpdateBatchParent, powerIds } from '@/views/system/permission/utils';
import FileUploadDialog from '@/views/system/role/components/file-upload-dialog.vue';
import PureTable from '@pureadmin/table';
import { handleTree } from '@pureadmin/utils';
import { FormInstance } from 'element-plus';
import { computed, h, onMounted, ref } from 'vue';
import Delete from '~icons/ep/delete';
import Download from '~icons/ep/download';
import EditPen from '~icons/ep/edit-pen';
import Refresh from '~icons/ep/refresh';
import AddFill from '~icons/ri/add-circle-line';
import Upload from '~icons/ri/upload-line';
import More from '~icons/ep/more-filled';
import PermissionSortDialog from '@/views/system/permission/components/permission-sort-dialog.vue';

defineOptions({ name: 'PermissionManger' });

const tableRef = ref();
const formRef = ref();
const powerStore = usePermissionStore();
const datalist = computed(() => handleTree(powerStore.datalist));

computed(() => ['!h-[20px]', 'reset-margin', '!text-gray-500', 'dark:!text-white', 'dark:hover:!text-primary']);

/* 当前页改变时 */
const onCurrentPageChange = async (value: number) => {
  powerStore.pagination.currentPage = value;
  await onSearch();
};

/* 当分页发生变化 */
const onPageSizeChange = async (value: number) => {
  powerStore.pagination.pageSize = value;
  await onSearch();
};

/* 选择多行 */
const onSelectionChange = (rows: Array<any>) => {
  powerIds.value = rows.map((row: any) => row.id);
};

/* 重置表单 */
const resetForm = async (formEl: FormInstance) => {
  if (!formEl) return;
  formEl.resetFields();
  await onSearch();
};

/* 导出权限 */
const downloadPermission = (type: string) => {
  powerStore.downloadPermissionByFile({ type });
};

/* 导入权限 */
const uploadPermission = async (type: string) => {
  addDialog({
    title: `${$t('modify')}${$t('power')}`,
    props: { form: { file: undefined } },
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(FileUploadDialog, { ref: formRef, form: { file: undefined } }),
    beforeSure: (done, { options }) => {
      const form = options.props.form;
      formRef.value.formRef.validate(async (valid: any) => {
        if (!valid) return;
        // 更新文件 data
        const data = { file: form.file[0].raw, type };

        const result = await powerStore.uploadPermissionByFile(data);
        if (!result) return;
        done();
        await onSearch();
      });
    },
  });
};

/* 更新排序 */
const onUpdateSort = () => {
  addDialog({
    title: `${$t('modify')}权限排序`,
    props: { form: { list: [] } },
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(PermissionSortDialog, { form: { list: [] } }),
    beforeSure: async (done, { options }) => {
      const form = options.props.form;
      await powerStore.updatePermissionBatch(form.list);
      done();
      await onSearch();
    },
  });
};

onMounted(() => {
  onSearch();
});
</script>

<template>
  <div class="main">
    <el-form ref="formRef" :inline="true" :model="powerStore.form" class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto">
      <el-form-item :label="$t('power_powerCode')" prop="powerCode">
        <el-input v-model="powerStore.form.powerCode" :placeholder="`${$t('input')}${$t('power_powerCode')}`" class="!w-[180px]" clearable />
      </el-form-item>
      <el-form-item :label="$t('power_powerName')" prop="powerName">
        <el-input v-model="powerStore.form.powerName" :placeholder="`${$t('input')}${$t('power_powerName')}`" class="!w-[180px]" clearable />
      </el-form-item>
      <el-form-item :label="$t('power_requestUrl')" prop="requestUrl">
        <el-input v-model="powerStore.form.requestUrl" :placeholder="`${$t('input')}${$t('power_requestUrl')}`" class="!w-[180px]" clearable />
      </el-form-item>
      <el-form-item :label="$t('requestMethod')" prop="requestMethod">
        <el-select v-model="powerStore.form.requestMethod" :placeholder="$t('requestMethod')" autocomplete="off" class="!w-[180px]" clearable filterable>
          <el-option v-for="item in RequestMethod" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button :icon="useRenderIcon('ri/search-line')" :loading="powerStore.loading" type="primary" @click="onSearch">
          {{ $t('search') }}
        </el-button>
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">{{ $t('buttons.reset') }}</el-button>
      </el-form-item>
    </el-form>

    <PureTableBar
      :columns="columns"
      :isExpandAll="true"
      :tableRef="tableRef?.getTableRef()"
      :title="$t('power')"
      @fullscreen="tableRef.setAdaptive()"
      @refresh="onSearch"
    >
      <template #buttons>
        <!-- 下载配置 -->
        <el-dropdown class="mr-1" type="primary">
          <el-button :icon="useRenderIcon(Download)" plain type="primary">
            {{ $t('download_configuration') }}
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="downloadPermission('json')">{{ $t('download_json') }}</el-dropdown-item>
              <el-dropdown-item @click="downloadPermission('excel')">{{ $t('download_excel') }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <!-- 更新配置 -->
        <el-dropdown class="mr-1" type="primary">
          <el-button :icon="useRenderIcon(Upload)" plain type="primary">{{ $t('file_import') }}</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="uploadPermission('json')">{{ $t('use_json_update') }}</el-dropdown-item>
              <el-dropdown-item @click="uploadPermission('excel')">{{ $t('use_excel_update') }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <!-- 添加权限按钮 -->
        <el-button :icon="useRenderIcon(AddFill)" plain type="success" @click="onAdd()">
          {{ $t('addNew') }}
        </el-button>

        <el-dropdown class="ml-1" type="primary">
          <el-button :icon="useRenderIcon(More)" plain type="primary">{{ $t('more_actions') }}</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <!-- 批量更新父级id -->
              <el-dropdown-item :icon="useRenderIcon(EditPen)" @click="onUpdateSort">拖拽排序</el-dropdown-item>
              <!-- 批量更新父级id -->
              <el-dropdown-item :disabled="!(powerIds.length > 0)" :icon="useRenderIcon(EditPen)" @click="onUpdateBatchParent">
                {{ $t('update_batches_parent') }}
              </el-dropdown-item>

              <!-- 批量删除按钮 -->
              <el-dropdown-item :disabled="!(powerIds.length > 0)" :icon="useRenderIcon(Delete)" @click="onDeleteBatch">
                {{ $t('deleteBatches') }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
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
            <el-button :icon="useRenderIcon(EditPen)" :size="size" class="reset-margin" link type="primary" @click="onUpdate(row)">
              {{ $t('modify') }}
            </el-button>
            <!-- 添加 -->
            <el-button :icon="useRenderIcon(AddFill)" :size="size" class="reset-margin" link type="primary" @click="onAdd(row.id)">
              {{ $t('addNew') }}
            </el-button>
            <!-- 删除 -->
            <el-popconfirm :title="`${$t('delete')}${row.powerName}?`" @confirm="onDelete(row)">
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
