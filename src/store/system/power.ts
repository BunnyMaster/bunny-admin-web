import { defineStore } from 'pinia';
import {
  createPermission,
  deletePermission,
  exportPermission,
  getPermissionList,
  getPermissionPage,
  getSystemApiInfoList,
  importPermission,
  updatePermission,
  updatePermissionBatch,
  updatePermissionListByParentId,
} from '@/api/v1/system/permission';
import { pageSizes } from '@/enums/baseConstant';
import { storeMessage } from '@/utils/message';
import { storePagination } from '@/store/useStorePagination';
import { downloadBlob } from '@/utils/sso';

/**
 * 权限 Store
 */
export const usePermissionStore = defineStore('PermissionStore', {
  state() {
    return {
      // 权限列表
      datalist: [],
      // 权限树形结构
      allPowerList: [],
      // 系统api列表
      systemApiInfoList: [],
      // 查询表单
      form: {
        // 权限编码
        powerCode: undefined,
        // 权限名称
        powerName: undefined,
        // 请求路径
        requestUrl: undefined,
        // 请求方法
        requestMethod: undefined,
      },
      // 分页查询结果
      pagination: {
        currentPage: 1,
        pageSize: 150,
        total: 1,
        pageSizes,
      },
      // 加载
      loading: false,
    };
  },
  getters: {},
  actions: {
    /** 获取权限 */
    async fetchPermissionPage() {
      // 整理请求参数
      const data = { ...this.pagination, ...this.form };
      delete data.pageSizes;
      delete data.total;

      // 获取权限列表
      const result = await getPermissionPage(data);

      // 公共页面函数hook
      const pagination = storePagination.bind(this);
      return pagination(result);
    },

    /** 添加权限 */
    async addPermission(data: any) {
      const result = await createPermission(data);
      return storeMessage(result);
    },

    /** 修改权限 */
    async editPermission(data: any) {
      const result = await updatePermission(data);
      return storeMessage(result);
    },

    /** 删除权限 */
    async removePermission(data: any) {
      const result = await deletePermission(data);
      return storeMessage(result);
    },

    /* 使用Excel导出权限 */
    async downloadPermissionByFile(data: any) {
      const result = await exportPermission(data);

      downloadBlob(result, 'role.zip');
    },

    /* 使用文件导入权限 */
    async uploadPermissionByFile(data: any) {
      const result = await importPermission(data);
      return storeMessage(result);
    },

    /** 获取所有权限 */
    async loadPermissionList() {
      const result = await getPermissionList();
      if (result.code !== 200) return;
      this.allPowerList = result.data;
    },

    /* 获取系统API信息 */
    async loadSystemApiInfoList() {
      const result = await getSystemApiInfoList();
      if (result.code !== 200) return;
      this.systemApiInfoList = result.data;
    },

    /** 批量修改权限父级 */
    async updatePermissionListByParentId(data: any) {
      const result = await updatePermissionListByParentId(data);
      return storeMessage(result);
    },

    /* 批量更新权限 */
    async updatePermissionBatch(data: any) {
      const result = await updatePermissionBatch(data);
      return storeMessage(result);
    },
  },
});
