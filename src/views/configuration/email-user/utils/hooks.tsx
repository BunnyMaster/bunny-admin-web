import { addDialog } from '@/components/ReDialog/index';
import EmailUsersDialog from '@/views/configuration/email-user/components/email-users-dialog.vue';
import { useEmailUsersStore } from '@/store/configuration/emailUsers';
import { h, ref } from 'vue';
import { message, messageBox } from '@/utils/message';
import type { FormItemProps } from '@/views/configuration/email-user/utils/types';
import { $t } from '@/plugins/i18n';
import DeleteBatchDialog from '@/components/Table/DeleteBatchDialog.vue';

export const formRef = ref();
// 用户是否停用加载集合
export const switchLoadMap = ref({});
// 删除ids
export const deleteIds = ref([]);
const emailUsersStore = useEmailUsersStore();

/** 搜索初始化邮箱用户发送配置 */
export async function onSearch() {
  emailUsersStore.loading = true;
  await emailUsersStore.getEmailUsersList();
  emailUsersStore.loading = false;
}

/** 添加邮箱用户发送配置 */
export function onAdd() {
  addDialog({
    title: `${$t('addNew')}${$t('emailUsers')}`,
    width: '30%',
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

/**
 * * 更新邮箱用户发送配置
 * @param row
 */
export function onUpdate(row: any) {
  addDialog({
    title: `${$t('modify')}${$t('emailUsers')}`,
    width: '30%',
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

        const result = await emailUsersStore.updateEmailUsers({ ...form, id: row.id });
        if (!result) return;
        done();
        await onSearch();
      });
    },
  });
}

/** 删除邮箱用户发送配置 */
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
  await emailUsersStore.deleteEmailUsers([id]);
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
          await emailUsersStore.deleteEmailUsers(ids);
          await onSearch();

          done();
        } else message($t('deleteBatchTip'), { type: 'warning' });
      });
    },
  });
};

/**
 * * 修改是否默认
 * @param row
 * @param index
 */
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
  if (!confirm) {
    row.isDefault = !row.isDefault;
    switchLoadMap.value[index] = Object.assign({}, switchLoadMap.value[index], {
      loading: false,
    });
    return;
  }

  // 修改用户状态
  const result = await emailUsersStore.updateEmailUserStatus({ id: row.id, isDefault: row.isDefault });
  if (!result) {
    row.isDefault = !row.isDefault;
    switchLoadMap.value[index] = Object.assign({}, switchLoadMap.value[index], {
      loading: false,
    });
    return;
  }

  await onSearch();
  switchLoadMap.value[index] = Object.assign({}, switchLoadMap.value[index], {
    loading: false,
  });
};
