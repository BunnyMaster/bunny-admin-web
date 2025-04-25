import { addDialog } from '@/components/ReDialog/index';
import SchedulersGroupDialog from '@/views/scheduler/schedulers-group/components/schedulers-group-dialog.vue';
import { useSchedulersGroupStore } from '@/store/scheduler/schedulersGroup';
import { h, ref } from 'vue';
import { message, messageBox } from '@/utils/message';
import type { FormItemProps } from '@/views/scheduler/schedulers-group/utils/types';
import { $t } from '@/plugins/i18n';
import DeleteBatchDialog from '@/components/Table/DeleteBatchDialog.vue';

export const formRef = ref();
// 删除ids
export const deleteIds = ref([]);
const schedulersGroupStore = useSchedulersGroupStore();

/** 搜索初始化任务调度分组 */
export async function onSearch() {
  schedulersGroupStore.loading = true;
  await schedulersGroupStore.getSchedulersGroupList();
  schedulersGroupStore.loading = false;
}

/** 添加任务调度分组 */
export function onAdd() {
  addDialog({
    title: `${$t('addNew')}${$t('schedulersGroup')}`,
    width: '30%',
    props: {
      formInline: {
        groupName: undefined,
        description: undefined,
      },
    },
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(SchedulersGroupDialog, { ref: formRef }),
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

/**
 * * 更新任务调度分组
 * @param row
 */
export function onUpdate(row: any) {
  addDialog({
    title: `${$t('modify')}${$t('schedulersGroup')}`,
    width: '30%',
    props: {
      formInline: {
        groupName: row.groupName,
        description: row.description,
      },
    },
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(SchedulersGroupDialog, { ref: formRef }),
    beforeSure: (done, { options }) => {
      const form = options.props.formInline as FormItemProps;
      formRef.value.formRef.validate(async (valid: any) => {
        if (!valid) return;

        const result = await schedulersGroupStore.updateSchedulersGroup({ ...form, id: row.id });
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
  await schedulersGroupStore.deleteSchedulersGroup([id]);
  await onSearch();
};

/** 批量删除 */
export const onDeleteBatch = async () => {
  const ids = deleteIds.value;
  const formDeletedBatchRef = ref();

  addDialog({
    title: $t('deleteBatchTip'),
    width: '30%',
    props: { formInline: { confirmText: '' } },
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(DeleteBatchDialog, { ref: formDeletedBatchRef }),
    beforeSure: (done, { options }) => {
      formDeletedBatchRef.value.formDeletedBatchRef.validate(async (valid: any) => {
        if (!valid) return;

        const text = options.props.formInline.confirmText.toLowerCase();
        if (text === 'yes' || text === 'y') {
          // 删除数据
          await schedulersGroupStore.deleteSchedulersGroup(ids);
          await onSearch();

          done();
        } else message($t('deleteBatchTip'), { type: 'warning' });
      });
    },
  });
};
