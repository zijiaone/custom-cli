import { request, type RequestConfig } from './axios';

/**
 * HTTP请求方法列表
 * 包含所有常用的HTTP方法
 */
const methodList = ['get', 'post', 'put', 'delete', 'patch', 'head', 'options'] as const;

/**
 * 请求参数类型
 * @template P - 请求参数类型，默认为任意键值对
 */
type RequestParams<P = Record<string, unknown>> = [string, P?, RequestConfig?];

/**
 * HTTP方法类型
 * 定义了HTTP方法函数的类型
 */
type HttpMethod = <T = unknown, P = Record<string, unknown>>(...args: RequestParams<P>) => Promise<T>;

/**
 * HTTP客户端类型
 * 包含request方法和所有HTTP方法
 */
type HttpClient = {
  [K in (typeof methodList)[number]]: HttpMethod;
} & {
  request: <T = unknown>(config: RequestConfig) => Promise<T>;
};

/**
 * 动态创建HTTP请求方法
 * 根据方法列表自动生成对应的请求函数
 */
const http = methodList.reduce(
  (acc, method) => {
    acc[method] = <T = unknown, P = Record<string, unknown>>(...args: RequestParams<P>): Promise<T> => {
      const [url, dataOrParams, config = {}] = args;
      // 根据HTTP方法类型决定参数是放在params还是data中
      const paramKey = ['delete', 'get', 'head', 'options'].includes(method) ? 'params' : 'data';
      const reqConfig: RequestConfig = {
        method: method.toUpperCase(),
        [paramKey]: dataOrParams,
        url,
        ...config,
      };
      return request<T>(reqConfig);
    };
    return acc;
  },
  // 初始对象包含 request 方法
  { request } as HttpClient,
);

export default http;
