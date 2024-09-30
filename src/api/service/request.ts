import Axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import type { PureHttpError, PureHttpRequestConfig, PureHttpResponse, RequestMethods } from './types';
import NProgress from '@/utils/progress';
import { formatToken, getToken, removeToken } from '@/utils/auth';
import { useUserStoreHook } from '@/store/modules/user';
import { message } from '@/utils/message';
import { router } from '@/store/utils';
import { defaultConfig, whiteList } from '@/api/service/config';

class PureHttp {
	/** `token`过期后，暂存待执行的请求 */
	private static requests = [];
	/** 防止重复刷新`token` */
	private static isRefreshing = false;
	/** 初始化配置对象 */
	private static initConfig: PureHttpRequestConfig = {};
	/** 保存当前`Axios`实例对象 */
	private static axiosInstance: AxiosInstance = Axios.create(defaultConfig);

	constructor() {
		this.httpInterceptorsRequest();
		this.httpInterceptorsResponse();
	}

	/** 重连原始请求 */
	private static retryOriginalRequest(config: PureHttpRequestConfig) {
		return new Promise(resolve => {
			PureHttp.requests.push((token: string) => {
				config.headers['token'] = formatToken(token);
				resolve(config);
			});
		});
	}

	/** 通用请求工具函数 */
	public request<T>(method: RequestMethods, url: string, param?: AxiosRequestConfig, axiosConfig?: PureHttpRequestConfig): Promise<T> {
		const config = { method, url, ...param, ...axiosConfig } as PureHttpRequestConfig;

		// 单独处理自定义请求/响应回调
		return new Promise((resolve, reject) => {
			PureHttp.axiosInstance
				.request(config)
				.then((response: undefined) => {
					resolve(response);
				})
				.catch(error => {
					reject(error);
				});
		});
	}

	/** 单独抽离的`post`工具函数 */
	public post<T, P>(url: string, params?: AxiosRequestConfig<P>, config?: PureHttpRequestConfig): Promise<T> {
		return this.request<T>('post', url, params, config);
	}

	/** 单独抽离的`get`工具函数 */
	public get<T, P>(url: string, params?: AxiosRequestConfig<P>, config?: PureHttpRequestConfig): Promise<T> {
		return this.request<T>('get', url, params, config);
	}

	/** 请求拦截 */
	private httpInterceptorsRequest(): void {
		PureHttp.axiosInstance.interceptors.request.use(
			async (config: PureHttpRequestConfig): Promise<any> => {
				// 开启进度条动画
				NProgress.start();
				// 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
				if (typeof config.beforeRequestCallback === 'function') {
					config.beforeRequestCallback(config);
					return config;
				}
				if (PureHttp.initConfig.beforeRequestCallback) {
					PureHttp.initConfig.beforeRequestCallback(config);
					return config;
				}
				/** 请求白名单，放置一些不需要`token`的接口（通过设置请求白名单，防止`token`过期后再请求造成的死循环问题） */
				return whiteList.some(url => config.url.endsWith(url))
					? config
					: new Promise(resolve => {
							const data = getToken();
							// 存在token
							if (data) {
								const now = new Date().getTime();
								const expired = parseInt(data.expires) - now <= 0;
								if (expired) {
									if (!PureHttp.isRefreshing) {
										PureHttp.isRefreshing = true;
										// token过期刷新
										useUserStoreHook()
											.handRefreshToken({ refreshToken: data.refreshToken })
											.then((res: any) => {
												// 从结果中获取token
												const token = res.data.token;
												config.headers['token'] = formatToken(token);
												PureHttp.requests.forEach(cb => cb(token));
												PureHttp.requests = [];
											})
											.finally(() => {
												PureHttp.isRefreshing = false;
											});
									}
									resolve(PureHttp.retryOriginalRequest(config));
								} else {
									config.headers['token'] = formatToken(data.token);
									resolve(config);
								}
							} else {
								resolve(config);
							}
						});
			},
			error => error,
		);
	}

	/** 响应拦截 */
	private httpInterceptorsResponse(): void {
		const instance = PureHttp.axiosInstance;
		instance.interceptors.response.use(
			(response: PureHttpResponse) => {
				const $config = response.config;
				const data = response.data;

				// 关闭进度条动画
				NProgress.done();

				// 登录过期，和异常处理
				if (data.code === 208) {
					message(data.message, { type: 'warning' });
					router.push('/').then();
					removeToken();
				} else if (data.code >= 201 && data.code < 300) {
					message(data.message, { type: 'warning' });
				} else if (data.code > 300) {
					message(data.message, { type: 'error' });
				}

				// 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
				if (typeof $config.beforeResponseCallback === 'function') {
					$config.beforeResponseCallback(response);
					return data;
				}

				if (PureHttp.initConfig.beforeResponseCallback) {
					PureHttp.initConfig.beforeResponseCallback(response);
					return data;
				}

				return data;
			},
			(error: PureHttpError) => {
				error.isCancelRequest = Axios.isCancel(error);

				// 关闭进度条动画
				NProgress.done();
				return error;
			},
		);
	}
}

export const http = new PureHttp();
