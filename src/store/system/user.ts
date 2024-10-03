import { defineStore } from 'pinia';
import { resetRouter, router, routerArrays, storageLocal, store, type userType } from '../utils';
import { fetchLogin, fetchLogout, fetchPostEmailCode, refreshTokenApi } from '@/api/v1/user';
import { useMultiTagsStoreHook } from '../multiTags';
import { type DataInfo, removeToken, setToken, userKey } from '@/utils/auth';
import { message } from '@/utils/message';

export const useUserStore = defineStore({
	id: 'system-user',
	state: (): userType => ({
		// 头像
		avatar: storageLocal().getItem<DataInfo<number>>(userKey)?.avatar ?? '',
		// 用户名
		username: storageLocal().getItem<DataInfo<number>>(userKey)?.username ?? '',
		// 昵称
		nickname: storageLocal().getItem<DataInfo<number>>(userKey)?.nickname ?? '',
		// 页面级别权限
		roles: storageLocal().getItem<DataInfo<number>>(userKey)?.roles ?? [],
		// 按钮级别权限
		permissions: storageLocal().getItem<DataInfo<number>>(userKey)?.permissions ?? [],
		// 是否勾选了登录页的免登录
		isRemembered: true,
		// 登录页的免登录存储几天，默认7天
		readMeDay: 7,
	}),
	actions: {
		/** 登入 */
		async loginByUsername(data: any) {
			data = this.isRemembered ? { ...data, readMeDay: this.readMeDay } : data;
			const result = await fetchLogin(data);

			if (result.code === 200) {
				setToken(result.data);
				return true;
			}
			return false;
		},

		/**
		 * * 发送邮箱验证码
		 * @param email
		 */
		async postEmailCode(email: string) {
			const response = await fetchPostEmailCode({ email });
			if (response.code === 200) {
				message(response.message, { type: 'success' });
				return true;
			}
			message(response.message, { type: 'error' });

			return false;
		},

		/**
		 * 前端登出（不调用接口）
		 */
		async logOut() {
			// 登出
			const result = await fetchLogout();
			if (result.code == 200) {
				this.username = '';
				this.roles = [];
				this.permissions = [];
				removeToken();
				useMultiTagsStoreHook().handleTags('equal', [...routerArrays]);
				resetRouter();
				message(result.message, { type: 'success' });
				await router.push('/login');
				return true;
			}

			message(result.message, { type: 'error' });
		},

		/**
		 * 刷新`token`
		 */
		async handRefreshToken(data: any) {
			const result = await refreshTokenApi({ ...data, readMeDay: this.readMeDay });
			if (result.code === 200) {
				setToken(data.data);
				return true;
			}
			message(result.message, { type: 'error' });
			return false;
		},
	},
});

export function useUserStoreHook() {
	return useUserStore(store);
}
