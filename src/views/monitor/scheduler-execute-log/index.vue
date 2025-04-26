<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import {
  auth,
  columns,
  deleteIds,
  onDelete,
  onDeleteBatch,
  onSearch,
  onView,
  state,
} from '@/views/monitor/scheduler-execute-log/utils';
import PureTableBar from '@/components/TableBar/src/bar';
import PureTable from '@pureadmin/table';
import Delete from '@iconify-icons/ep/delete';
import Refresh from '@iconify-icons/ep/refresh';
import { selectUserinfo } from '@/components/Table/Userinfo/columns';
import { $t } from '@/plugins/i18n';
import { useQuartzExecuteLogStore } from '@/store/monitor/quartzExecuteLog';
import { useRenderIcon } from '@/components/ReIcon/src/hooks';
import { FormInstance } from 'element-plus';
import View from '@iconify-icons/ep/view';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import { hasAuth } from '@/router/utils';
import ReAuth from '@/components/ReAuth/src/auth';

defineOptions({ name: 'SchedulerExecuteLog' });

const tableRef = ref();
const formRef = ref();
const quartzExecuteLogStore = useQuartzExecuteLogStore();

/** 当前页改变时 */
const onCurrentPageChange = async (value: number) => {
  quartzExecuteLogStore.pagination.currentPage = value;
  await onSearch();
};

/** 当分页发生变化 */
const onPageSizeChange = async (value: number) => {
  quartzExecuteLogStore.pagination.pageSize = value;
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
    <ReAuth :value="auth.search">
      <el-form
        ref="formRef"
        :inline="true"
        :model="quartzExecuteLogStore.form"
        class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px] overflow-auto"
      >
        <el-form-item :label="$t('quartzExecuteLog_jobName')" prop="jobName">
          <el-input
            v-model="quartzExecuteLogStore.form.jobName"
            :placeholder="`${$t('input')}${$t('quartzExecuteLog_jobName')}`"
            class="!w-[180px]"
            clearable
          />
        </el-form-item>
        <el-form-item :label="$t('quartzExecuteLog_jobGroup')" prop="jobGroup">
          <el-input
            v-model="quartzExecuteLogStore.form.jobGroup"
            :placeholder="`${$t('input')}${$t('quartzExecuteLog_jobGroup')}`"
            class="!w-[180px]"
            clearable
          />
        </el-form-item>
        <el-form-item :label="$t('quartzExecuteLog_jobClassName')" prop="jobClassName">
          <el-input
            v-model="quartzExecuteLogStore.form.jobClassName"
            :placeholder="`${$t('input')}${$t('quartzExecuteLog_jobClassName')}`"
            class="!w-[180px]"
            clearable
          />
        </el-form-item>
        <el-form-item :label="$t('quartzExecuteLog_cronExpression')" prop="cronExpression">
          <el-input
            v-model="quartzExecuteLogStore.form.cronExpression"
            :placeholder="`${$t('input')}${$t('quartzExecuteLog_cronExpression')}`"
            class="!w-[180px]"
            clearable
          />
        </el-form-item>
        <el-form-item :label="$t('quartzExecuteLog_triggerName')" prop="triggerName">
          <el-input
            v-model="quartzExecuteLogStore.form.triggerName"
            :placeholder="`${$t('input')}${$t('quartzExecuteLog_triggerName')}`"
            class="!w-[180px]"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button
            :icon="useRenderIcon('ri:search-line')"
            :loading="quartzExecuteLogStore.loading"
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
      :title="$t('quartzExecuteLog')"
      @fullscreen="tableRef.setAdaptive()"
      @refresh="onSearch"
    >
      <template #buttons>
        <!-- 批量删除按钮 -->
        <el-button
          v-if="hasAuth(auth.deleted)"
          :disabled="!(deleteIds.length > 0)"
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
          :data="quartzExecuteLogStore.datalist"
          :header-cell-style="{ background: 'var(--el-fill-color-light)', color: 'var(--el-text-color-primary)' }"
          :loading="quartzExecuteLogStore.loading"
          :pagination="quartzExecuteLogStore.pagination"
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
          <template #executeResult="{ row }">
            <VueJsonPretty
              :data="JSON.parse(row.executeResult)"
              :deep="state.deep"
              :editable="state.editable"
              :editable-trigger="state.editableTrigger as any"
              :show-double-quotes="state.showDoubleQuotes"
              :show-icon="state.showIcon"
              :show-length="state.showLength"
              :show-line="state.showLine"
              :show-line-number="state.showLineNumber"
            />
          </template>

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
            <el-button
              v-if="hasAuth(auth.search)"
              :icon="useRenderIcon(View)"
              :size="size"
              class="reset-margin"
              link
              type="primary"
              @click="onView(row)"
            >
              {{ $t('view') }}
            </el-button>
            <el-popconfirm
              v-if="hasAuth(auth.deleted)"
              :title="`${$t('delete')}${row.jobName}?`"
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
