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

/** 登录 */
export const fetchLogin = (data?: object) => {
  return http.request<BaseResult<UserResult>>('post', '/user/login', { data });
};

/** 发送邮件 */
export const fetchPostEmailCode = (data: any) => {
  return http.request<BaseResult<any>>(
    'post',
    '/user/noAuth/sendLoginEmail',
    { data },
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};

/** 刷新`token` */
export const refreshTokenApi = (data?: object) => {
  return http.request<BaseResult<RefreshTokenResult>>('post', 'user/noAuth/refreshToken', { data });
};

/** 退出账户 */
export const fetchLogout = (data?: object) => {
  return http.request<BaseResult<any>>('post', 'user/noManage/logout', { data });
};

/** 获取用户信息,根据当前token获取 */
export const fetchGetUserinfo = () => {
  return http.request<BaseResult<any>>('get', 'user/noManage/getUserinfo');
};

/** 用户信息---获取用户信息列表 */
export const fetchGetAdminUserList = (data: any) => {
  return http.request<BaseResult<ResultTable>>('get', `user/getAdminUserList/${data.currentPage}/${data.pageSize}`, {
    params: data,
  });
};

/** 用户信息---查询用户 */
export const fetchQueryUser = (data: any) => {
  return http.request<BaseResult<object>>('get', 'user/noManage/queryUser', { params: data });
};

/** 用户信息---更新用户信息 */
export const fetchUpdateAdminUser = (data: any) => {
  return http.request<BaseResult<object>>('put', 'user/updateAdminUser', { data });
};

/** 用户信息---更新本地用户信息 */
export const fetchUpdateAdminUserByLocalUser = (data: any) => {
  return http.request<BaseResult<object>>('put', 'user/noManage/updateAdminUserByLocalUser', { data });
};

/** 用户信息---更新本地用户密码 */
export const fetchUpdateUserPasswordByLocalUser = (data: any) => {
  return http.request<BaseResult<object>>(
    'put',
    'user/noManage/updateUserPasswordByLocalUser',
    { data },
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};

/** 用户信息---添加用户信息 */
export const fetchAddAdminUser = (data: any) => {
  return http.request<BaseResult<object>>('post', 'user/addAdminUser', { data });
};

/** 用户信息---删除用户信息 */
export const fetchDeleteAdminUser = (data: any) => {
  return http.request<BaseResult<object>>('delete', 'user/deleteAdminUser', { data });
};

/** 用户管理---获取用户信息 */
export const fetchGetUserinfoById = (data?: object) => {
  return http.request<BaseResult<UserResult>>('get', 'user/getUserinfoById', { params: data });
};

/** 用户管理---修改用户状态 */
export const fetchUpdateUserStatusByAdmin = (data?: object) => {
  return http.request<BaseResult<UserResult>>('put', 'user/updateUserStatusByAdmin', { data });
};

/** 用户管理---管理员修改管理员用户密码 */
export const fetchUpdateUserPasswordByAdmin = (data: any) => {
  return http.request<BaseResult<UserResult>>('put', 'user/updateUserPasswordByAdmin', { data });
};

/** 用户管理---管理员修改管理员用户头像 */
export const fetchUploadAvatarByAdmin = (data: any) => {
  return http.request<BaseResult<UserResult>>(
    'put',
    'user/uploadAvatarByAdmin',
    { data },
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};

/** 用户管理---强制用户下线 */
export const fetchForcedOffline = (data: any) => {
  return http.request<BaseResult<UserResult>>('put', 'user/forcedOffline', { data });
};

/** 用户管理---为用户分配角色 */
export const fetchAssignRolesToUsers = (data: object) => {
  return http.request<BaseResult<any>>('post', 'userRole/assignRolesToUsers', { data });
};
