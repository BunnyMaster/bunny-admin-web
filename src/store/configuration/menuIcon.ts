import { defineStore } from 'pinia';
import { createMenuIcon, deleteMenuIcon, getIconNameListByIconName, getMenuIconPage, updateMenuIcon } from '@/api/v1/menu/menuIcon';
import { pageSizes } from '@/enums/baseConstant';
import { storeMessage } from '@/utils/message';
import { storePagination } from '@/store/useStorePagination';

/**
 * 系统菜单图标 Store
 */
export const useMenuIconStore = defineStore('menuIconStore', {
  state() {
    return {
      // 系统菜单图标列表
      datalist: [],
      // 图标名称列表
      iconNameList: [],
      // 查询表单
      form: {
        // icon 名称
        iconName: undefined,
        // 图标码
        iconCode: undefined,
      },
      // 分页查询结果
      pagination: {
        currentPage: 1,
        pageSize: 30,
        total: 1,
        pageSizes,
      },
      // 加载
      loading: false,
    };
  },
  getters: {},
  actions: {
    /** 获取系统菜单图标 */
    async fetchMenuIconListPage() {
      const data: any = { ...this.pagination, ...this.form };
      delete data.pageSizes;
      delete data.total;
      delete data.background;
      const response = await getMenuIconPage(data);

      // 公共页面函数hook
      const pagination = storePagination.bind(this);
      return pagination(response);
    },

    /** 根据iconName搜索menuIcon */
    async getIconNameListByIconName(data: any) {
      const result = await getIconNameListByIconName(data);
      this.iconNameList = result.data;
    },

    /** 添加系统菜单图标 */
    async addMenuIcon(data: any) {
      const result = await createMenuIcon(data);
      return storeMessage(result);
    },

    /** 修改系统菜单图标 */
    async editMenuIcon(data: any) {
      const result = await updateMenuIcon(data);
      return storeMessage(result);
    },

    /** 删除系统菜单图标 */
    async removeMenuIcon(data: any) {
      const result = await deleteMenuIcon(data);
      return storeMessage(result);
    },
  },
});
