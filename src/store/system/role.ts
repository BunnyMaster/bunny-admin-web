import { defineStore } from 'pinia';
import {
  fetchAddRole,
  fetchAllRoles,
  fetchAssignPowersToRole,
  fetchDeleteRole,
  fetchGetRoleList,
  fetchUpdateRole,
  fetchUpdateRoleByFile,
} from '@/api/v1/system/role';
import { pageSizes } from '@/enums/baseConstant';
import { storeMessage } from '@/utils/message';
import { storePagination } from '@/store/useStorePagination';

/**
 * 角色 Store
 */
export const useRoleStore = defineStore('roleStore', {
  state() {
    return {
      // 角色列表
      datalist: [],
      // 所有角色列表
      allRoleList: [],
      // 查询表单
      form: {
        // 角色代码
        roleCode: undefined,
        // 描述
        description: undefined,
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
    /** 获取角色 */
    async getRoleList() {
      // 整理请求参数
      const data = { ...this.pagination, ...this.form };
      delete data.pageSizes;
      delete data.total;
      delete data.background;

      // 获取角色列表
      const result = await fetchGetRoleList(data);

      // 公共页面函数hook
      const pagination = storePagination.bind(this);
      return pagination(result);
    },

    /** 获取所有角色 */
    async allRoles() {
      const result = await fetchAllRoles();
      if (result.code !== 200) return;

      this.allRoleList = result.data.map((role) => ({ key: role.id, label: role.description }));
    },

    /** 添加角色 */
    async addRole(data: any) {
      const result = await fetchAddRole(data);
      return storeMessage(result);
    },

    /* 使用Excel更新角色列表 */
    async updateRoleByFile(data: any) {
      const result = await fetchUpdateRoleByFile(data);
      return storeMessage(result);
    },

    /** 为角色分配权限 */
    async assignPowersToRole(data: any) {
      const result = await fetchAssignPowersToRole(data);
      return storeMessage(result);
    },

    /** 修改角色 */
    async updateRole(data: any) {
      const result = await fetchUpdateRole(data);
      return storeMessage(result);
    },

    /** 删除角色 */
    async deleteRole(data: any) {
      const result = await fetchDeleteRole(data);
      return storeMessage(result);
    },
  },
});
