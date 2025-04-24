import { defineStore } from 'pinia';
import {
  fetchDeleteUserLoginLog,
  fetchGetUserLoginLogList,
  fetchGetUserLoginLogListByLocalUser,
} from '@/api/v1/log/userLoginLog';
import { pageSizes } from '@/enums/baseConstant';
import { storeMessage } from '@/utils/message';
import { storePagination } from '@/store/useStorePagination';

/**
 * 用户登录日志 Store
 */
export const useUserLoginLogStore = defineStore('userLoginLogStore', {
  state() {
    return {
      // 用户登录日志列表
      datalist: [],
      // 查询表单
      form: {
        // 用户名
        username: undefined,
        // 登录Ip
        ipAddress: undefined,
        // 登录Ip归属地
        ipRegion: undefined,
        // 登录时代理
        userAgent: undefined,
        // 操作类型
        type: undefined,
        // 标识客户端是否是通过Ajax发送请求的
        xRequestedWith: undefined,
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
    /** 获取用户登录日志 */
    async getUserLoginLogList() {
      // 整理请求参数
      const data = { ...this.pagination, ...this.form };
      delete data.pageSizes;
      delete data.total;
      delete data.background;

      // 获取用户登录日志列表
      const result = await fetchGetUserLoginLogList(data);

      // 公共页面函数hook
      const pagination = storePagination.bind(this);
      return pagination(result);
    },

    /** 分页查询根据用户Id用户登录日志内容 */
    async getUserLoginLogListByLocalUser(data: any) {
      const baseResult = await fetchGetUserLoginLogListByLocalUser(data);
      if (baseResult.code === 200) {
        return baseResult.data;
      }
    },

    /** 删除用户登录日志 */
    async deleteUserLoginLog(data: any) {
      const result = await fetchDeleteUserLoginLog(data);
      return storeMessage(result);
    },
  },
});
