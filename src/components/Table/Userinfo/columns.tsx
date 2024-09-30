import { $t } from '@/plugins/i18n';
import UserinfoDialog from '@/components/Table/Userinfo/UserinfoDialog.vue';
import { addDialog } from '@/components/BaseDialog/index'; // 表格列字段

// 表格列字段
export const columns = [
	{ label: $t('id'), prop: 'id' },
	{ label: $t('avatar'), prop: 'avatar', slot: 'avatar' },
	{ label: $t('nickName'), prop: 'nickName' },
	{ label: $t('username'), prop: 'username' },
	{ label: $t('email'), prop: 'email', width: 180 },
	{ label: $t('phone'), prop: 'phone', width: 180 },
	{ label: $t('sex'), prop: 'sex' },
	{ label: $t('personDescription'), prop: 'personDescription', width: 180 },
	{ label: $t('table.createTime'), prop: 'createTime', width: '160' },
	{ label: $t('table.updateTime'), prop: 'updateTime', width: '160' },
];

/**
 * * 查看用户信息
 * @param userId
 */
export const selectUserinfo = async (userId: string) => {
	addDialog({
		title: '查看用户信息',
		draggable: true,
		contentRenderer: (): JSX.Element => <UserinfoDialog userId={userId} />,
	});
};
