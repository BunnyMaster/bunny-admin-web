import EditForm from '@/views/system/menu/components/menu-dialog.vue';
import { $t } from '@/plugins/i18n';
import { addDialog, closeAllDialog } from '@/components/ReDialog/index';
import { h, ref } from 'vue';
import type { FormItemProps } from './types';
import { cloneDeep, deviceDetection } from '@pureadmin/utils';
import { userMenuStore } from '@/store/system/menu';
import { messageBox } from '@/utils/message';
import { formatHigherMenuOptions } from '@/views/system/menu/utils/modules/columns';
import { ElText } from 'element-plus';

const menuStore = userMenuStore();

// 选择多行
export const selectIds = ref([]);
export const tableRef = ref();
const dialogFormRef = ref();

/** 获取菜单数据 */
async function onSearch() {
  menuStore.loading = true;
  await menuStore.loadRouterList();
  menuStore.loading = false;
}

/** 添加菜单 */
function onAdd(parentId: any = 0) {
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
        id: '',
        extraIcon: '',
        enterTransition: 'fade-transform',
        leaveTransition: 'fade-transform',
        activePath: '',
        redirect: '',
        roles: [],
        frameSrc: '',
        frameLoading: true,
        keepAlive: false,
        hiddenTag: false,
        fixedTag: false,
        showLink: true,
        showParent: true,
      },
    },
    width: '45%',
    draggable: true,
    closeOnClickModal: false,
    fullscreenIcon: true,
    contentRenderer: () => h(EditForm, { ref: dialogFormRef }),
    beforeSure: (done, { options }) => {
      const menuFormRef = dialogFormRef.value.menuFormRef;
      const curData = options.props.formInline as FormItemProps;
      menuFormRef.validate(async (valid: any) => {
        if (!valid) return;
        delete curData.higherMenuOptions;

        const data = mergeArgs(curData);
        const result = await menuStore.addRouter(data);
        // 刷新表格数据
        if (result) {
          done();
          await onSearch();
        }
      });
    },
  });
}

/* 更新菜单 */
function onUpdate(row?: FormItemProps) {
  addDialog({
    title: $t('update') + $t('menu'),
    props: {
      formInline: {
        id: row?.id,
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
        extraIcon: row?.extraIcon,
        // 因为要使用动画需要在前面加上 animate__ 修改时需要手动去除
        enterTransition: row?.enterTransition?.replace('animate__', ''),
        // 因为要使用动画需要在前面加上 animate__ 修改时需要手动去除
        leaveTransition: row?.leaveTransition?.replace('animate__', ''),
        activePath: row?.activePath,
        frameLoading: row?.frameLoading,
        keepAlive: row?.keepAlive,
        hiddenTag: row?.hiddenTag,
        fixedTag: row?.fixedTag,
        showLink: row?.showLink,
        showParent: row?.showParent,
        redirect: row?.redirect,
      },
    },
    width: '45%',
    draggable: true,
    fullscreen: deviceDetection(),
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(EditForm, { ref: dialogFormRef }),
    beforeSure: (done, { options }) => {
      const menuFormRef = dialogFormRef.value.menuFormRef;
      const curData = options.props.formInline as FormItemProps;
      delete curData.higherMenuOptions;

      // 表单验证
      menuFormRef.validate(async (valid: any) => {
        if (!valid) return;
        curData.parentId = curData.parentId ?? 0;
        curData.id = row.id;

        // 整理后端需要的参数
        const data = mergeArgs(curData);
        const result = await menuStore.editRouter(data);

        // 刷新表格数据
        if (result) {
          done();
          await onSearch();
        }
      });
    },
  });
}

/* 删除菜单 */
async function onDelete(row: any) {
  // 是否确认删除
  const result = await messageBox({
    title: $t('confirmDelete'),
    showMessage: false,
    confirmMessage: undefined,
    cancelMessage: $t('confirmDelete'),
  });
  if (!result) return;

  await menuStore.removeRouterByIds([row.id]);
  await onSearch();
}

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

        draggable: true,
        closeOnClickModal: false,
        fullscreenIcon: true,
        contentRenderer: () => <ElText type={'danger'}>{$t('clearAllRolesSelectTip')}</ElText>,
        beforeSure: async () => {
          // 清除所有角色
          const result = await menuStore.clearSelectRouterRole(selectIds.value);

          // 更新成功关闭弹窗
          if (!result) return;
          clearSelection();
          closeAllDialog();
        },
      });
    },
  });
};

/* 更新是整理后端参数 */
export const mergeArgs = (curData: any) => {
  // 判断 入场 和 离场动画是否添加
  const enterTransition = curData.enterTransition;
  const leaveTransition = curData.leaveTransition;

  let transition = { enterTransition: '', leaveTransition: '' };

  transition.enterTransition = enterTransition ? `animate__${enterTransition}` : '';
  transition.leaveTransition = leaveTransition ? `animate__${leaveTransition}` : '';

  // 整理参数返回后端
  return {
    id: curData.id,
    parentId: curData.parentId,
    path: curData.path,
    routeName: curData.name,
    redirect: curData.redirect,
    component: curData.component,
    menuType: curData.menuType ?? 0,
    meta: {
      title: curData.title,
      icon: curData.icon,
      showLink: curData.showLink,
      showParent: curData.showParent,
      roles: curData.roles,
      keepAlive: curData.keepAlive,
      frameSrc: curData.frameSrc,
      frameLoading: curData.frameLoading,
      rank: curData.rank,
      hiddenTag: curData.hiddenTag,
      fixedTag: curData.fixedTag,
      activePath: curData.activePath,
      transition,
    },
  };
};

export { onSearch, onAdd, onUpdate, onDelete };
