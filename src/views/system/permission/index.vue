<script lang="ts" setup>
import { computed, h, onMounted, ref } from 'vue';
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
} from '@/views/system/permission/utils';
import PureTableBar from '@/components/TableBar/src/bar';
import AddFill from '@iconify-icons/ri/add-circle-line';
import PureTable from '@pureadmin/table';
import Delete from '@iconify-icons/ep/delete';
import EditPen from '@iconify-icons/ep/edit-pen';
import Refresh from '@iconify-icons/ep/refresh';
import { selectUserinfo } from '@/components/Table/Userinfo/columns';
import { $t } from '@/plugins/i18n';
import { usePermissionStore } from '@/store/system/power';
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import { handleTree } from '@pureadmin/utils';
import { FormInstance } from 'element-plus';
import { hasAuth } from '@/router/utils';
import ReAuth from '@/components/ReAuth/src/auth';
import { RequestMethod } from '@/enums/baseConstant';
import Download from '@iconify-icons/ep/download';
import { downloadBlob } from '@/utils/sso';
import { exportPermission, importPermission } from '@/api/v1/system/power';
import Upload from '@iconify-icons/ri/upload-line';
import { addDialog } from '@/components/ReDialog/index';
import FileUpdateRoleDialog from '@/views/system/role/components/file-update-role-dialog.vue';

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
const downloadPermission = async () => {
  const result = await exportPermission();

  downloadBlob(result, 'role.zip');
};

/* 导入权限 */
const uploadPermission = async () => {
  addDialog({
    title: `${$t('modify')}${$t('role')}`,
    width: '30%',
    props: { form: { file: undefined } },
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(FileUpdateRoleDialog, { ref: formRef }),
    beforeSure: (done, { options }) => {
      const form = options.props.form;
      formRef.value.formRef.validate(async (valid: any) => {
        if (!valid) return;
        // 更新文件 data
        const data = { file: form.file[0].raw };

        const result = await importPermission(data);
        if (!result) return;
        done();
        await onSearch();
      });
    },
  });
};
onMounted(() => {
  onSearch();
});
</script>

<template>
  <div class="main">
    <ReAuth :value="auth.query">
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
        <el-form-item :label="$t('requestMethod')" prop="requestMethod">
          <el-select
            v-model="powerStore.form.requestMethod"
            :placeholder="$t('requestMethod')"
            autocomplete="off"
            class="!w-[180px]"
            clearable
            filterable
          >
            <el-option v-for="item in RequestMethod" :key="item" :label="item" :value="item" />
          </el-select>
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
    </ReAuth>

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
        <el-button
          v-if="hasAuth(auth.update)"
          :icon="useRenderIcon(Download)"
          plain
          type="primary"
          @click="downloadPermission()"
        >
          {{ $t('download_configuration') }}
        </el-button>
        <!-- 文件更新 -->
        <el-button
          v-if="hasAuth(auth.update)"
          :icon="useRenderIcon(Upload)"
          plain
          type="primary"
          @click="uploadPermission"
        >
          {{ $t('file_import') }}
        </el-button>

        <!-- 添加权限按钮 -->
        <el-button v-if="hasAuth(auth.add)" :icon="useRenderIcon(AddFill)" plain type="primary" @click="onAdd()">
          {{ $t('addNew') }}
        </el-button>

        <!-- 批量更新父级id -->
        <el-button
          v-if="hasAuth(auth.update)"
          :disabled="!(powerIds.length > 0)"
          :icon="useRenderIcon(EditPen)"
          plain
          type="primary"
          @click="onUpdateBatchParent"
        >
          {{ $t('update_batches_parent') }}
        </el-button>

        <!-- 批量删除按钮 -->
        <el-button
          v-if="hasAuth(auth.delete)"
          :disabled="!(powerIds.length > 0)"
          :icon="useRenderIcon(Delete)"
          plain
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
              v-if="hasAuth(auth.delete)"
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
