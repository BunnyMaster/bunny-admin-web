export const auth = {
	// 分页查询
	search: ['user::getAdminUserList'],
	// 添加操作
	add: ['user::addAdminUser'],
	// 更新操作
	update: ['user::updateAdminUser'],
	// 删除操作
	deleted: ['user::deleteAdminUser'],
	// 管理员上传为用户修改头像
	uploadAvatarByAdmin: ['user::uploadAvatarByAdmin'],
	// 强制用户下线
	forcedOffline: ['user::forcedOffline'],
	// 修改用户状态：是否禁用
	updateUserStatusByAdmin: ['user::updateUserStatusByAdmin'],
	// 管理员修改密码
	updateUserPasswordByAdmin: ['user::updateUserPasswordByAdmin'],
};
