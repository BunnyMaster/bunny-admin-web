import { http } from '@/api/service/request';
import type { BaseResult, ResultTable } from '@/api/service/types';

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
 * 用户信息---获取用户信息列表
 */
export const fetchGetAdminUserList = (data: any) => {
	return http.request<BaseResult<ResultTable>>('get', `user/getAdminUserList/${data.currentPage}/${data.pageSize}`, { params: data });
};

/**
 * 查询用户
 * @param data
 */
export const fetchQueryUser = (data: any) => {
	return http.request<BaseResult<object>>('get', 'user/queryUser', { params: data });
};

/**
 * 用户信息---添加用户信息
 */
export const fetchAddAdminUser = (data: any) => {
	return http.request<BaseResult<object>>('post', 'user/addAdminUser', { data });
};

/**
 * 用户信息---更新用户信息
 */
export const fetchUpdateAdminUser = (data: any) => {
	return http.request<BaseResult<object>>('put', 'user/updateAdminUser', { data });
};

/**
 * 用户信息---删除用户信息
 */
export const fetchDeleteAdminUser = (data: any) => {
	return http.request<BaseResult<object>>('delete', 'user/deleteAdminUser', { data });
};

/**
 * 获取用户信息
 */
export const fetchGetUserinfoById = (data?: object) => {
	return http.request<BaseResult<UserResult>>('get', 'user/getUserinfoById', { params: data });
};

/** 修改用户状态 */
export const fetchUpdateUserStatusByAdmin = (data?: object) => {
	return http.request<BaseResult<UserResult>>('put', 'user/updateUserStatusByAdmin', { data });
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
