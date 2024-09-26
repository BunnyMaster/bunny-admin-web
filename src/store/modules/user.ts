import { defineStore } from 'pinia';
import { resetRouter, router, routerArrays, storageLocal, store, type userType } from '../utils';
import { fetchLogin, fetchPostEmailCode, refreshTokenApi, type RefreshTokenResult } from '@/api/v1/user';
import { useMultiTagsStoreHook } from './multiTags';
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
		isRemembered: false,
		// 登录页的免登录存储几天，默认7天
		loginDay: 7,
	}),
	actions: {
		/** 登入 */
		async loginByUsername(data: any) {
			const result = await fetchLogin(data);

			if (result.code === 200) {
				setToken(result.data);
				return true;
			}

			message(result.message, { type: 'error' });
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
			this.username = '';
			this.roles = [];
			this.permissions = [];
			removeToken();
			useMultiTagsStoreHook().handleTags('equal', [...routerArrays]);
			resetRouter();
			await router.push('/login');
		},

		/**
		 * 刷新`token`
		 */
		async handRefreshToken(data) {
			return new Promise<RefreshTokenResult>((resolve, reject) => {
				refreshTokenApi(data)
					.then((data: any) => {
						if (data) {
							setToken(data.data);
							resolve(data);
						}
					})
					.catch(error => {
						reject(error);
					});
			});
		},
	},
});

export function useUserStoreHook() {
	return useUserStore(store);
}
