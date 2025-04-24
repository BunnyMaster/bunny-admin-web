import { addDialog } from '@/components/BaseDialog/index';
import MenuIconDialog from '@/views/configuration/menu-icon/menu-icon-dialog.vue';
import { useMenuIconStore } from '@/store/configuration/menuIcon';
import { h, ref } from 'vue';
import { message, messageBox } from '@/utils/message';
import type { FormItemProps } from '@/views/configuration/menu-icon/utils/types';
import { $t } from '@/plugins/i18n';
import DeleteBatchDialog from '@/components/Table/DeleteBatchDialog.vue';

export const formRef = ref();
const menuIconStore = useMenuIconStore();
export const deleteIds = ref([]);

/** 搜索初始化系统菜单图标 */
export async function onSearch() {
  menuIconStore.loading = true;
  await menuIconStore.getMenuIconList();
  menuIconStore.loading = false;
}

/** 添加系统菜单图标 */
export function onAdd() {
  addDialog({
    title: `${$t('addNew')} ${$t('menuIcon')}`,
    width: '30%',
    props: {
      formInline: {
        iconCode: undefined,
        iconName: undefined,
      },
    },
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(MenuIconDialog, { ref: formRef }),
    beforeSure: (done, { options }) => {
      const form = options.props.formInline as FormItemProps;
      formRef.value.formRef.validate(async (valid: any) => {
        if (!valid) return;

        const result = await menuIconStore.addMenuIcon(form);
        if (!result) return;
        done();
        await onSearch();
      });
    },
  });
}

/**
 * * 更新系统菜单图标
 * @param row
 */
export function onUpdate(row: any) {
  addDialog({
    title: `${$t('modify')} ${$t('menuIcon')}`,
    width: '30%',
    props: {
      formInline: {
        iconCode: row.iconCode,
        iconName: row.iconName,
      },
    },
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(MenuIconDialog, { ref: formRef }),
    beforeSure: (done, { options }) => {
      const form = options.props.formInline as FormItemProps;
      formRef.value.formRef.validate(async (valid: any) => {
        if (!valid) return;

        const result = await menuIconStore.updateMenuIcon({ ...form, id: row.id });
        if (!result) return;
        done();
        await onSearch();
      });
    },
  });
}

/** 删除系统菜单图标 */
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
  await menuIconStore.deleteMenuIcon([id]);
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
          await menuIconStore.deleteMenuIcon(ids);
          await onSearch();

          done();
        } else message($t('deleteBatchTip'), { type: 'warning' });
      });
    },
  });
};
