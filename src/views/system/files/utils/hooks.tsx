import { addDialog } from '@/components/ReDialog/index';
import FilesDialog from '@/views/system/files/components/files-dialog.vue';
import { useFilesStore } from '@/store/system/files';
import { h, ref } from 'vue';
import { messageBox } from '@/utils/message';
import type { FormItemProps } from '@/views/system/files/utils/types';
import { $t } from '@/plugins/i18n';
import { downloadFilesByFileId } from '@/api/v1/files';
import { download } from '@/utils/sso';
import type { UploadFiles } from 'element-plus';

// 选择的row列表
export const selectRows = ref([]);
export const formRef = ref();
const filesStore = useFilesStore();

/** 搜索初始化系统文件 */
export async function onSearch() {
  filesStore.loading = true;
  await filesStore.fetchFilesPage();
  filesStore.loading = false;
}

/** 添加系统文件 */
export function onAdd() {
  addDialog({
    title: `${$t('addNew')}${$t('files')}`,
    props: {
      formInline: {
        filepath: undefined,
        downloadCount: 0,
        // 上传为 files，更新时为 file
        files: [],
        isUpload: false,
      },
    },
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => {
      const dialog = h(FilesDialog, {
        ref: formRef,
        formInline: {
          filepath: undefined,
          downloadCount: 0,
          // 上传为 files，更新时为 file
          files: [],
          isUpload: false,
        },
      });
      formRef.value = dialog;
      return dialog;
    },
    beforeSure: (done, { options }) => {
      const form = options.props.formInline as FormItemProps;
      formRef.value.formRef.validate(async (valid: any) => {
        if (!valid) return;
        const data = {
          filepath: form.filepath,
          downloadCount: form.downloadCount,
          files: [],
        };

        // 判断是否更新了文件
        if (form.files) {
          data.files = (form.files as UploadFiles).map((file) => file.raw);
        }

        const result = await filesStore.addFiles(data);

        // 成功后关闭窗口
        if (!result) return;
        done();
        await onSearch();
      });
    },
  });
}

/* 更新系统文件表 */
export function onUpdate(row: any) {
  const formInline = {
    filepath: row.filepath,
    downloadCount: row.downloadCount,
    // 上传为 files，更新时为 file
    files: undefined,
    isUpload: true,
  };

  addDialog({
    title: `${$t('modify')}${$t('files')}`,
    props: { formInline },
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => {
      const dialog = h(FilesDialog, { ref: formRef, formInline });
      formRef.value = dialog;
      return dialog;
    },
    beforeSure: (done, { options }) => {
      const form = options.props.formInline as FormItemProps;
      formRef.value.formRef.validate(async (valid: any) => {
        if (!valid) return;

        const data = {
          id: row.id,
          filepath: form.filepath,
          downloadCount: form.downloadCount,
          file: undefined,
          isUpload: true,
        };

        // 判断是否更新了文件
        if (form.files) {
          data.file = (form.files as UploadFiles).map((file) => file.raw)[0];
        }

        // 更新文件
        const result = await filesStore.editFiles(data);

        // 更新完成
        if (!result) return;
        done();
        await onSearch();
      });
    },
  });
}

/** 删除系统文件表 */
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
  await filesStore.removeFiles([id]);
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
  const ids = selectRows.value.map((row) => row.id);
  await filesStore.removeFiles(ids);
  await onSearch();
};

/* 下载文件 */
export const onDownload = async (row: any) => {
  const blob = await downloadFilesByFileId({ id: row.id });

  download(blob, row.filename);
};

/** 批量下载文件 */
export const onDownloadBatch = () => {
  selectRows.value.forEach(async (row) => {
    const blob = await downloadFilesByFileId({ id: row.id });

    download(blob, row.filename);
  });
};
