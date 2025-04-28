import { defineStore } from 'pinia';
import { crateRole, createRolePermission, deleteRole, exportRoleList, getRoleList, getRolePage, updateRole, updateRoleByFile } from '@/api/v1/system/role';
import { pageSizes } from '@/enums/baseConstant';
import { storeMessage } from '@/utils/message';
import { storePagination } from '@/store/useStorePagination';
import { downloadBlob } from '@/utils/sso';

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
    async fetchRolePage() {
      // 整理请求参数
      const data = { ...this.pagination, ...this.form };
      delete data.pageSizes;
      delete data.total;
      delete data.background;

      // 获取角色列表
      const result = await getRolePage(data);

      // 公共页面函数hook
      const pagination = storePagination.bind(this);
      return pagination(result);
    },

    /** 获取所有角色 */
    async loadRoleList() {
      const result = await getRoleList();
      if (result.code !== 200) return;

      this.allRoleList = result.data.map((role) => ({ key: role.id, label: role.description }));
    },

    /** 添加角色 */
    async addRole(data: any) {
      const result = await crateRole(data);
      return storeMessage(result);
    },

    /** 修改角色 */
    async editRole(data: any) {
      const result = await updateRole(data);
      return storeMessage(result);
    },

    /** 删除角色 */
    async removeRole(data: any) {
      const result = await deleteRole(data);
      return storeMessage(result);
    },

    /* 使用Excel导出角色 */
    async downloadRoleByFile() {
      const result = await exportRoleList();

      downloadBlob(result, 'role.zip');
    },

    /* 使用Excel更新角色列表 */
    async editRoleByFile(data: any) {
      const result = await updateRoleByFile(data);
      return storeMessage(result);
    },

    /** 为角色分配权限 */
    async addRolePermission(data: any) {
      const result = await createRolePermission(data);
      return storeMessage(result);
    },
  },
});
