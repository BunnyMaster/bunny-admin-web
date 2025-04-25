import { addDialog } from '@/components/ReDialog/index';
import FilesDialog from '@/views/system/files/files-dialog.vue';
import { useFilesStore } from '@/store/monitor/files';
import { h, ref } from 'vue';
import { message, messageBox } from '@/utils/message';
import type { FormItemProps } from '@/views/system/files/utils/types';
import { $t } from '@/plugins/i18n';
import { downloadFilesByFileId } from '@/api/v1/files';
import { download } from '@/utils/sso';
import type { UploadFiles } from 'element-plus';
import DeleteBatchDialog from '@/components/Table/DeleteBatchDialog.vue';

// 选择的row列表
export const selectRows = ref([]);
export const formRef = ref();
const filesStore = useFilesStore();

/** 搜索初始化系统文件 */
export async function onSearch() {
  filesStore.loading = true;
  await filesStore.getFilesList();
  filesStore.loading = false;
}

/** 添加系统文件 */
export function onAdd() {
  addDialog({
    title: `${$t('addNew')}${$t('files')}`,
    width: '30%',
    props: {
      formInline: {
        filepath: undefined,
        downloadCount: 0,
        files: [],
        isAdd: false,
      },
    },
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(FilesDialog, { ref: formRef }),
    beforeSure: (done, { options }) => {
      const form = options.props.formInline as FormItemProps;
      formRef.value.formRef.validate(async (valid: any) => {
        if (!valid) return;

        // 添加文件
        form.files = (form.files as UploadFiles).map((file) => file.raw);
        const data = {
          filepath: form.filepath,
          downloadCount: form.downloadCount,
          files: form.files,
        };
        const result = await filesStore.addFiles(data);

        // 成功后关闭窗口
        if (!result) return;
        done();
        await onSearch();
      });
    },
  });
}

/**
 * * 更新系统文件表
 * @param row
 */
export function onUpdate(row: any) {
  addDialog({
    title: `${$t('modify')}${$t('files')}`,
    width: '30%',
    props: {
      formInline: {
        filename: row.filename,
        fileType: row.fileType,
        filepath: row.filepath,
        downloadCount: row.downloadCount,
        isUpload: true,
      },
    },
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(FilesDialog, { ref: formRef }),
    beforeSure: (done, { options }) => {
      const form = options.props.formInline as FormItemProps;
      formRef.value.formRef.validate(async (valid: any) => {
        if (!valid) return;

        // 判断是否更新了文件
        if (form.files) {
          form.files = (form.files as UploadFiles).map((file) => file.raw);
        }

        // 更新文件
        const result = await filesStore.updateFiles({ ...form, id: row.id });

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
  await filesStore.deleteFiles([id]);
  await onSearch();
};

/** 批量删除 */
export const onDeleteBatch = async () => {
  const ids = selectRows.value.map((row) => row.id);
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
          await filesStore.deleteFiles(ids);
          await onSearch();

          done();
        } else message($t('deleteBatchTip'), { type: 'warning' });
      });
    },
  });
};

/**
 * 下载文件
 * @param row
 */
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
