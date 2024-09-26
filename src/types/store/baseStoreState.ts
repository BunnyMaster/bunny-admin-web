// 返回响应内容
export interface Result<T> {
  code: number;
  data: T;
  message: string;
}
