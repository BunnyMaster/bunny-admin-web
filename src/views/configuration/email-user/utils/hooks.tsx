import { addDialog } from '@/components/ReDialog/index';
import EmailUsersDialog from '@/views/configuration/email-user/components/email-users-dialog.vue';
import { useEmailUsersStore } from '@/store/configuration/emailUsers';
import { h, ref } from 'vue';
import { messageBox } from '@/utils/message';
import type { FormItemProps } from '@/views/configuration/email-user/utils/types';
import { $t } from '@/plugins/i18n';

export const formRef = ref();
// 用户是否停用加载集合
export const switchLoadMap = ref({});
// 删除ids
export const deleteIds = ref([]);
const emailUsersStore = useEmailUsersStore();

/** 搜索初始化邮箱用户发送配置 */
export async function onSearch() {
  emailUsersStore.loading = true;
  await emailUsersStore.fetchEmailUserPage();
  emailUsersStore.loading = false;
}

/** 添加邮箱用户发送配置 */
export function onAdd() {
  addDialog({
    title: `${$t('addNew')}${$t('emailUsers')}`,

    props: {
      formInline: {
        email: undefined,
        password: undefined,
        host: undefined,
        port: undefined,
        smtpAgreement: undefined,
        openSSL: true,
        isDefault: false,
      },
    },
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(EmailUsersDialog, { ref: formRef }),
    beforeSure: (done, { options }) => {
      const form = options.props.formInline as FormItemProps;
      formRef.value.formRef.validate(async (valid: any) => {
        if (!valid) return;

        const result = await emailUsersStore.addEmailUsers(form);
        if (!result) return;
        done();
        await onSearch();
      });
    },
  });
}

/* 更新邮箱用户发送配置 */
export function onUpdate(row: any) {
  addDialog({
    title: `${$t('modify')}${$t('emailUsers')}`,

    props: {
      formInline: {
        email: row.email,
        password: row.password,
        host: row.host,
        port: row.port,
        smtpAgreement: row.smtpAgreement,
        openSSL: row.openSSL,
        isDefault: row.isDefault,
      },
    },
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(EmailUsersDialog, { ref: formRef }),
    beforeSure: (done, { options }) => {
      const form = options.props.formInline as FormItemProps;
      formRef.value.formRef.validate(async (valid: any) => {
        if (!valid) return;

        const result = await emailUsersStore.editEmailUsers({
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

/** 删除邮箱用户发送配置 */
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
  await emailUsersStore.removeEmailUsers([id]);
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
  await emailUsersStore.removeEmailUsers(ids);
  await onSearch();
};

/* 修改是否默认 */
export const onChangeDefault = async (row: any, index: number) => {
  // 点击时开始loading加载
  switchLoadMap.value[index] = Object.assign({}, switchLoadMap.value[index], {
    loading: true,
  });

  // 是否确认修改弹窗内容
  const confirm = await messageBox({
    title: $t('confirm_update_status'),
    showMessage: false,
    confirmMessage: undefined,
    cancelMessage: $t('cancel'),
  });

  // 如果不修改将值恢复到之前状态
  if (confirm) {
    const result = await emailUsersStore.editEmailUsers(row);
    result && (await onSearch());
  }
  switchLoadMap.value[index] = Object.assign({}, switchLoadMap.value[index], {
    loading: false,
  });
};
