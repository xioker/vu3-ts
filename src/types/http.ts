// 响应类型
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';

// http方法接收参数对象
export interface IHttp<T = any> {
  url: string,
  data?: T,
  headers?: any,
  responseType?: ResponseType
}