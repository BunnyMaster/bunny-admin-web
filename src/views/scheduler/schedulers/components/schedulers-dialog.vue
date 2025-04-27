<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { FormInstance } from 'element-plus';
import { FormProps, rules } from '@/views/scheduler/schedulers/utils';
import { $t } from '@/plugins/i18n';
import { useSchedulersGroupStore } from '@/store/scheduler/schedulersGroup';
import { useSchedulersStore } from '@/store/scheduler/schedulers';

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    // 任务名称
    jobName: undefined,
    // 任务分组
    jobGroup: undefined,
    // 任务详情
    description: undefined,
    // 任务类名称
    jobClassName: undefined,
    // corn表达式
    cronExpression: undefined,
    // 执行方法
    jobMethodName: undefined,
    // 是否是更新
    isUpdate: false,
  }),
});

const formRef = ref<FormInstance>();
const form = ref(props.formInline);
const schedulersStore = useSchedulersStore();
const schedulersGroupStore = useSchedulersGroupStore();

onMounted(() => {
  // 获取所有可用调度任务
  schedulersStore.loadScheduleJobList();

  // 获取所有任务调度分组
  schedulersGroupStore.loadSchedulersGroupList();
});

defineExpose({ formRef });
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
    <!-- 任务名称 -->
    <el-form-item :label="$t('schedulers_jobName')" prop="jobName">
      <el-input
        v-model="form.jobName"
        :disabled="form.isUpdate"
        :placeholder="$t('input') + $t('schedulers_jobName')"
        autocomplete="off"
        type="text"
      />
    </el-form-item>

    <!-- 任务分组 -->
    <el-form-item :label="$t('schedulers_jobGroup')" prop="jobGroup">
      <el-select
        v-model="form.jobGroup"
        :disabled="form.isUpdate"
        :placeholder="$t('select') + $t('schedulers_jobGroup')"
        clearable
        filterable
      >
        <el-option
          v-for="(item, index) in schedulersGroupStore.allSchedulersGroup"
          :key="index"
          :label="item.groupName"
          :navigationBar="false"
          :value="item.groupName"
        />
      </el-select>
    </el-form-item>

    <!-- 需要执行的任务类名 -->
    <el-form-item :label="$t('schedulers_jobClassName')" prop="jobClassName">
      <el-select
        v-model="form.jobClassName"
        :disabled="form.isUpdate"
        :placeholder="$t('select') + $t('schedulers_jobClassName')"
        clearable
        filterable
      >
        <el-option
          v-for="(item, index) in schedulersStore.allScheduleJobList"
          :key="index"
          :label="item.label"
          :navigationBar="false"
          :value="item.value"
        />
      </el-select>
    </el-form-item>

    <!-- 执行的corn表达式 -->
    <el-form-item :label="$t('schedulers_cronExpression')" prop="cronExpression">
      <el-input
        v-model="form.cronExpression"
        :placeholder="$t('input') + $t('schedulers_cronExpression')"
        autocomplete="off"
        type="text"
      />
    </el-form-item>

    <!-- 任务详情 -->
    <el-form-item :label="$t('schedulers_description')" prop="description">
      <el-input
        v-model="form.description"
        :disabled="form.isUpdate"
        :placeholder="$t('input') + $t('schedulers_description')"
        autocomplete="off"
        type="text"
      />
    </el-form-item>
  </el-form>
</template>
