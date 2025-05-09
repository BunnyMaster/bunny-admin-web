import { addDialog } from '@/components/ReDialog/index';
import SchedulersGroupDialog from '@/views/scheduler/schedulers-group/components/schedulers-group-dialog.vue';
import { useSchedulersGroupStore } from '@/store/scheduler/schedulersGroup';
import { h, ref } from 'vue';
import { messageBox } from '@/utils/message';
import type { FormItemProps } from '@/views/scheduler/schedulers-group/utils/types';
import { $t } from '@/plugins/i18n';

export const formRef = ref();
// 删除ids
export const deleteIds = ref([]);
const schedulersGroupStore = useSchedulersGroupStore();

/** 搜索初始化任务调度分组 */
export async function onSearch() {
  schedulersGroupStore.loading = true;
  await schedulersGroupStore.fetchSchedulersGroupPage();
  schedulersGroupStore.loading = false;
}

/** 添加任务调度分组 */
export function onAdd() {
  const formInline = { groupName: undefined, description: undefined };

  addDialog({
    title: `${$t('addNew')}${$t('schedulersGroup')}`,
    props: { formInline },
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(SchedulersGroupDialog, { ref: formRef, formInline }),
    beforeSure: (done, { options }) => {
      const form = options.props.formInline as FormItemProps;
      formRef.value.formRef.validate(async (valid: any) => {
        if (!valid) return;

        const result = await schedulersGroupStore.addSchedulersGroup(form);
        if (!result) return;
        done();
        await onSearch();
      });
    },
  });
}

/* 更新任务调度分组 */
export function onUpdate(row: any) {
  const formInline = { groupName: row.groupName, description: row.description };
  addDialog({
    title: `${$t('modify')}${$t('schedulersGroup')}`,
    props: { formInline },
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(SchedulersGroupDialog, { ref: formRef, formInline }),
    beforeSure: (done, { options }) => {
      const form = options.props.formInline as FormItemProps;
      formRef.value.formRef.validate(async (valid: any) => {
        if (!valid) return;

        const result = await schedulersGroupStore.editSchedulersGroup({
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

/** 删除任务调度分组 */
export const onDelete = async (row: any) => {
  const id = row.id;

  // 是否确认删除
  const result = await messageBox({
    title: $t('confirmDelete'),
    showMessage: false,
    confirmMessage: undefined,
    cancelMessage: $t('confirmDelete'),
  });
  if (!result) return;

  // 删除数据
  await schedulersGroupStore.removeSchedulersGroup([id]);
  await onSearch();
};

/** 批量删除 */
export const onDeleteBatch = async () => {
  // 是否确认删除
  const result = await messageBox({
    title: $t('confirmDelete'),
    showMessage: false,
    confirmMessage: undefined,
    cancelMessage: $t('cancel_delete'),
  });
  if (!result) return;

  // 删除数据
  const ids = deleteIds.value;
  await schedulersGroupStore.removeSchedulersGroup(ids);
  await onSearch();
};
