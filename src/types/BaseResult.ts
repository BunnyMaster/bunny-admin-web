// 基础后端返回内容
export interface BaseResult<T> {
	code: number;
	data: T;
	message: string;
}
