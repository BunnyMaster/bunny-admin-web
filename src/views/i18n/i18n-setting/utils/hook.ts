import { h, reactive, ref } from 'vue';
import { userI18nStore } from '@/store/i18n/i18n';
import { messageBox } from '@/utils/message';
import { addDialog } from '@/components/BaseDialog/index';
import { deviceDetection } from '@pureadmin/utils';
import I18nDialog from '@/views/i18n/i18n-setting/i18n-dialog.vue';
import type { FormProps } from '@/views/i18n/i18n-setting/utils/types';

export const formRef = ref();
const i18nStore = userI18nStore();
const ids = ref<string[]>([]);

// 更新表单数据
export const updateForm = reactive({
	id: '',
	languageId: '',
	keyName: '',
	translate: '',
	parentId: '',
});

/**
 * * 查询内容
 */
export const onSearch = async () => {
	i18nStore.loading = true;
	await i18nStore.getI18nMangeList();
	i18nStore.loading = false;
};

/**
 * * 行内容添加
 * 打开添加弹窗
 */
export const onAdd = () => {
	addDialog({
		title: `添加多语言`,
		width: '30%',
		props: { formInline: { keyName: '', translation: '', typeId: '' } },
		draggable: true,
		fullscreen: deviceDetection(),
		fullscreenIcon: true,
		closeOnClickModal: false,
		contentRenderer: () => h(I18nDialog, { ref: formRef }),
		beforeSure: (done, { options }) => {
			const form = options.props.formInline as FormProps;
			formRef.value.ruleFormRef.validate(async (valid: any) => {
				if (!valid) return;

				const result = await i18nStore.addI18n(form);
				if (!result) return;
				done();
				await onSearch();
			});
		},
	});
};

/**
 * * 当表格修改时
 */
export const onUpdate = (row: any) => {
	const id = row.id;

	addDialog({
		title: `更新多语言`,
		width: '30%',
		props: { formInline: { keyName: row.keyName, translation: row.translation, typeId: row.typeId } },
		draggable: true,
		fullscreen: deviceDetection(),
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

/**
 * * 批量彻底删除行
 */
export const onDelete = async () => {
	const isConfirm = await messageBox({
		message: '是否确认批量删除(此操作不可逆)',
		title: '删除警告',
		showMessage: false,
		confirmMessage: '删除成功',
		cancelMessage: '取消删除',
	});

	if (isConfirm) {
		const data = ids.value;
		await i18nStore.deleteI18n(data);
		await onSearch();
	}
};
