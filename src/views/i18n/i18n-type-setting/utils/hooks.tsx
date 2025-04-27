import { addDialog } from '@/components/ReDialog/index';
import AddI18nType from '@/views/i18n/i18n-type-setting/components/i18n-type-dialog.vue';
import { userI18nTypeStore } from '@/store/i18n/i18nType';
import { h, ref } from 'vue';
import { messageBox } from '@/utils/message';
import type { FormItemProps } from '@/views/i18n/i18n-type-setting/utils/types';

export const formRef = ref();
const i18nTypeStore = userI18nTypeStore();

/* 搜索初始化多语言类型 */
export async function onSearch() {
  i18nTypeStore.loading = true;
  await i18nTypeStore.loadI18nTypeList();
  i18nTypeStore.loading = false;
}

/* 添加多语言 */
export function onAdd() {
  addDialog({
    title: `添加多语言类型`,
    width: '30%',
    props: {
      formInline: { typeName: '', summary: '', isDefault: false },
    },
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(AddI18nType, { ref: formRef }),
    beforeSure: (done, { options }) => {
      const form = options.props.formInline as FormItemProps;
      formRef.value.formRef.validate(async (valid: any) => {
        if (!valid) return;

        const result = await i18nTypeStore.addI18nType(form);
        if (!result) return;
        done();
        await onSearch();
      });
    },
  });
}

/* 更新内容 */
export function onUpdate(row: any) {
  addDialog({
    title: `修改多语言类型`,
    width: '30%',
    props: { formInline: { typeName: row.typeName, summary: row.summary, isDefault: row.isDefault } },
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(AddI18nType, { ref: formRef }),
    beforeSure: (done, { options }) => {
      const form = options.props.formInline as FormItemProps;
      formRef.value.formRef.validate(async (valid: any) => {
        if (!valid) return;

        const result = await i18nTypeStore.editI18nType({ ...form, id: row.id });
        if (!result) return;
        done();
        await onSearch();
      });
    },
  });
}

/* 删除多语言类容 */
export const onDelete = async (row: any) => {
  const id = row.id;

  // 是否确认删除
  const result = await messageBox({
    message: `删除 【${row.summary}】 这条记录吗？`,
    title: '确认删除吗？',
    showMessage: false,
    confirmMessage: undefined,
    cancelMessage: '取消删除',
  });
  if (!result) return;

  // 删除数据
  await i18nTypeStore.removeI18nType([id]);
  await onSearch();
};
