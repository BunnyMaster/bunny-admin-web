import { ref } from 'vue';

// 0普通登录，1邮箱登录，其中0为普通登录
export const currentPage = ref('default');

/** 返回到默认登录页面 */
export const onBack = () => {
  currentPage.value = 'default';
};
