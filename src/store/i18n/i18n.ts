// import { fetchGetI18n } from '@/api/mock/i18n';
import { defineStore } from "pinia";
import { fetchGetI18n } from "@/api/v1/i18n";
import type { I18nState } from "@/types/store/i18n";

export const userI18nStore = defineStore("i18nStore", {
  persist: true,
  state(): I18nState {
    return {
      // ? 多语言内容
      i18n: {}
    };
  },
  getters: {},
  actions: {
    /**
     * * 获取多语言
     */
    async fetchI18n() {
      const result = await fetchGetI18n();

      if (result.code === 200) {
        localStorage.removeItem("i18nStore");
        // 当前的返回参数
        const data = result.data;
        // 将返回对象中key设置name，后端不好设置
        for (let key in data) if (key !== "local") data[key].name = key;

        // 赋值返回参数
        this.i18n = data;
      }
    }
  }
});
