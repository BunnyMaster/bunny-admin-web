import { addDialog } from '@/components/BaseDialog/index';
import FilesDialog from '@/views/system/files/files-dialog.vue';
import { useFilesStore } from '@/store/system/files.ts';
import { h, ref } from 'vue';
import { messageBox } from '@/utils/message';
import type { FormItemProps } from '@/views/system/files/utils/types';
import { $t } from '@/plugins/i18n';

export const formRef = ref();
const filesStore = useFilesStore();

/**
 * * 搜索初始化系统文件表
 */
export async function onSearch() {
	filesStore.loading = true;
	await filesStore.getFilesList();
	filesStore.loading = false;
}

/**
 * * 添加系统文件表
 */
export function onAdd() {
	addDialog({
		title: `${$t('add_new')}${$t('files')}`,
		width: '30%',
		props: {
			formInline: {
				filename: undefined,
				filepath: undefined,
				fileType: undefined,
				downloadCount: undefined,
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

				const result = await filesStore.addFiles(form);
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
				filepath: row.filepath,
				fileType: row.fileType,
				downloadCount: row.downloadCount,
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

				const result = await filesStore.updateFiles({ ...form, id: row.id });
				if (!result) return;
				done();
				await onSearch();
			});
		},
	});
}

/**
 * * 删除系统文件表
 */
export const onDelete = async (row: any) => {
	const id = row.id;

	// 是否确认删除
	const result = await messageBox({
		title: $t('confirm_delete'),
		showMessage: false,
		confirmMessage: undefined,
		cancelMessage: $t('cancel_delete'),
	});
	if (!result) return;

	// 删除数据
	await filesStore.deleteFiles([id]);
	await onSearch();
};
