export const auth = {
	// 更新操作
	update: ['files::updateFiles'],
	// 添加操作
	add: ['files::addFiles'],
	// 分页查询
	search: ['files::getFilesList'],
	// 删除操作
	deleted: ['files::deleteFiles'],
	// 上传
	upload: ['files::upload'],
	// 下载文件
	downloadFilesByFileId: ['files::downloadFilesByFileId'],
};
