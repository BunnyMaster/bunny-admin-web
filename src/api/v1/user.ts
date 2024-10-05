import { http } from '@/api/service/request';
import type { BaseResult } from '@/api/service/types';

export interface UserResult {
	/** 头像 */
	avatar: string;
	/** 用户名 */
	username: string;
	/** 昵称 */
	nickname: string;
	/** 当前登录用户的角色 */
	roles: Array<string>;
	/** 按钮级别权限 */
	permissions: Array<string>;
	/** `token` */
	accessToken: string;
	/** 用于调用刷新`accessToken`的接口时所需的`token` */
	refreshToken: string;
	/** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
	expires: Date;
}

export interface RefreshTokenResult {
	/** `token` */
	accessToken: string;
	/** 用于调用刷新`accessToken`的接口时所需的`token` */
	refreshToken: string;
	/** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
	expires: Date;
}

/**
 * 登录
 */
export const fetchLogin = (data?: object) => {
	return http.request<BaseResult<UserResult>>('post', '/login', { data });
};

/**
 * * 发送邮件
 * @param data
 */
export const fetchPostEmailCode = (data: any) => {
	return http.request<BaseResult<any>>('post', '/user/noAuth/sendLoginEmail', { data }, { headers: { 'Content-Type': 'multipart/form-data' } });
};

/** 刷新`token` */
export const refreshTokenApi = (data?: object) => {
	return http.request<BaseResult<RefreshTokenResult>>('post', 'user/noAuth/refreshToken', { data });
};

/**
 * * 退出内容
 * @param data
 */
export const fetchLogout = (data?: object) => {
	return http.request<BaseResult<any>>('post', 'user/logout', { data });
};

/**
 * 获取用户信息
 */
export const fetchGetUserinfoById = (data?: object) => {
	return http.request<BaseResult<UserResult>>('get', 'user/getUserinfoById', { params: data });
};

/**
 * 管理员修改管理员用户密码
 * @param data
 */
export const fetchUpdateUserPasswordByAdmin = (data: any) => {
	return http.request<BaseResult<UserResult>>('put', 'user/updateUserPasswordByAdmin', { data });
};

/**
 * 管理员修改管理员用户头像
 * @param data
 */
export const fetchUploadAvatarByAdmin = (data: any) => {
	return http.request<BaseResult<UserResult>>('put', 'user/uploadAvatarByAdmin', { data }, { headers: { 'Content-Type': 'multipart/form-data' } });
};

/**
 * 强制用户下线
 * @param data
 */
export const fetchForcedOffline = (data: any) => {
	return http.request<BaseResult<UserResult>>('put', 'user/forcedOffline', { data });
};

/**
 * 为用户分配角色
 * @param data
 */
export const fetchAssignRolesToUsers = (data: object) => {
	return http.request<BaseResult<any>>('post', 'userRole/assignRolesToUsers', { data });
};
