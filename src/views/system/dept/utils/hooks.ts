import { addDialog } from '@/components/ReDialog/index';
import DeptDialog from '@/views/system/dept/components/dept-dialog.vue';
import { useDeptStore } from '@/store/system/dept';
import { h, ref } from 'vue';
import { messageBox } from '@/utils/message';
import type { FormItemProps } from '@/views/system/dept/utils/types';
import { $t } from '@/plugins/i18n';

export const formRef = ref();
export const deleteIds = ref([]);
const deptStore = useDeptStore();

/** 搜索初始化部门 */
export async function onSearch() {
  deptStore.loading = true;
  await deptStore.fetchDeptPage();
  deptStore.loading = false;
}

/** 添加部门 */
export function onAdd(parentId: string = '0') {
  addDialog({
    title: `${$t('addNew')}${$t('dept')}`,
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
    contentRenderer: () =>
      h(DeptDialog, {
        ref: formRef,
        formInline: {
          parentId,
          manager: undefined,
          deptName: undefined,
          summary: undefined,
        },
      }),
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

/* 更新部门 */
export function onUpdate(row: any) {
  addDialog({
    title: `${$t('modify')}${$t('dept')}`,

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
    contentRenderer: () =>
      h(DeptDialog, {
        ref: formRef,
        formInline: {
          parentId: row.parentId,
          manager: row.manager ? row.manager.split(',') : row.manager,
          deptName: row.deptName,
          summary: row.summary,
        },
      }),
    beforeSure: (done, { options }) => {
      const form = options.props.formInline as FormItemProps;
      formRef.value.formRef.validate(async (valid: any) => {
        if (!valid) return;

        const result = await deptStore.editDept({ ...form, id: row.id });
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
  await deptStore.removeDept([id]);
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
  await deptStore.removeDept(ids);
  await onSearch();
};
