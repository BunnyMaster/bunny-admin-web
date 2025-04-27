import { addDialog } from '@/components/ReDialog/index';
import MenuIconDialog from '@/views/configuration/menu-icon/components/menu-icon-dialog.vue';
import { useMenuIconStore } from '@/store/configuration/menuIcon';
import { h, ref } from 'vue';
import { messageBox } from '@/utils/message';
import type { FormItemProps } from '@/views/configuration/menu-icon/utils/types';
import { $t } from '@/plugins/i18n';

export const formRef = ref();
const menuIconStore = useMenuIconStore();
export const deleteIds = ref([]);

/** 搜索初始化系统菜单图标 */
export async function onSearch() {
  menuIconStore.loading = true;
  await menuIconStore.fetchMenuIconListPage();
  menuIconStore.loading = false;
}

/** 添加系统菜单图标 */
export function onAdd() {
  addDialog({
    title: `${$t('addNew')} ${$t('menuIcon')}`,
    width: '30%',
    props: { formInline: { confirmText: '' } },
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

/* 更新系统菜单图标 */
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

        const result = await menuIconStore.editMenuIcon({ ...form, id: row.id });
        if (!result) return;
        done();
        await onSearch();
      });
    },
  });
}

/** 删除系统菜单图标 */
export const onDelete = async (row: any) => {
  // 是否确认删除
  const result = await messageBox({
    title: $t('confirmDelete'),
    showMessage: false,
    confirmMessage: undefined,
    cancelMessage: $t('confirmDelete'),
  });
  if (!result) return;

  // 删除数据
  const id = row.id;
  await menuIconStore.removeMenuIcon([id]);
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
  await menuIconStore.removeMenuIcon(ids);
  await onSearch();
};
