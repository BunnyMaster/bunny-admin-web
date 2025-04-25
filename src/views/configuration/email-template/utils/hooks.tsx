import { addDialog } from '@/components/ReDialog/index';
import EmailTemplateDialog from '@/views/configuration/email-template/components/email-template-dialog.vue';
import { useEmailTemplateStore } from '@/store/configuration/emailTemplate';
import { h, ref } from 'vue';
import { message, messageBox } from '@/utils/message';
import type { FormItemProps } from '@/views/configuration/email-template/utils/types';
import { $t } from '@/plugins/i18n';
import DeleteBatchDialog from '@/components/Table/DeleteBatchDialog.vue';

const emailTemplateStore = useEmailTemplateStore();

// 选择的row列表
export const selectRows = ref([]);

/** 搜索初始化邮件模板表 */
export async function onSearch() {
  emailTemplateStore.loading = true;
  await emailTemplateStore.getEmailTemplateList();
  emailTemplateStore.loading = false;
}

/** 添加邮件模板表 */
export function onAdd() {
  const formRef = ref();

  addDialog({
    title: `${$t('addNew')}${$t('emailTemplate')}`,
    width: '30%',
    props: {
      formInline: {
        templateName: undefined,
        emailUser: undefined,
        subject: undefined,
        isDefault: undefined,
        body: undefined,
        type: undefined,
      },
    },
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(EmailTemplateDialog, { ref: formRef }),
    beforeSure: (done, { options }) => {
      const form = options.props.formInline as FormItemProps;
      formRef.value.formRef.validate(async (valid: any) => {
        if (!valid) return;

        const result = await emailTemplateStore.addEmailTemplate(form);
        if (!result) return;
        done();
        await onSearch();
      });
    },
  });
}

/**
 * * 更新邮件模板表
 * @param row
 */
export function onUpdate(row: any) {
  const formRef = ref();

  addDialog({
    title: `${$t('modify')}${$t('emailTemplate')}`,
    width: '30%',
    props: {
      formInline: {
        templateName: row.templateName,
        emailUser: row.emailUser,
        subject: row.subject,
        isDefault: row.isDefault,
        body: row.body,
        type: row.type,
      },
    },
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(EmailTemplateDialog, { ref: formRef }),
    beforeSure: (done, { options }) => {
      const form = options.props.formInline as FormItemProps;

      // 验证表单
      formRef.value.formRef.validate(async (valid: any) => {
        if (!valid) return;

        const result = await emailTemplateStore.updateEmailTemplate({ ...form, id: row.id });
        if (!result) return;
        done();
        await onSearch();
      });
    },
  });
}

/** 删除邮件模板表 */
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
  await emailTemplateStore.deleteEmailTemplate([id]);
  await onSearch();
};

/** 批量删除 */
export const onDeleteBatch = async () => {
  const ids = selectRows.value.map((row: any) => row.id);
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
          await emailTemplateStore.deleteEmailTemplate(ids);
          await onSearch();

          done();
        } else message($t('deleteBatchTip'), { type: 'warning' });
      });
    },
  });
};

/** 查看模板 */
export const viewTemplate = (template: string) => {
  addDialog({
    title: $t('view'),
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => <div v-html={template} />,
  });
};
