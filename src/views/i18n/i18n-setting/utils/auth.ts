export const auth = {
  // 分页查询
  search: ['i18n::getI18nList'],
  // 添加操作
  add: ['i18n::addI18n'],
  // 更新操作
  update: ['i18n::updateI18n', 'i18n::updateI18nByFile'],
  // 删除操作
  deleted: ['i18n::deleteI18n'],
  // 下载多语言配置
  download: ['i18n::downloadI18n'],
};
