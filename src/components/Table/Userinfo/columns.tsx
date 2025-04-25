import UserinfoDialog from '@/components/Table/Userinfo/UserinfoDialog.vue';
import { addDialog } from '@/components/ReDialog/index';

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
