import { addDialog } from '@/components/ReDialog/index';
import EmailTemplateDialog from '@/views/configuration/email-template/components/email-template-dialog.vue';
import { useEmailTemplateStore } from '@/store/configuration/emailTemplate';
import { h, ref } from 'vue';
import { messageBox } from '@/utils/message';
import type { FormItemProps } from '@/views/configuration/email-template/utils/types';
import { $t } from '@/plugins/i18n';

const emailTemplateStore = useEmailTemplateStore();

// 选择的row列表
export const selectRows = ref([]);

/** 搜索初始化邮件模板表 */
export async function onSearch() {
  emailTemplateStore.loading = true;
  await emailTemplateStore.fetchEmailTemplatePage();
  emailTemplateStore.loading = false;
}

/** 添加邮件模板表 */
export function onAdd() {
  const formRef = ref();

  addDialog({
    title: `${$t('addNew')}${$t('emailTemplate')}`,
    props: {
      formInline: {
        templateName: undefined,
        emailUser: undefined,
        subject: undefined,
        isDefault: false,
        body: undefined,
        type: undefined,
      },
    },
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () =>
      h(EmailTemplateDialog, {
        ref: formRef,
        formInline: {
          templateName: undefined,
          emailUser: undefined,
          subject: undefined,
          isDefault: false,
          body: undefined,
          type: undefined,
        },
      }),
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

/* 更新邮件模板表 */
export function onUpdate(row: any) {
  const formRef = ref();

  addDialog({
    title: `${$t('modify')}${$t('emailTemplate')}`,
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
    contentRenderer: () =>
      h(EmailTemplateDialog, {
        ref: formRef,
        formInline: {
          templateName: row.templateName,
          emailUser: row.emailUser,
          subject: row.subject,
          isDefault: row.isDefault,
          body: row.body,
          type: row.type,
        },
      }),
    beforeSure: (done, { options }) => {
      const form = options.props.formInline as FormItemProps;

      // 验证表单
      formRef.value.formRef.validate(async (valid: any) => {
        if (!valid) return;

        const result = await emailTemplateStore.editEmailTemplate({
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
  await emailTemplateStore.removeEmailTemplate([id]);
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
  const ids = selectRows.value.map((row: any) => row.id);
  await emailTemplateStore.removeEmailTemplate(ids);
  await onSearch();
};
