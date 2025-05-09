import { addDialog, closeDialog } from '@/components/ReDialog/index';
import { $t } from '@/plugins/i18n';
import { userI18nStore } from '@/store/i18n/i18n';
import { messageBox } from '@/utils/message';
import I18nDialog from '@/views/i18n/i18n-setting/components/i18n-dialog.vue';
import type { FormProps } from '@/views/i18n/i18n-setting/utils/types';
import { h, ref } from 'vue';
import I18NUploadDialog from '@/views/i18n/i18n-setting/components/i18n-upload-dialog.vue';

export const formRef = ref();
const i18nStore = userI18nStore();
export const deleteIds = ref([]);

/* 查询内容 */
export const onSearch = async () => {
  i18nStore.loading = true;
  await i18nStore.fetchI18nPage();
  i18nStore.loading = false;
};

/* 下载多语言配置 */
export const downloadI18nSetting = (type: string) => {
  i18nStore.downloadI18nFile({ type });
};

/* 上传多语言配置 */
export const updateI18nSetting = (fileType: string) => {
  const uploadFormRef = ref();
  const form = { type: '', file: undefined, fileType, isAppend: true };

  addDialog({
    title: $t('update_multilingual'),
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    props: { form },
    contentRenderer: () => h(I18NUploadDialog, { ref: uploadFormRef, form }),
    beforeSure: async (done, { options }) => {
      uploadFormRef.value.formRef.validate(async (valid: any) => {
        if (!valid) return;
        const { type, file, fileType } = options.props.form;
        await i18nStore.editI18nByFile({ type, file: file[0].raw, fileType });
        done();
        await onSearch();
      });
    },
  });
};

/* 行内容添加 打开添加弹窗 */
export const onAdd = () => {
  const formInline = { keyName: '', translation: '', typeName: '' };

  addDialog({
    title: $t('addMultilingual'),
    props: { formInline },
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(I18nDialog, { ref: formRef, formInline }),
    footerButtons: [
      {
        label: $t('cancel'),
        text: true,
        bg: true,
        btnClick: ({ dialog: { options, index } }) => {
          closeDialog(options, index);
        },
      },
      {
        label: $t('buttons.pureConfirm'),
        type: 'primary',
        text: true,
        bg: true,
        btnClick: ({ dialog: { options, index } }) => {
          const form = options.props.formInline as FormProps;
          formRef.value.ruleFormRef.validate(async (valid: any) => {
            if (!valid) return;
            const result = await i18nStore.addI18n(form);
            if (!result) return;
            closeDialog(options, index);
            await onSearch();
          });
        },
      },
      {
        label: $t('continue_adding'),
        type: 'success',
        text: true,
        bg: true,
        btnClick: ({ dialog: { options } }) => {
          const form = options.props.formInline as FormProps;
          formRef.value.ruleFormRef.validate(async (valid: any) => {
            if (!valid) return;
            const result = await i18nStore.addI18n(form);
            if (!result) return;
            await onSearch();
          });
        },
      },
    ],
  });
};

/* 当表格修改时 */
export const onUpdate = (row: any) => {
  const id = row.id;
  const formInline = { keyName: row.keyName, translation: row.translation, typeName: row.typeName };
  addDialog({
    title: $t('update_multilingual'),
    props: { formInline },
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(I18nDialog, { ref: formRef, formInline }),
    beforeSure: (done, { options }) => {
      const form = options.props.formInline as FormProps;
      formRef.value.ruleFormRef.validate(async (valid: any) => {
        if (!valid) return;

        const result = await i18nStore.editI18n({ ...form, id });
        if (!result) return;
        done();
        await onSearch();
      });
    },
  });
};

/* 批量彻底删除行 */
export const onDelete = async (row: any) => {
  const isConfirm = await messageBox({
    message: $t('confirmDelete'),
    title: $t('delete_warning'),
    showMessage: false,
    confirmMessage: $t('delete_success'),
    cancelMessage: $t('confirmDelete'),
  });

  if (isConfirm) {
    await i18nStore.removeI18n([row.id]);
    await onSearch();
  }
};

/* 批量删除 */
export const onDeleteBatch = async () => {
  const isConfirm = await messageBox({
    message: $t('confirmDelete'),
    title: $t('delete_warning'),
    showMessage: false,
    confirmMessage: $t('delete_success'),
    cancelMessage: $t('confirmDelete'),
  });

  if (isConfirm) {
    await i18nStore.removeI18n(deleteIds.value);
    await onSearch();
  }
};
