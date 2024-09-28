import editForm from '../form.vue';
import { handleTree } from '@/utils/tree';
import { message } from '@/utils/message';
import { getMenuList } from '@/api/v1/system';
import { $t } from '@/plugins/i18n';
import { addDialog } from '@/components/BaseDialog';
import { h, reactive, ref } from 'vue';
import type { FormItemProps } from '../utils/types';

import { cloneDeep, deviceDetection, isAllEmpty } from '@pureadmin/utils';

export const form = reactive({
	title: '',
});
export const formRef = ref();
export const dataList = ref([]);
export const loading = ref(true);
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

export const handleSelectionChange = val => {
	console.log('handleSelectionChange', val);
};

export const resetForm = async formEl => {
	if (!formEl) return;
	formEl.resetFields();
	await onSearch();
};

export async function onSearch() {
	loading.value = true;

	// 获取菜单数据
	const result = await getMenuList();
	if (result.code !== 200) message(result.message, { type: 'error' });

	// 前端搜索菜单名称
	if (!isAllEmpty(form.title)) {
		result.data = result.data.filter(item => $t(item.title).includes(form.title));
	}

	// 处理成树结构
	dataList.value = handleTree(result.data);

	loading.value = false;
}

export function formatHigherMenuOptions(treeList) {
	if (!treeList || !treeList.length) return;
	const newTreeList = [];
	for (let i = 0; i < treeList.length; i++) {
		treeList[i].title = $t(treeList[i].title);
		formatHigherMenuOptions(treeList[i].children);
		newTreeList.push(treeList[i]);
	}
	return newTreeList;
}

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
			const FormRef = formRef.value.getRef();
			const curData = options.props.formInline as FormItemProps;

			FormRef.validate(async valid => {
				if (valid) {
					console.log('curData', curData);

					// 表单规则校验通过
					if (title === '新增') {
						// 实际开发先调用新增接口，再进行下面操作
						message(`您${title}了菜单名称为${$t(curData.title)}的这条数据`, {
							type: 'success',
						});
						done(); // 关闭弹框
						await onSearch(); // 刷新表格数据
					} else {
						// 实际开发先调用修改接口，再进行下面操作
						message(`您${title}了菜单名称为${$t(curData.title)}的这条数据`, {
							type: 'success',
						});
						done(); // 关闭弹框
						await onSearch(); // 刷新表格数据
					}
				}
			});
		},
	});
}

export const handleDelete = async row => {
	message(`您删除了菜单名称为${$t(row.title)}的这条数据`, {
		type: 'success',
	});
	await onSearch();
};
