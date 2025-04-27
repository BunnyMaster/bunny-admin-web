import { defineStore } from 'pinia';
import { pageSizes } from '@/enums/baseConstant';
import { storeMessage } from '@/utils/message';
import { storePagination } from '@/store/useStorePagination';
import {
  createUserByAdmin,
  deleteUserByAdmin,
  forcedOfflineByAdmin,
  getUserListByKeyword,
  getUserPageByAdmin,
  updateUserByAdmin,
  updateUserinfo,
  updateUserPassword,
} from '@/api/v1/system/adminUser';

/**
 * 用户信息 Store
 */
export const useAdminUserStore = defineStore('adminUserStore', {
  state() {
    return {
      // 用户信息列表
      datalist: [],
      // 查询表单
      form: {
        // 用户名
        username: undefined,
        // 昵称
        nickname: undefined,
        // 邮箱
        email: undefined,
        // 手机号
        phone: undefined,
        // 性别
        sex: undefined,
        // 个人描述
        summary: undefined,
        // 状态
        status: undefined,
        // 部门Id查询
        deptIds: undefined,
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
    // -----------------------------------------
    // 管理用户CURD
    // -----------------------------------------

    /** 获取用户信息 */
    fetchUserPageByAdmin: async function () {
      // 整理请求参数
      const data = { ...this.pagination, ...this.form };
      delete data.pageSizes;
      delete data.total;
      delete data.background;

      // 获取用户信息列表
      const result = await getUserPageByAdmin(data);

      // 公共页面函数hook
      const pagination = storePagination.bind(this);
      return pagination(result);
    },

    /** 修改用户信息 */
    async updateUserByAdmin(data: any) {
      const result = await updateUserByAdmin(data);
      return storeMessage(result);
    },

    /** 添加用户信息 */
    async addUserByAdmin(data: any) {
      const result = await createUserByAdmin(data);
      return storeMessage(result);
    },

    /** 删除用户信息 */
    async removeUserByAdmin(data: any) {
      const result = await deleteUserByAdmin(data);
      return storeMessage(result);
    },

    /** 强制用户下线 */
    async forcedOffline(data: any) {
      const result = await forcedOfflineByAdmin(data);
      return storeMessage(result);
    },

    /** 查询用户 */
    async queryUser(data: any) {
      const result = await getUserListByKeyword(data);
      if (result.code !== 200) return [];
      return result.data;
    },

    // -----------------------------------------
    // 普通用户
    // -----------------------------------------

    /** 修改本地用户信息 */
    async editUserinfo(data: any) {
      const result = await updateUserinfo(data);
      return storeMessage(result);
    },

    /** 更新本地用户密码 */
    async editUserPassword(data: any) {
      const result: any = await updateUserPassword(data);
      return storeMessage(result);
    },
  },
});
