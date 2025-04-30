<script lang="ts" setup>
import ReAuth from '@/components/ReAuth/src/auth';
import { addDialog } from '@/components/ReDialog/index';
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import { PureTableBar } from '@/components/RePureTableBar';
import { $t } from '@/plugins/i18n';
import { hasAuth } from '@/router/utils';
import { useRoleStore } from '@/store/system/role';
import FileUploadDialog from '@/views/system/role/components/file-upload-dialog.vue';
import {
  auth,
  columns,
  contentRef,
  deleteIds,
  formRef,
  onAdd,
  onDelete,
  onDeleteBatch,
  onMenuPowerClick,
  onSearch,
  onUpdate,
  powerTreeIsShow,
  tableRef,
} from '@/views/system/role/utils';
import PureTable from '@pureadmin/table';
import { deviceDetection } from '@pureadmin/utils';
import { FormInstance } from 'element-plus';
import { h, onMounted } from 'vue';
import Delete from '~icons/ep/delete';
import Download from '~icons/ep/download';
import EditPen from '~icons/ep/edit-pen';
import Menu from '~icons/ep/menu';
import Refresh from '~icons/ep/refresh';
import AddFill from '~icons/ri/add-circle-line';
import Upload from '~icons/ri/upload-line';
import PowersToRole from '@/views/system/role/components/powers-to-role.vue';
import { useRouter } from 'vue-router';

defineOptions({ name: 'RoleManger' });

const roleStore = useRoleStore();

/* 当前页改变时 */
const onCurrentPageChange = async (value: number) => {
  roleStore.pagination.currentPage = value;
  await onSearch();
};

/* 当分页发生变化 */
const onPageSizeChange = async (value: number) => {
  roleStore.pagination.pageSize = value;
  await onSearch();
};

/* 选择多行 */
const onSelectionChange = (rows: Array<any>) => {
  deleteIds.value = rows.map((row: any) => row.id);
};

/* 重置表单 */
const resetForm = async (formEl: FormInstance) => {
  if (!formEl) return;
  formEl.resetFields();
  await onSearch();
};

/* 使用Excel导出导出角色列表 */
const downloadRoleExcel = () => {
  roleStore.downloadRoleByFile();
};

/* 使用文件更新角色 */
const onUpdateByFile = () => {
  addDialog({
    title: `${$t('modify')}${$t('role')}`,
    width: '30%',
    props: { form: { file: undefined } },
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(FileUploadDialog, { ref: formRef }),
    beforeSure: (done, { options }) => {
      const form = options.props.form;
      formRef.value.formRef.validate(async (valid: any) => {
        if (!valid) return;
        // 更新文件 data
        const data = { file: form.file[0].raw };

        const result = await roleStore.editRoleByFile(data);
        if (!result) return;
        done();
        await onSearch();
      });
    },
  });
};
const router = useRouter();

onMounted(() => {
  onSearch();
});
</script>

<template>
  <div class="main">
    <ReAuth :value="auth.query">
      <el-form ref="formRef" :inline="true" :model="roleStore.form" class="search-form bg-bg_color w-full pl-8 pt-[12px] overflow-auto">
        <el-form-item :label="$t('role_roleCode')" prop="roleCode">
          <el-input v-model="roleStore.form.roleCode" :placeholder="`${$t('input')}${$t('role_roleCode')}`" class="!w-[180px]" clearable />
        </el-form-item>
        <el-form-item :label="$t('role_description')" prop="description">
          <el-input v-model="roleStore.form.description" :placeholder="`${$t('input')}${$t('role_description')}`" class="!w-[180px]" clearable />
        </el-form-item>
        <el-form-item>
          <el-button :icon="useRenderIcon('ri/search-line')" :loading="roleStore.loading" type="primary" @click="onSearch">
            {{ $t('search') }}
          </el-button>
          <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">{{ $t('buttons.reset') }}</el-button>
        </el-form-item>
      </el-form>
    </ReAuth>

    <div ref="contentRef" :class="['flex', deviceDetection() ? 'flex-wrap' : '']">
      <PureTableBar
        :class="[powerTreeIsShow && !deviceDetection() ? 'w-[60vw]!' : 'w-full']"
        :columns="columns"
        :title="$t('role')"
        style="transition: width 330ms cubic-bezier(0.4, 0, 0.2, 1)"
        @fullscreen="tableRef.setAdaptive()"
        @refresh="onSearch"
      >
        <template #buttons>
          <!-- 下载Excel配置 -->
          <el-button v-if="hasAuth(auth.update)" :icon="useRenderIcon(Download)" plain type="primary" @click="downloadRoleExcel">
            {{ $t('download_configuration') }}
          </el-button>
          <!-- 文件更新 -->
          <el-button v-if="hasAuth(auth.update)" :icon="useRenderIcon(Upload)" plain type="primary" @click="onUpdateByFile">
            {{ $t('file_import') }}
          </el-button>

          <el-button v-if="hasAuth(auth.add)" :icon="useRenderIcon(AddFill)" plain type="primary" @click="onAdd">
            {{ $t('addNew') }}
          </el-button>

          <!-- 批量删除按钮 -->
          <el-button v-if="hasAuth(auth.delete)" :disabled="!(deleteIds.length > 0)" :icon="useRenderIcon(Delete)" plain type="danger" @click="onDeleteBatch">
            {{ $t('delete_batches') }}
          </el-button>
        </template>

        <template v-slot="{ size, dynamicColumns }">
          <pure-table
            ref="tableRef"
            :adaptiveConfig="{ offsetBottom: 96 }"
            :columns="dynamicColumns"
            :data="roleStore.datalist"
            :header-cell-style="{ background: 'var(--el-fill-color-light)', color: 'var(--el-text-color-primary)' }"
            :loading="roleStore.loading"
            :pagination="roleStore.pagination"
            :size="size"
            adaptive
            align-whole="center"
            border
            highlight-current-row
            row-key="id"
            showOverflowTooltip
            table-layout="auto"
            @page-size-change="onPageSizeChange"
            @page-current-change="onCurrentPageChange"
            @selection-change="onSelectionChange"
          >
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

              <!-- 删除 -->
              <el-popconfirm v-if="hasAuth(auth.delete)" :title="`${$t('delete')}${row.roleCode}?`" @confirm="onDelete(row)">
                <template #reference>
                  <el-button :icon="useRenderIcon(Delete)" :size="size" class="reset-margin" link type="primary">
                    {{ $t('delete') }}
                  </el-button>
                </template>
              </el-popconfirm>

              <el-button
                v-if="hasAuth(auth.rolePowerAdd)"
                :icon="useRenderIcon(Menu)"
                :size="size"
                class="reset-margin"
                link
                type="primary"
                @click="onMenuPowerClick(row)"
              >
                {{ $t('power_setting') }}
              </el-button>
            </template>
          </pure-table>
        </template>
      </PureTableBar>

      <!-- 为角色分配角色 -->
      <powers-to-role />
    </div>
  </div>
</template>
