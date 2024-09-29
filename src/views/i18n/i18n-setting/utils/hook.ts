import { reactive, ref } from 'vue';
import { userI18nStore } from '@/store/i18n/i18n';
import { messageBox } from '@/utils/message';

export const addDialogVisible = ref(false);
export const updateDialogVisible = ref(false);

const i18nStore = userI18nStore();
// 更新表单数据
export const updateForm = reactive({
	id: '',
	languageId: '',
	keyName: '',
	translate: '',
	parentId: '',
});
// 彻底删除 id列表
const ids = ref<string[]>([]);

/**
 * * 查询内容
 */
export const getI18nDataList = async () => {
	i18nStore.loading = true;
	await i18nStore.getI18nMangeList();
	i18nStore.loading = false;
};

/**
 * * 当前页改变时
 */
export const onCurrentPageChange = async (value: number) => {
	i18nStore.pagination.currentPage = value;
	await getI18nDataList();
};

/**
 * * 当分页发生变化
 * @param value
 */
export const onPageSizeChange = async (value: number) => {
	i18nStore.pagination.pageSize = value;
	await getI18nDataList();
};

/**
 * * 选择框点击的行
 * @param row
 */
export const onSelectionChange = (row: any) => {
	ids.value = row.map((item: any) => item.id);
};

/**
 * * 行内容添加
 * 打开添加弹窗
 */
export const onRowAdd = () => {
	addDialogVisible.value = true;
};

/**
 * * 批量彻底删除行
 */
export const onRowDelete = async () => {
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
		await getI18nDataList();
	}
};
/**
 * * 批量彻底删除行
 */
export const onRowDeleteWithChildren = async () => {
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
		await getI18nDataList();
	}
};

/**
 * * 当表格修改时
 */
export const onUpdate = (row: any) => {
	const data = row.row;

	// 赋值内容
	updateForm.id = data.id;
	updateForm.languageId = data.parentKeyName;
	updateForm.keyName = data.keyName;
	updateForm.translate = data.translate;
	data.parentId != 0 && (updateForm.parentId = data.parentId);

	// 打开弹窗
	updateDialogVisible.value = true;
};

/**
 * * 当删除时
 * @param row
 */
export const onDelete = async (row: any) => {
	const id = row.row.id;
	const form = { id };
	await i18nStore.deleteI18n(form);
	await i18nStore.getI18nMangeList();
};
