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

// -----------------------------------------
// 管理用户CURD
// -----------------------------------------

/** 用户信息---分页查询用户信息 */
export const getUserPageByAdmin = (data: any) => {
  return http.request<BaseResult<ResultTable>>('get', `user/${data.currentPage}/${data.pageSize}`, {
    params: data,
  });
};

/** 用户信息---添加用户信息 */
export const createUserByAdmin = (data: any) => {
  return http.request<BaseResult<object>>('post', 'user', { data });
};

/** 用户信息---更新用户信息 */
export const updateUserByAdmin = (data: any) => {
  return http.request<BaseResult<object>>('put', 'user', { data }, { headers: { 'Content-Type': 'multipart/form-data' } });
};

/** 用户信息---删除用户信息 */
export const deleteUserByAdmin = (data: any) => {
  return http.request<BaseResult<object>>('delete', 'user', { data });
};

/** 用户管理---根据用户id查询 */
export const loadUserinfoById = (data?: object) => {
  return http.request<BaseResult<UserResult>>('get', 'user/private/getUserinfoById', { params: data });
};

/** 用户信息---根据用户名查询用户列表 */
export const getUserListByKeyword = (data: any) => {
  return http.request<BaseResult<object>>('get', 'user/private/getUserListByKeyword', { params: data });
};

/** 用户管理---强制用户下线 */
export const forcedOfflineByAdmin = (data: any) => {
  return http.request<BaseResult<UserResult>>('put', 'user/forcedOffline', {
    data,
  });
};

// -----------------------------------------
// 普通用户
// -----------------------------------------

/** 登录 */
export const userLogin = (data?: object) => {
  return http.request<BaseResult<UserResult>>('post', '/user/login', { data });
};

/** 刷新`token` */
export const refreshTokenApi = (data?: object) => {
  return http.request<BaseResult<RefreshTokenResult>>('post', 'user/public/refreshToken', { data });
};

/** 发送邮件 */
export const sendLoginEmail = (data: any) => {
  return http.request<BaseResult<any>>('post', '/user/public/sendLoginEmail', { data }, { headers: { 'Content-Type': 'multipart/form-data' } });
};

/** 获取用户信息,根据当前token获取 */
export const getUserinfo = () => {
  return http.request<BaseResult<any>>('get', 'user/private/userinfo');
};

/** 退出账户 */
export const logout = (data?: object) => {
  return http.request<BaseResult<any>>('post', 'user/private/logout', { data });
};

/** 用户信息---更新用户信息 */
export const updateUserinfo = (data: any) => {
  return http.request<BaseResult<object>>('put', 'user/private/update/userinfo', { data });
};

/** 用户信息---更新用户密码 */
export const updateUserPassword = (data: any) => {
  return http.request<BaseResult<object>>('put', 'user/private/update/password', { data }, { headers: { 'Content-Type': 'multipart/form-data' } });
};
