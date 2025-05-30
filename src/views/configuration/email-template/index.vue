<script lang="tsx" setup>
import { addDialog } from '@/components/ReDialog/index';
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import { PureTableBar } from '@/components/RePureTableBar';
import { selectUserinfo } from '@/components/Table/Userinfo/columns';
import { $t } from '@/plugins/i18n';
import { useEmailTemplateStore } from '@/store/configuration/emailTemplate';
import { useEmailUsersStore } from '@/store/configuration/emailUsers';
import { columns, onAdd, onDelete, onDeleteBatch, onSearch, onUpdate, selectRows } from '@/views/configuration/email-template/utils';
import PureTable from '@pureadmin/table';
import { onMounted, ref } from 'vue';
import Delete from '~icons/ep/delete';
import EditPen from '~icons/ep/edit-pen';
import Refresh from '~icons/ep/refresh';
import View from '~icons/ep/view';
import AddFill from '~icons/ri/add-circle-line';

defineOptions({ name: 'EmailTemplate' });

const emailTemplateStore = useEmailTemplateStore();
const emailUsersStore = useEmailUsersStore();

const tableRef = ref();
const formRef = ref();

/** 当前页改变时 */
const onCurrentPageChange = async (value: number) => {
  emailTemplateStore.pagination.currentPage = value;
  await onSearch();
};

/** 当分页发生变化 */
const onPageSizeChange = async (value: number) => {
  emailTemplateStore.pagination.pageSize = value;
  await onSearch();
};

/** 重置表单 */
const resetForm = async (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
  await onSearch();
};

/** 选择多行 */
const onSelectionChange = (rows: Array<any>) => {
  selectRows.value = rows;
};

/** 查看模板 */
const viewTemplate = (template: string) => {
  addDialog({
    title: $t('view'),
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => <div v-html={template} />,
  });
};

onMounted(() => {
  emailUsersStore.loadEmailUserList();
  onSearch();
});
</script>

<template>
  <div class="main">
    <el-form ref="formRef" :inline="true" :model="emailTemplateStore.form" class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto">
      <el-form-item :label="$t('emailTemplate_templateName')" prop="templateName">
        <el-input
          v-model="emailTemplateStore.form.templateName"
          :placeholder="`${$t('input')}${$t('emailTemplate_templateName')}`"
          class="!w-[180px]"
          clearable
        />
      </el-form-item>
      <el-form-item :label="$t('emailTemplate_subject')" prop="subject">
        <el-input v-model="emailTemplateStore.form.subject" :placeholder="`${$t('input')}${$t('emailTemplate_subject')}`" class="!w-[180px]" clearable />
      </el-form-item>
      <el-form-item :label="$t('emailTemplate_body')" prop="body">
        <el-input v-model="emailTemplateStore.form.body" :placeholder="`${$t('input')}${$t('emailTemplate_body')}`" class="!w-[180px]" clearable />
      </el-form-item>
      <el-form-item :label="$t('emailTemplate_type')" prop="type">
        <el-input v-model="emailTemplateStore.form.type" :placeholder="`${$t('input')}${$t('emailTemplate_type')}`" class="!w-[180px]" clearable />
      </el-form-item>
      <el-form-item>
        <el-button :icon="useRenderIcon('ri/search-line')" :loading="emailTemplateStore.loading" type="primary" @click="onSearch">
          {{ $t('search') }}
        </el-button>
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">{{ $t('buttons.reset') }}</el-button>
      </el-form-item>
    </el-form>

    <PureTableBar :columns="columns" :title="$t('emailTemplate')" @fullscreen="tableRef.setAdaptive()" @refresh="onSearch">
      <!-- 新增 -->
      <template #buttons>
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
          :data="emailTemplateStore.datalist"
          :header-cell-style="{
            background: 'var(--el-fill-color-light)',
            color: 'var(--el-text-color-primary)',
          }"
          :loading="emailTemplateStore.loading"
          :pagination="emailTemplateStore.pagination"
          :size="size"
          adaptive
          align-whole="center"
          border
          highlight-current-row
          row-key="id"
          showOverflowTooltip
          table-layout="auto"
          @selection-change="onSelectionChange"
          @page-size-change="onPageSizeChange"
          @page-current-change="onCurrentPageChange"
        >
          <template #emailUser="{ row }">
            {{ emailUsersStore.getMailboxConfigurationUser[row.emailUser] }}
          </template>

          <!-- 插槽-创建用户 -->
          <template #createUser="{ row }">
            <el-button v-show="row.createUser" link type="primary" @click="selectUserinfo(row.createUser)">
              {{ row.createUsername }}
            </el-button>
          </template>

          <!-- 插槽-更新用户 -->
          <template #updateUser="{ row }">
            <el-button v-show="row.updateUser" link type="primary" @click="selectUserinfo(row.updateUser)">
              {{ row.updateUsername }}
            </el-button>
          </template>

          <template #operation="{ row }">
            <!--查看模板-->
            <el-button :icon="useRenderIcon(View)" :size="size" class="reset-margin" link type="primary" @click="viewTemplate(row.body)">
              {{ $t('view') }}
            </el-button>

            <!-- 修改 -->
            <el-button :icon="useRenderIcon(EditPen)" :size="size" class="reset-margin" link type="primary" @click="onUpdate(row)">
              {{ $t('modify') }}
            </el-button>

            <!-- 删除 -->
            <el-popconfirm :title="`${$t('delete')} ${row.templateName}?`" @confirm="onDelete(row)">
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
