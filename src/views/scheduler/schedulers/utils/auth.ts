export const auth = {
  // 分页查询
  query: ['schedulers::query'],
  // 添加操作
  add: ['schedulers::add'],
  // 暂停
  pause: ['schedulers::update'],
  // 恢复
  resume: ['schedulers::update'],
  // 删除操作
  delete: ['schedulers::delete'],
};
