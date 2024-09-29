import editForm from '../form.vue';
import { handleTree } from '@/utils/tree';
import { message } from '@/utils/message';
import { getMenuList } from '@/api/v1/system';
import { $t } from '@/plugins/i18n';
import { addDialog } from '@/components/BaseDialog';
import { h, reactive, ref } from 'vue';
import type { FormItemProps } from '../utils/types';

import { cloneDeep, deviceDetection, isAllEmpty } from '@pureadmin/utils';
import { userRouterStore } from '@/store/modules/router';

const routerStore = userRouterStore();
export const form = reactive({
	title: '',
});
export const formRef = ref();
export const dataList = ref([]);
export const loading = ref(true);

/**
 * 标签栏菜单类型匹配
 * @param type
 * @param text
 */
export const getMenuType = (type, text = false) => {
	switch (type) {
		case 0:
			return text ? '菜单' : 'primary';
		case 1:
			return text ? 'iframe' : 'warning';
		case 2:
			return text ? '外链' : 'danger';
	}
};

/**
 * 表格选择
 * @param val
 */
export const handleSelectionChange = val => {
	console.log('handleSelectionChange', val);
};

/**
 * 表单重置
 * @param formEl
 */
export const resetForm = async formEl => {
	if (!formEl) return;
	formEl.resetFields();
	await onSearch();
};

export const onSearch = async () => {
	loading.value = true;

	// 获取菜单数据
	const result: any = await getMenuList();
	if (result.code !== 200) message(result.message, { type: 'error' });

	// 前端搜索菜单名称
	if (!isAllEmpty(form.title)) {
		result.data = result.data.filter(item => $t(item.title).includes(form.title));
	}

	// 处理成树结构
	dataList.value = handleTree(result.data);

	loading.value = false;
};

export const formatHigherMenuOptions = (treeList: any) => {
	if (!treeList || !treeList.length) return;
	const newTreeList = [];
	for (let i = 0; i < treeList.length; i++) {
		treeList[i].title = $t(treeList[i].title);
		formatHigherMenuOptions(treeList[i].children);
		newTreeList.push(treeList[i]);
	}
	return newTreeList;
};

export function openDialog(title = '新增', row?: FormItemProps) {
	addDialog({
		title: `${title}菜单`,
		props: {
			formInline: {
				menuType: row?.menuType ?? 0,
				higherMenuOptions: formatHigherMenuOptions(cloneDeep(dataList.value)),
				parentId: row?.parentId ?? 0,
				title: row?.title ?? '',
				name: row?.name ?? '',
				path: row?.path ?? '',
				component: row?.component ?? '',
				rank: row?.rank ?? 99,
				redirect: row?.redirect ?? '',
				icon: row?.icon ?? '',
				enterTransition: row?.enterTransition ?? '',
				leaveTransition: row?.leaveTransition ?? '',
				frameSrc: row?.frameSrc ?? '',
				frameLoading: row?.frameLoading ?? true,
				keepAlive: row?.keepAlive ?? false,
				hiddenTag: row?.hiddenTag ?? false,
				fixedTag: row?.fixedTag ?? false,
				showLink: row?.showLink ?? true,
				showParent: row?.showParent ?? false,
			},
		},
		width: '45%',
		draggable: true,
		fullscreen: deviceDetection(),
		fullscreenIcon: true,
		closeOnClickModal: false,
		contentRenderer: () => h(editForm, { ref: formRef, formInline: null }),
		beforeSure: (done, { options }) => {
			const FormRef = formRef.value.menuFormRef;
			const curData = options.props.formInline as FormItemProps;
			FormRef.validate(async (valid: any) => {
				if (valid) {
					delete curData.higherMenuOptions;

					let result = false;
					if (title === '新增') {
						result = await routerStore.addMenu(curData);
					} else {
						curData.id = row.id;
						result = await routerStore.updateMenu(curData);
					}

					// 刷新表格数据
					if (result) {
						done();
						await onSearch();
					}
				}
			});
		},
	});
}

/**
 * * 删除菜单
 * @param row
 */
export const handleDelete = async row => {
	await routerStore.deletedMenuByIds([row.id]);
	await onSearch();
};
