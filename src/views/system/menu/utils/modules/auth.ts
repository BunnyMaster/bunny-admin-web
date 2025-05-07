export const auth = {
  // 更新操作
  update: ['router::updateMenu'],
  // 添加操作
  add: ['router::addMenu'],
  // 分页查询
  search: 'router::menuList',
  // 删除操作
  deleted: ['router::deletedMenuByIds'],
  // 为菜单分配角色
  assignRolesToRouter: ['routerRole::assignRolesToRouter'],
  // 批量为菜单添加角色
  assignAddBatchRolesToRouter: ['routerRole::assignAddBatchRolesToRouter'],
  // 清除选中菜单所有角色
  clearAllRolesSelect: ['routerRole::clearAllRolesSelect'],
};
