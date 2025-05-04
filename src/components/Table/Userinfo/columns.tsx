import { addDialog } from '@/components/ReDialog/index';
import UserinfoDialog from '@/components/Table/Userinfo/UserinfoDialog.vue';
import { $t } from '@/plugins/i18n';

/**
 * * 查看用户信息
 * @param userId
 */
export const selectUserinfo = async (userId: string) => {
  addDialog({
    title: $t('view_user_info'),
    draggable: true,
    contentRenderer: (): JSX.Element => <UserinfoDialog userId={userId} />,
  });
};
