import { addDialog } from '@/components/BaseDialog/index';
import UserLoginLogDialog from '@/views/monitor/userLoginLog/user-login-log-dialog.vue';
import { useUserLoginLogStore } from '@/store/monitor/userLoginLog';
import { h, ref } from 'vue';
import { messageBox } from '@/utils/message';
import { $t } from '@/plugins/i18n';

export const formRef = ref();
// 删除ids
export const deleteIds = ref([]);
const userLoginLogStore = useUserLoginLogStore();

/**
 * * 搜索初始化用户登录日志
 */
export async function onSearch() {
	userLoginLogStore.loading = true;
	await userLoginLogStore.getUserLoginLogList();
	userLoginLogStore.loading = false;
}

/**
 * * 查看用户登录日志
 * @param row
 */
export function onView(row: any) {
	addDialog({
		title: `${$t('view')}${$t('userLoginLog')}`,
		width: '30%',
		props: {
			formInline: {
				userId: row.userId,
				username: row.username,
				token: row.token,
				ipAddress: row.ipAddress,
				ipRegion: row.ipRegion,
				userAgent: row.userAgent,
				type: row.type,
				xRequestedWith: row.xRequestedWith,
				secChUa: row.secChUa,
				secChUaMobile: row.secChUaMobile,
				secChUaPlatform: row.secChUaPlatform,
			},
		},
		draggable: true,
		fullscreenIcon: true,
		closeOnClickModal: false,
		contentRenderer: () => h(UserLoginLogDialog, { ref: formRef }),
		beforeSure: async done => {
			done();
			await onSearch();
		},
	});
}

/**
 * * 删除用户登录日志
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
	await userLoginLogStore.deleteUserLoginLog([id]);
	await onSearch();
};

/**
 * 批量删除
 */
export const onDeleteBatch = async () => {
	const ids = deleteIds.value;

	// 是否确认删除
	const result = await messageBox({
		title: $t('confirm_delete'),
		showMessage: false,
		confirmMessage: undefined,
		cancelMessage: $t('cancel_delete'),
	});
	if (!result) return;

	// 删除数据
	await userLoginLogStore.deleteUserLoginLog(ids);
	await onSearch();
};