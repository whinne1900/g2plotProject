
import axios from 'axios'
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { AxiosCancel } from "./customAxiosCancel"

interface axiosConfig {
  successMessage?: boolean;  // 是否提示成功信息
  errorMessage?: boolean;    // 是否提示失败信息
  cancelSame?: boolean;      // 是否取消相同接口
  retryCount?: number;       // 失败重试次数
  isRetry?: boolean;         // 是否失败重试
}

const defaultConfig: axiosConfig = {
  successMessage: false,
  errorMessage: true,
  cancelSame: false,
  isRetry: false,
  retryCount: 3
};

const axiosCancel=new AxiosCancel()
let baseURL = ''
if(import.meta.env.MODE === 'development') {
  baseURL ='/api'
} else {
  baseURL = import.meta.env.VITE_BASE_API
}

const service:AxiosInstance = axios.create({
  baseURL:  baseURL,
  timeout: 5000,
  headers: { "Content-Type": "application/json;charset=UTF-8" }
})

// request 拦截器
service.interceptors.request.use(
  (config:AxiosRequestConfig) => {
    // axiosCancel.addPending();
    // 在这里可以设置请求头、请求参数等
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  (response:AxiosResponse) => {
    // axiosCancel.removePending();
    // 在这里处理返回数据
    const { data } = response
    // console.log('axios---response', response)
    if (response.status === 200) {
      return data;
    } else {
      return Promise.reject(data);
    }
  },
  error => {
    console.log("response error", error);
    // axiosCancel.removePending();
    return Promise.reject(error)
  }
)

const request = {
  get<T = any>(url: string, data?: any): Promise<T> {
      return request.request("GET", url, { params: data });
  },
  post<T = any>(url: string, data?: any): Promise<T> {
      return request.request("POST", url, { data });
  },
  put<T = any>(url: string, data?: any): Promise<T> {
      return request.request("PUT", url, { data });
  },
  delete<T = any>(url: string, data?: any): Promise<T> {
      return request.request("DELETE", url, { params: data });
  },
  request<T = any>(method = "GET", url: string, data?: any): Promise<T> {
      return new Promise((resolve, reject) => {
          // showLoading()
          service({ method, url, ...data })
              .then((res) => {
                  // dismissLoading()
                  resolve(res as unknown as Promise<T>);
              })
              .catch((e: Error | AxiosError) => {
                  // dismissLoading()
                  reject(e);
              })
      });
  }
};

export default request;
