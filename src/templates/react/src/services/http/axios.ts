import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';

/**
 * 请求配置类型
 * 扩展自 AxiosRequestConfig，可以添加自定义配置
 */
export type RequestConfig = {} & AxiosRequestConfig;

// 创建 axios 实例
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 1000 * 120, // 超时时间
  withCredentials: true, // 跨域请求时是否需要使用凭证
});

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 处理请求前的逻辑，例如添加认证头
    return config;
  },
  (error: AxiosError) => {
    // 处理请求错误
    console.error('请求配置错误:', error);
    return Promise.reject(error);
  },
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    // 自定义业务状态码处理，根据后端接口规范定义，不同项目可能需要调整
    if (res.code !== 200) {
      // 处理业务逻辑错误
      return Promise.reject(res);
    }
    return res;
  },
  (error: AxiosError) => {
    // 处理HTTP错误
    handleHttpError(error);
    return Promise.reject(error);
  },
);

/**
 * 处理HTTP错误
 * 根据不同的错误类型和状态码返回错误信息
 * @param error Axios错误对象
 */
const handleHttpError = (error: AxiosError) => {
  let message = '网络错误';
  if (error.response) {
    // 服务器返回的错误状态码
    const status = error.response.status;
    switch (status) {
      case 400:
        message = '请求参数错误';
        break;
      case 401:
        message = '未授权，请重新登录';
        // 这里可以添加重定向到登录页的逻辑
        break;
      case 403:
        message = '拒绝访问';
        break;
      case 404:
        message = '请求的资源不存在';
        break;
      case 500:
        message = '服务器内部错误';
        break;
      case 502:
        message = '网关错误';
        break;
      case 503:
        message = '服务不可用';
        break;
      case 504:
        message = '网关超时';
        break;
      default:
        message = `未知错误(${status})`;
    }
  } else if (error.request) {
    // 请求已发出但未收到响应
    message = '服务器未响应，请检查网络连接';
  } else {
    // 请求配置出错
    message = error.message || '请求配置错误';
  }
  // 这里可以集成错误通知系统，如Toast或消息提示
  console.error('请求错误:', message);
};

/**
 * 封装请求方法
 * 统一处理请求配置和错误处理
 * @param config 请求配置
 * @returns Promise<T> 返回请求结果
 */
export const request = <T = unknown>(config: RequestConfig): Promise<T> => {
  return instance<T>(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export default request;
