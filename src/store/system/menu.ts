import {
  clearRouterRole,
  createRouter,
  deletedRouterByIds,
  getRoleListByRouterId,
  getRouterList,
  updateRouter,
} from '@/api/v1/menu/menu';
import { $t } from '@/plugins/i18n';
import { storeMessage } from '@/utils/message';
import { handleTree } from '@/utils/tree';
import { isAllEmpty } from '@pureadmin/utils';
import { defineStore } from 'pinia';

export const userMenuStore = defineStore('menuStore', {
  state() {
    return {
      datalist: [],
      form: { title: undefined },
      loading: false,
    };
  },
  getters: {},
  actions: {
    /** 获取菜单列表 */
    async loadRouterList() {
      const result = await getRouterList();
      if (result.code !== 200) return false;

      // 前端搜索菜单名称
      const title = this.form.title;
      let newData: Array<any> = result.data;

      if (!isAllEmpty(title)) {
        newData = newData.filter((item) => $t(item.title).includes(title));
      }
      this.datalist = handleTree(newData);

      return true;
    },

    /** 添加菜单 */
    async addRouter(data: object) {
      const result = await createRouter(data);
      return storeMessage(result);
    },

    /** 更新菜单 */
    async editRouter(data: object) {
      const result = await updateRouter(data);
      return storeMessage(result);
    },

    /** 删除菜单 */
    async removeRouterByIds(data: object) {
      const result = await deletedRouterByIds(data);
      return storeMessage(result);
    },

    /** 根据路由id获取角色列表 */
    async loadRoleListByRouterId(data: any) {
      const result = await getRoleListByRouterId(data);
      if (result.code !== 200) return;
      return result.data;
    },

    /** 清除选中菜单所有角色 */
    async clearSelectRouterRole(data: any) {
      const result = await clearRouterRole(data);
      return storeMessage(result);
    },
  },
});
