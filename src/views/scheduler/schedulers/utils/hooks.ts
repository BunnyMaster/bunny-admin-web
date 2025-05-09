import { addDialog } from '@/components/ReDialog/index';
import SchedulersDialog from '@/views/scheduler/schedulers/components/schedulers-dialog.vue';
import { useSchedulersStore } from '@/store/scheduler/schedulers';
import { h, ref } from 'vue';
import { messageBox } from '@/utils/message';
import type { FormItemProps } from '@/views/scheduler/schedulers/utils/types';
import { $t } from '@/plugins/i18n';

export const formRef = ref();
const schedulersStore = useSchedulersStore();

/** 搜索初始化Schedulers视图 */
export async function onSearch() {
  schedulersStore.loading = true;
  await schedulersStore.fetchSchedulersPage();
  schedulersStore.loading = false;
}

/** 添加Schedulers视图 */
export function onAdd() {
  const formInline = {
    jobName: undefined,
    jobGroup: undefined,
    description: undefined,
    jobClassName: undefined,
    cronExpression: undefined,
    isUpdate: false,
  };

  addDialog({
    title: `${$t('addNew')}${$t('schedulers')}`,
    props: { formInline },
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(SchedulersDialog, { ref: formRef, formInline }),
    beforeSure: (done, { options }) => {
      const form = options.props.formInline as FormItemProps;
      formRef.value.formRef.validate(async (valid: any) => {
        if (!valid) return;

        const result = await schedulersStore.addSchedulers(form);
        if (!result) return;
        done();
        await onSearch();
      });
    },
  });
}

/* 更新Schedulers视图 */
export function onUpdate(row: any) {
  const formInline = {
    jobName: row.jobName,
    jobGroup: row.jobGroup,
    description: row.description,
    jobClassName: row.jobClassName,
    cronExpression: row.cronExpression,
    isUpdate: true,
  };

  addDialog({
    title: `${$t('modify')}${$t('schedulers')}`,
    props: { formInline },
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(SchedulersDialog, { ref: formRef, formInline }),
    beforeSure: (done, { options }) => {
      const form = options.props.formInline as FormItemProps;
      formRef.value.formRef.validate(async (valid: any) => {
        if (!valid) return;

        const result = await schedulersStore.editSchedulers({
          ...form,
          id: row.id,
        });
        if (!result) return;
        done();
        await onSearch();
      });
    },
  });
}

/** 删除Schedulers视图 */
export const onDelete = async (row: any) => {
  const data = { jobName: row.jobName, jobGroup: row.jobGroup };

  // 是否确认删除
  const result = await messageBox({
    title: $t('confirmDelete'),
    showMessage: false,
    confirmMessage: undefined,
    cancelMessage: $t('confirmDelete'),
  });
  if (!result) return;

  // 删除数据
  await schedulersStore.removeSchedulers(data);
  await onSearch();
};

/** 暂停任务 */
export const onPause = async (row: any) => {
  const data = { jobName: row.jobName, jobGroup: row.jobGroup };

  // 是否确认删除
  const result = await messageBox({
    title: $t('confirm_update_status'),
    showMessage: false,
    confirmMessage: undefined,
    cancelMessage: $t('cancel'),
  });
  if (!result) return;

  // 暂停任务
  await schedulersStore.pauseSchedulers(data);
  await onSearch();
};

/** 恢复任务 */
export const onResume = async (row: any) => {
  const data = { jobName: row.jobName, jobGroup: row.jobGroup };

  // 是否确认删除
  const result = await messageBox({
    title: $t('confirm_update_status'),
    showMessage: false,
    confirmMessage: undefined,
    cancelMessage: $t('cancel'),
  });
  if (!result) return;

  // 恢复任务
  await schedulersStore.resumeSchedulers(data);
  await onSearch();
};
