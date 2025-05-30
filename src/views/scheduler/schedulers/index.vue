<script lang="ts" setup>
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import { PureTableBar } from '@/components/RePureTableBar';
import { selectUserinfo } from '@/components/Table/Userinfo/columns';
import { $t } from '@/plugins/i18n';
import { useSchedulersStore } from '@/store/scheduler/schedulers';
import { columns, onAdd, onDelete, onPause, onResume, onSearch, onUpdate } from '@/views/scheduler/schedulers/utils';
import PureTable from '@pureadmin/table';
import { FormInstance } from 'element-plus';
import { onMounted, ref } from 'vue';
import Delete from '~icons/ep/delete';
import EditPen from '~icons/ep/edit-pen';
import Refresh from '~icons/ep/refresh';
import AddFill from '~icons/ri/add-circle-line';

defineOptions({ name: 'SchedulerTask' });

const tableRef = ref();
const formRef = ref();
const schedulersStore = useSchedulersStore();

/** 当前页改变时 */
const onCurrentPageChange = async (value: number) => {
  schedulersStore.pagination.currentPage = value;
  await onSearch();
};

/** 当分页发生变化 */
const onPageSizeChange = async (value: number) => {
  schedulersStore.pagination.pageSize = value;
  await onSearch();
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
    <el-form ref="formRef" :inline="true" :model="schedulersStore.form" class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto">
      <el-form-item :label="$t('schedulers_jobName')" prop="jobName">
        <el-input v-model="schedulersStore.form.jobName" :placeholder="`${$t('input')}${$t('schedulers_jobName')}`" class="!w-[180px]" clearable />
      </el-form-item>
      <el-form-item :label="$t('schedulers_jobGroup')" prop="jobGroup">
        <el-input v-model="schedulersStore.form.jobGroup" :placeholder="`${$t('input')}${$t('schedulers_jobGroup')}`" class="!w-[180px]" clearable />
      </el-form-item>
      <el-form-item :label="$t('schedulers_description')" prop="description">
        <el-input v-model="schedulersStore.form.description" :placeholder="`${$t('input')}${$t('schedulers_description')}`" class="!w-[180px]" clearable />
      </el-form-item>
      <el-form-item :label="$t('schedulers_jobClassName')" prop="jobClassName">
        <el-input v-model="schedulersStore.form.jobClassName" :placeholder="`${$t('input')}${$t('schedulers_jobClassName')}`" class="!w-[180px]" clearable />
      </el-form-item>
      <el-form-item :label="$t('schedulers_triggerName')" prop="triggerName">
        <el-input v-model="schedulersStore.form.triggerName" :placeholder="`${$t('input')}${$t('schedulers_triggerName')}`" class="!w-[180px]" clearable />
      </el-form-item>
      <el-form-item :label="$t('schedulers_triggerState')" prop="triggerState">
        <el-input v-model="schedulersStore.form.triggerState" :placeholder="`${$t('input')}${$t('schedulers_triggerState')}`" class="!w-[180px]" clearable />
      </el-form-item>
      <el-form-item>
        <el-button :icon="useRenderIcon('ri/search-line')" :loading="schedulersStore.loading" type="primary" @click="onSearch">
          {{ $t('search') }}
        </el-button>
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">{{ $t('buttons.reset') }}</el-button>
      </el-form-item>
    </el-form>

    <PureTableBar :columns="columns" title="Schedulers视图" @fullscreen="tableRef.setAdaptive()" @refresh="onSearch">
      <template #buttons>
        <el-button :icon="useRenderIcon(AddFill)" plain type="success" @click="onAdd">
          {{ $t('addNew') }}
        </el-button>
      </template>

      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          ref="tableRef"
          :adaptiveConfig="{ offsetBottom: 96 }"
          :columns="dynamicColumns"
          :data="schedulersStore.datalist"
          :header-cell-style="{
            background: 'var(--el-fill-color-light)',
            color: 'var(--el-text-color-primary)',
          }"
          :loading="schedulersStore.loading"
          :pagination="schedulersStore.pagination"
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
        >
          <template #createUser="{ row }">
            <el-button v-show="row.createUser" link type="primary" @click="selectUserinfo(row.createUser)">
              {{ $t('table.createUser') }}
            </el-button>
          </template>

          <template #updateUser="{ row }">
            <el-button v-show="row.updateUser" link type="primary" @click="selectUserinfo(row.updateUser)">
              {{ $t('table.updateUser') }}
            </el-button>
          </template>

          <template #operation="{ row }">
            <!-- 修改 -->
            <el-button :icon="useRenderIcon(EditPen)" :size="size" class="reset-margin" link type="primary" @click="onUpdate(row)">
              {{ $t('modify') }}
            </el-button>

            <!-- 暂停-->
            <el-button
              v-if="row.triggerState !== 'PAUSED'"
              :icon="useRenderIcon('line-md:pause')"
              :size="size"
              class="reset-margin"
              link
              type="primary"
              @click="onPause(row)"
            >
              {{ $t('pause') }}
            </el-button>

            <!-- 恢复 -->
            <el-button
              v-if="row.triggerState === 'PAUSED'"
              :icon="useRenderIcon('material-symbols:resume')"
              :size="size"
              class="reset-margin"
              link
              type="primary"
              @click="onResume(row)"
            >
              {{ $t('resume') }}
            </el-button>

            <!-- 删除 -->
            <el-popconfirm :title="`${$t('delete')}${row.jobName}?`" @confirm="onDelete(row)">
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
