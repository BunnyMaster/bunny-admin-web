import { deviceDetection } from '@pureadmin/utils';
import { addDialog } from '@/components/BaseDialog/index';
import MenuIconDialog from '@/views/system/menuIcon/menu-icon-dialog.vue';
import { useMenuIconStore } from '@/store/system/menuIcon';
import { h, ref } from 'vue';
import { messageBox } from '@/utils/message';
import type { FormItemProps } from '@/views/system/menuIcon/utils/types';
import { $t } from '@/plugins/i18n';

export const formRef = ref();
const menuIconStore = useMenuIconStore();

/**
 * * 搜索初始化系统菜单图标
 */
export async function onSearch() {
	menuIconStore.loading = true;
	await menuIconStore.getMenuIconList();
	menuIconStore.loading = false;
}

/**
 * * 添加${系统菜单图标}
 */
export function onAdd() {
	addDialog({
		title: `${$t('add_new')} ${$t('menuIcon')}`,
		width: '30%',
		props: {
			formInline: {
				iconName: undefined,
			},
		},
		draggable: true,
		fullscreen: deviceDetection(),
		fullscreenIcon: true,
		closeOnClickModal: false,
		contentRenderer: () => h(MenuIconDialog, { ref: formRef }),
		beforeSure: (done, { options }) => {
			const form = options.props.formInline as FormItemProps;
			formRef.value.formRef.validate(async (valid: any) => {
				if (!valid) return;

				const result = await menuIconStore.addMenuIcon(form);
				if (!result) return;
				done();
				await onSearch();
			});
		},
	});
}

/**
 * * 更新系统菜单图标
 * @param row
 */
export function onUpdate(row: any) {
	addDialog({
		title: `${$t('modify')} ${$t('menuIcon')}`,
		width: '30%',
		props: {
			formInline: {
				iconName: row.iconName,
			},
		},
		draggable: true,
		fullscreen: deviceDetection(),
		fullscreenIcon: true,
		closeOnClickModal: false,
		contentRenderer: () => h(MenuIconDialog, { ref: formRef }),
		beforeSure: (done, { options }) => {
			const form = options.props.formInline as FormItemProps;
			formRef.value.formRef.validate(async (valid: any) => {
				if (!valid) return;

				const result = await menuIconStore.updateMenuIcon({ ...form, id: row.id });
				if (!result) return;
				done();
				await onSearch();
			});
		},
	});
}

/**
 * * 删除系统菜单图标
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
	await menuIconStore.deleteMenuIcon([id]);
	await onSearch();
};
