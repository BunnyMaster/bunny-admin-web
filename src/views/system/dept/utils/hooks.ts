import { addDialog } from '@/components/ReDialog/index';
import DeptDialog from '@/views/system/dept/components/dept-dialog.vue';
import { useDeptStore } from '@/store/system/dept';
import { h, ref } from 'vue';
import { message, messageBox } from '@/utils/message';
import type { FormItemProps } from '@/views/system/dept/utils/types';
import { $t } from '@/plugins/i18n';
import DeleteBatchDialog from '@/components/Table/DeleteBatchDialog.vue';

export const formRef = ref();
export const deleteIds = ref([]);
const deptStore = useDeptStore();

/** 搜索初始化部门 */
export async function onSearch() {
  deptStore.loading = true;
  await deptStore.getDeptList();
  deptStore.loading = false;
}

/** 添加部门 */
export function onAdd(parentId: number = 0) {
  addDialog({
    title: `${$t('addNew')}${$t('dept')}`,
    width: '30%',
    props: {
      formInline: {
        parentId,
        manager: undefined,
        deptName: undefined,
        summary: undefined,
      },
    },
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(DeptDialog, { ref: formRef }),
    beforeSure: (done, { options }) => {
      const form = options.props.formInline as FormItemProps;
      formRef.value.formRef.validate(async (valid: any) => {
        if (!valid) return;

        const result = await deptStore.addDept(form);
        if (!result) return;
        done();
        await onSearch();
      });
    },
  });
}

/**
 * * 更新部门
 * @param row
 */
export function onUpdate(row: any) {
  addDialog({
    title: `${$t('modify')}${$t('dept')}`,
    width: '30%',
    props: {
      formInline: {
        parentId: row.parentId,
        manager: row.manager ? row.manager.split(',') : row.manager,
        deptName: row.deptName,
        summary: row.summary,
      },
    },
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(DeptDialog, { ref: formRef }),
    beforeSure: (done, { options }) => {
      const form = options.props.formInline as FormItemProps;
      formRef.value.formRef.validate(async (valid: any) => {
        if (!valid) return;

        const result = await deptStore.updateDept({ ...form, id: row.id });
        if (!result) return;
        done();
        await onSearch();
      });
    },
  });
}

/** 删除部门 */
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
  await deptStore.deleteDept([id]);
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
          await deptStore.deleteDept(ids);
          await onSearch();

          done();
        } else message($t('deleteBatchTip'), { type: 'warning' });
      });
    },
  });
};
