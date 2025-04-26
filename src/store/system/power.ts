import { defineStore } from 'pinia';
import {
  fetchAddPower,
  fetchDeletePower,
  fetchGetAllPowers,
  fetchGetPowerList,
  fetchUpdateBatchByPowerWithParentId,
  fetchUpdatePower,
} from '@/api/v1/system/power';
import { pageSizes } from '@/enums/baseConstant';
import { storeMessage } from '@/utils/message';
import { storePagination } from '@/store/useStorePagination';

/**
 * 权限 Store
 */
export const usePowerStore = defineStore('powerStore', {
  state() {
    return {
      // 权限列表
      datalist: [],
      // 权限树形结构
      allPowerList: [],
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
    async getPowerList() {
      // 整理请求参数
      const data = { ...this.pagination, ...this.form };
      delete data.pageSizes;
      delete data.total;
      delete data.background;

      // 获取权限列表
      const result = await fetchGetPowerList(data);

      // 公共页面函数hook
      const pagination = storePagination.bind(this);
      return pagination(result);
    },

    /** 添加权限 */
    async addPower(data: any) {
      const result = await fetchAddPower(data);
      return storeMessage(result);
    },

    /** 修改权限 */
    async updatePower(data: any) {
      const result = await fetchUpdatePower(data);
      return storeMessage(result);
    },

    /** 批量修改权限父级 */
    async updateBatchByPowerWithParentId(data: any) {
      const result = await fetchUpdateBatchByPowerWithParentId(data);
      return storeMessage(result);
    },

    /** 删除权限 */
    async deletePower(data: any) {
      const result = await fetchDeletePower(data);
      return storeMessage(result);
    },

    /** 获取所有权限 */
    async getAllPowers() {
      const result = await fetchGetAllPowers();
      if (result.code !== 200) return;
      this.allPowerList = result.data;
    },
  },
});
