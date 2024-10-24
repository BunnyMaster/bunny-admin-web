import editForm from '../menu-dialog.vue';
import { $t } from '@/plugins/i18n';
import { addDialog } from '@/components/BaseDialog/index';
import { h, ref } from 'vue';
import type { FormItemProps } from './types';
import { cloneDeep, deviceDetection } from '@pureadmin/utils';
import { userMenuStore } from '@/store/system/menu';
import AssignRouterToRole from '@/views/system/menu/assign-router-to-role.vue';
import { messageBox } from '@/utils/message';

// 用户是否停用加载集合
export const switchLoadMap = ref({});
const menuStore = userMenuStore();
const routerStore = userMenuStore();
const assignRouterToRolesRef = ref();
const formRef = ref();

/**
 * 标签栏菜单类型匹配
 * @param type
 * @param text
 */
export const getMenuType = (type: number, text: boolean = false): any => {
	switch (type) {
		case 0:
			return text ? '菜单' : 'primary';
		case 1:
			return text ? 'iframe' : 'warning';
		case 2:
			return text ? '外链' : 'danger';
	}
};

/** 获取菜单数据 */
export const onSearch = async () => {
	menuStore.loading = true;
	await menuStore.getMenuList();
	menuStore.loading = false;
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

/** 添加菜单 */
export function onAdd(parentId: any = 0) {
	addDialog({
		title: `新增菜单`,
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
		contentRenderer: () => h(editForm, { ref: formRef }),
		beforeSure: (done, { options }) => {
			const menuFormRef = formRef.value.menuFormRef;
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
		title: `更新菜单`,
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
		contentRenderer: () => h(editForm, { ref: formRef }),
		beforeSure: (done, { options }) => {
			const menuFormRef = formRef.value.menuFormRef;
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
export const handleDelete = async row => {
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
};

/**
 * 为路由分配角色
 * @param row
 */
export const assignRolesToRouter = (row: any) => {
	addDialog({
		title: `为 ${row.name} 分配角色`,
		width: '45%',
		draggable: true,
		closeOnClickModal: false,
		fullscreenIcon: true,
		contentRenderer: () => <AssignRouterToRole ref={assignRouterToRolesRef} routerId={row.id} />,
		beforeSure: async (done: any) => {
			// 分配用户角色
			const data = { routerId: row.id, roleIds: assignRouterToRolesRef.value.assignRoles };
			const result = await menuStore.assignRolesToRouter(data);

			// 更新成功关闭弹窗
			if (!result) return;
			done();
		},
	});
};
