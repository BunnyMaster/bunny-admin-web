export const auth = {
	// 分页查询
	search: ['power::getPowerList'],
	// 获取所有权限
	getAllPowers: ['power::getAllPowers'],
	// 添加操作
	add: ['power::addPower'],
	// 更新操作
	update: ['power::updatePower'],
	// 批量修改权限父级
	updateBatchByPowerWithParentId: ['power::updateBatchByPowerWithParentId'],
	// 删除操作
	deleted: ['power::deletePower'],
};
