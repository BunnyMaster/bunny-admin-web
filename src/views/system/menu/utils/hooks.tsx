import editForm from '../menu-dialog.vue';
import { $t } from '@/plugins/i18n';
import { addDialog, closeAllDialog } from '@/components/BaseDialog/index';
import { h, ref } from 'vue';
import type { FormItemProps } from './types';
import { cloneDeep, deviceDetection } from '@pureadmin/utils';
import { userMenuStore } from '@/store/system/menu';
import AssignRouterToRole from '@/views/system/menu/assign-router-to-role.vue';
import { messageBox } from '@/utils/message';
import { formatHigherMenuOptions } from '@/views/system/menu/utils/columns';
import { ElText } from 'element-plus';

// 用户是否停用加载集合
export const switchLoadMap = ref({});
// 选择多行
export const selectIds = ref([]);
export const tableRef = ref();
const assignRouterToRolesRef = ref();
const dialogFormRef = ref();
const menuStore = userMenuStore();
const routerStore = userMenuStore();

/** 获取菜单数据 */
export const onSearch = async () => {
	menuStore.loading = true;
	await menuStore.getMenuList();
	menuStore.loading = false;
};

/** 添加菜单 */
export function onAdd(parentId: any = 0) {
	addDialog({
		title: $t('addNew') + $t('menu'),
		props: {
			formInline: {
				menuType: 0,
				higherMenuOptions: formatHigherMenuOptions(cloneDeep(menuStore.datalist)),
				parentId,
				title: '',
				name: '',
				path: '',
				component: '',
				rank: 99,
				icon: '',
				frameSrc: '',
				visible: true,
			},
		},
		width: '45%',
		draggable: true,
		closeOnClickModal: false,
		fullscreenIcon: true,
		contentRenderer: () => h(editForm, { ref: dialogFormRef }),
		beforeSure: (done, { options }) => {
			const menuFormRef = dialogFormRef.value.menuFormRef;
			const curData = options.props.formInline as FormItemProps;
			menuFormRef.validate(async (valid: any) => {
				if (!valid) return;
				delete curData.higherMenuOptions;

				const result = await menuStore.addMenu(curData);
				// 刷新表格数据
				if (result) {
					done();
					await onSearch();
				}
			});
		},
	});
}

/**
 * * 更新菜单
 * @param row
 */
export const onUpdate = (row?: FormItemProps) => {
	addDialog({
		title: $t('update') + $t('menu'),
		props: {
			formInline: {
				menuType: row?.menuType,
				higherMenuOptions: formatHigherMenuOptions(cloneDeep(menuStore.datalist)),
				parentId: row?.parentId,
				title: row?.title,
				name: row?.name,
				path: row?.path,
				component: row?.component,
				rank: row?.rank,
				icon: row?.icon,
				frameSrc: row?.frameSrc,
				visible: row.visible,
			},
		},
		width: '45%',
		draggable: true,
		fullscreen: deviceDetection(),
		fullscreenIcon: true,
		closeOnClickModal: false,
		contentRenderer: () => h(editForm, { ref: dialogFormRef }),
		beforeSure: (done, { options }) => {
			const menuFormRef = dialogFormRef.value.menuFormRef;
			const curData = options.props.formInline as FormItemProps;
			delete curData.higherMenuOptions;

			// 表单验证
			menuFormRef.validate(async (valid: any) => {
				if (!valid) return;
				curData.parentId = curData.parentId ?? 0;
				curData.id = row.id;
				const result = await menuStore.updateMenu(curData);

				// 刷新表格数据
				if (result) {
					done();
					await onSearch();
				}
			});
		},
	});
};

/**
 * * 删除菜单
 * @param row
 */
export const onDelete = async row => {
	// 是否确认删除
	const result = await messageBox({
		title: $t('confirmDelete'),
		showMessage: false,
		confirmMessage: undefined,
		cancelMessage: $t('confirmDelete'),
	});
	if (!result) return;

	await menuStore.deletedMenuByIds([row.id]);
	await onSearch();
};

/**
 * * 修改菜单是否显示
 * @param row
 * @param index
 */
