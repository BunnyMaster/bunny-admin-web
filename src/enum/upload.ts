// 系统枚举变量
export enum SystemEnum {
	IMAGE_SIZE = 5 * 1024 * 1024,
	FILE_SIZE = 10 * 1024 * 1024,
	IMAGE_MESSAGE = '文件不能大于5M',
	FILE_MESSAGE = '文件不能大于10M',
	// Base64
	Base64 = 'data:text/plain;base64,',
}

/**
 *
 */
export enum UploadFileEnum {
	Favicon = 'favicon',
	Avatar = 'avatar',
	Article = 'article',
	Carousel = 'carousel',
	Feedback = 'feedback',
	ArticleCovers = 'articleCovers',
	ArticleAttachment = 'articleAttachment',
}
