import { addDialog } from '@/components/BaseDialog/index';
import RoleDialog from '@/views/system/role/role-dialog.vue';
import { useRoleStore } from '@/store/system/role';
import { h, ref } from 'vue';
import { messageBox } from '@/utils/message';
import type { FormItemProps } from '@/views/system/role/utils/types';
import { $t } from '@/plugins/i18n';

export const formRef = ref();
const roleStore = useRoleStore();

/**
 * * 搜索初始化角色
 */
export async function onSearch() {
	roleStore.loading = true;
	await roleStore.getRoleList();
	roleStore.loading = false;
}

/**
 * * 添加角色
 */
export function onAdd() {
	addDialog({
		title: `${$t('add_new')}${$t('role')}`,
		width: '30%',
		props: {
			formInline: {
				roleCode: undefined,
				description: undefined,
			},
		},
		draggable: true,
		fullscreenIcon: true,
		closeOnClickModal: false,
		contentRenderer: () => h(RoleDialog, { ref: formRef }),
		beforeSure: (done, { options }) => {
			const form = options.props.formInline as FormItemProps;
			formRef.value.formRef.validate(async (valid: any) => {
				if (!valid) return;

				const result = await roleStore.addRole(form);
				if (!result) return;
				done();
				await onSearch();
			});
		},
	});
}

/**
 * * 更新角色
 * @param row
 */
export function onUpdate(row: any) {
	addDialog({
		title: `${$t('modify')}${$t('role')}`,
		width: '30%',
		props: {
			formInline: {
				roleCode: row.roleCode,
				description: row.description,
			},
		},
		draggable: true,
		fullscreenIcon: true,
		closeOnClickModal: false,
		contentRenderer: () => h(RoleDialog, { ref: formRef }),
		beforeSure: (done, { options }) => {
			const form = options.props.formInline as FormItemProps;
			formRef.value.formRef.validate(async (valid: any) => {
				if (!valid) return;

				const result = await roleStore.updateRole({ ...form, id: row.id });
				if (!result) return;
				done();
				await onSearch();
			});
		},
	});
}

/**
 * * 删除角色
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
	await roleStore.deleteRole([id]);
	await onSearch();
};