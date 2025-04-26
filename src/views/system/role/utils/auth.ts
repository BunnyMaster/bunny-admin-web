export const auth = {
  // 分页查询
  search: ['role::getRoleList'],
  // 添加操作
  add: ['role::addRole'],
  // 更新操作
  update: ['role::updateRole'],
  // 删除操作
  deleted: ['role::deleteRole'],
  // 为角色分配权限
  assignPowersToRole: ['rolePower::assignPowersToRole'],
  // 下载角色配置
  downloadRole: ['role::downloadRole'],
};