export const onchangeVisible = async (row: any, index: number) => {
	// 点击时开始loading加载
	switchLoadMap.value[index] = Object.assign({}, switchLoadMap.value[index], {
		loading: true,
	});

	// 是否确认修改显示状态
	const confirm = await messageBox({
		title: $t('confirm_update_status'),
		showMessage: false,
		confirmMessage: undefined,
		cancelMessage: $t('cancel'),
	});

	// 取消修改
	if (!confirm) {
		row.visible = !row.visible;
		switchLoadMap.value[index] = Object.assign({}, switchLoadMap.value[index], {
			loading: false,
		});
		return;
	}

	// 确认修改
	const data = {
		id: row.id,
		visible: row.visible,
		menuType: row.menuType,
		title: row.title,
		name: row.name,
		path: row.path,
	};
	await routerStore.updateMenu(data);
	await onSearch();

	switchLoadMap.value[index] = Object.assign({}, switchLoadMap.value[index], {
		loading: false,
	});
};

/**
 * * 更新菜单排序
 * @param row
 */
export const onChangeMenuRank = async (row: any) => {
	const data = { id: row.id, rank: row.rank };

	// 是否确认修改显示状态
	const confirm = await messageBox({
		title: $t('confirm_update_sort'),
		showMessage: false,
		confirmMessage: undefined,
		cancelMessage: $t('cancel'),
	});

	// 取消修改
	if (!confirm) return;

	await routerStore.updateMenuByIdWithRank(data);
	await onSearch();
};

/**
 * 为路由分配角色
 * @param row
 */
export const assignRolesToRouter = (row: any) => {
	addDialog({
		title: `${$t('for')} 【${$t(row.title)}】 ${$t('assign_roles')}`,
		width: '45%',
		draggable: true,
		closeOnClickModal: false,
		fullscreenIcon: true,
		contentRenderer: () => <AssignRouterToRole ref={assignRouterToRolesRef} routerId={row.id} />,
		beforeSure: async (done: any) => {
			// 分配用户角色
			const data = { routerIds: [row.id], roleIds: assignRouterToRolesRef.value.assignRoles };
			const result = await menuStore.assignRolesToRouter(data);

			// 更新成功关闭弹窗
			if (!result) return;
			done();
		},
	});
};

/** 批量为路由分配角色 */
export const assignBatchRolesToRouter = () => {
	addDialog({
		title: $t('assignBatchRolesToRouter'),
		width: '45%',
		draggable: true,
		closeOnClickModal: false,
		fullscreenIcon: true,
		// props: { warning: $t('assignBatchRolesToRouterTip') },
		contentRenderer: () => <AssignRouterToRole ref={assignRouterToRolesRef} />,
		beforeSure: async (done: any) => {
			// 表格功能
			const { clearSelection } = tableRef.value.getTableRef();

			// 分配用户角色
			const data = { routerIds: selectIds.value, roleIds: assignRouterToRolesRef.value.assignRoles };
			const result = await menuStore.assignAddBatchRolesToRouter(data);

			// 更新成功关闭弹窗
			if (!result) return;
			clearSelection();
			done();
		},
	});
};

/** 清除选中所以角色 */
export const clearAllRolesSelect = async () => {
	addDialog({
		title: $t('batchUpdates'),
		width: '35%',
		draggable: true,
		closeOnClickModal: false,
		fullscreenIcon: true,
		contentRenderer: () => <ElText type={'danger'}>{$t('clearAllRolesSelectTip')}</ElText>,
		beforeSure: async () => {
			// 表格功能
			const { clearSelection } = tableRef.value.getTableRef();

			addDialog({
				title: $t('doubleCheck'),
				width: '30%',
				draggable: true,
				closeOnClickModal: false,
				fullscreenIcon: true,
				contentRenderer: () => <ElText type={'danger'}>{$t('clearAllRolesSelectTip')}</ElText>,
				beforeSure: async () => {
					// 清除所有角色
					const result = await menuStore.clearAllRolesSelect(selectIds.value);

					// 更新成功关闭弹窗
					if (!result) return;
					clearSelection();
					closeAllDialog();
				},
			});
		},
	});
};
