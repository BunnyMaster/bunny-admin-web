import {
  fetchAddMenu,
  fetchClearAllRolesSelect,
  fetchDeletedMenuByIds,
  fetchGetRoleListByRouterId,
  fetchMenuList,
  fetchUpdateMenu,
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
    async getMenuList() {
      const result = await fetchMenuList();
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
    async addMenu(data: object) {
      const result = await fetchAddMenu(data);
      return storeMessage(result);
    },

    /** 更新菜单 */
    async updateMenu(data: object) {
      const result = await fetchUpdateMenu(data);
      return storeMessage(result);
    },

    /** 删除菜单 */
    async deletedMenuByIds(data: object) {
      const result = await fetchDeletedMenuByIds(data);
      return storeMessage(result);
    },

    /** 根据路由id获取角色列表 */
    async getRoleListByRouterId(data: any) {
      const result = await fetchGetRoleListByRouterId(data);
      if (result.code !== 200) return;
      return result.data;
    },

    /** 清除选中菜单所有角色 */
    async clearAllRolesSelect(data: any) {
      const result = await fetchClearAllRolesSelect(data);
      return storeMessage(result);
    },
  },
});
