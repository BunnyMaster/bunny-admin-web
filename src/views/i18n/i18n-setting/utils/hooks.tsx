import { addDialog, closeDialog } from '@/components/BaseDialog/index';
import { $t } from '@/plugins/i18n';
import { userI18nStore } from '@/store/i18n/i18n';
import { userI18nTypeStore } from '@/store/i18n/i18nType';
import { message, messageBox } from '@/utils/message';
import I18nDialog from '@/views/i18n/i18n-setting/i18n-dialog.vue';
import type { FormProps } from '@/views/i18n/i18n-setting/utils/types';
import { UploadFilled } from '@element-plus/icons-vue';
import { ElOption, ElSelect, genFileId, type UploadProps, type UploadRawFile } from 'element-plus';
import { done } from 'nprogress';
import { h, reactive, ref } from 'vue';

export const formRef = ref();
const i18nStore = userI18nStore();
const i18nTypeStore = userI18nTypeStore();
export const deleteIds = ref([]);

/* 查询内容 */
export const onSearch = async () => {
	i18nStore.loading = true;
	await i18nStore.getI18nMangeList();
	i18nStore.loading = false;
};

/* 下载多语言配置 */
export const downloadI18nSetting = () => {
	i18nStore.downloadI18nSetting();
};

/* 下载多语言配置 */
export const udateI18nSetting = () => {
	const upload = ref();

	const data = reactive({
		type: undefined,
		file: undefined,
	});

	const handleExceed: UploadProps['onExceed'] = files => {
		console.log(files);
		upload.value!.clearFiles();
		const file = files[0] as UploadRawFile;
		file.uid = genFileId();
		upload.value!.handleStart(file);
	};

	addDialog({
		title: $t('update_multilingual'),
		width: '30%',
		draggable: true,
		fullscreenIcon: true,
		closeOnClickModal: false,
		contentRenderer: () => (
			<>
				<ElSelect placeholder={$t('select') + $t('i18n.typeName')} filterable v-model:modelValue={data.type}>
					{i18nTypeStore.datalist.map(item => (
						<ElOption key={item.id} label={item.typeName} value={item.typeName} />
					))}
				</ElSelect>

				<el-upload ref={upload} auto-upload={false} limit={1} on-exceed={handleExceed} v-model:file-list={data.file} class='w-full mt-2' drag>
					<el-icon class='el-icon--upload'>
						<UploadFilled />
					</el-icon>
					<div class='el-upload__text'>
						<em> {`${$t('drop_file_here')} / ${$t('click_to_upload')}`}</em>
					</div>
				</el-upload>
			</>
		),
		beforeSure: async (_done, {}) => {
			const { type, file } = data;
			if (!type || !file) {
				message('填写必填项', { type: 'warning', duration: 3666 });
				return;
			}

			i18nStore.updateI18nByFile({ type, file: file[0].raw });
			done();
			await onSearch();
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
		props: { formInline: { keyName: row.keyName, translation: row.translation, typeName: row.typeName } },
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
