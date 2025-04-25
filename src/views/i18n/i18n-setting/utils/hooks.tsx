import { addDialog, closeDialog } from '@/components/ReDialog/index';
import { $t } from '@/plugins/i18n';
import { userI18nStore } from '@/store/i18n/i18n';
import { messageBox } from '@/utils/message';
import I18nDialog from '@/views/i18n/i18n-setting/i18n-dialog.vue';
import type { FormProps } from '@/views/i18n/i18n-setting/utils/types';
import { h, ref } from 'vue';
import I18nUseFileUploadDoalog from '@/views/i18n/i18n-setting/i18n-use-file-upload-doalog.vue';

export const formRef = ref();
const i18nStore = userI18nStore();
export const deleteIds = ref([]);

/* 查询内容 */
export const onSearch = async () => {
  i18nStore.loading = true;
  await i18nStore.getI18nMangeList();
  i18nStore.loading = false;
};

/* 下载多语言配置 */
export const downloadI18nSetting = (type: string) => {
  i18nStore.downloadI18nSetting({ type });
};

/* 下载多语言配置 */
export const updateI18nSetting = (fileType: string) => {
  const i18nUseFileUploadRef = ref();

  addDialog({
    title: $t('update_multilingual'),
    width: '30%',
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    props: { form: { type: undefined, file: undefined, fileType } },
    contentRenderer: () => h(I18nUseFileUploadDoalog, { ref: i18nUseFileUploadRef }),
    beforeSure: async (done, { options }) => {
      i18nUseFileUploadRef.value.formRef.validate(async (valid: any) => {
        if (!valid) return;
        const { type, file, fileType } = options.props.form;
        await i18nStore.updateI18nByFile({ type, file: file[0].raw, fileType });
        done();
        await onSearch();
      });
    },
  });
};

/* 行内容添加 打开添加弹窗 */
export const onAdd = () => {
  addDialog({
    title: $t('addMultilingual'),
    width: '30%',
    props: { formInline: { keyName: '', translation: '', typeName: '' } },
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(I18nDialog, { ref: formRef }),
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

  addDialog({
    title: $t('update_multilingual'),
    width: '30%',
    props: {
      formInline: { keyName: row.keyName, translation: row.translation, typeName: row.typeName },
    },
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(I18nDialog, { ref: formRef }),
    beforeSure: (done, { options }) => {
      const form = options.props.formInline as FormProps;
      formRef.value.ruleFormRef.validate(async (valid: any) => {
        if (!valid) return;

        const result = await i18nStore.updateI18n({ ...form, id });
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
    await i18nStore.deleteI18n([row.id]);
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
    await i18nStore.deleteI18n(deleteIds.value);
    await onSearch();
  }
};
