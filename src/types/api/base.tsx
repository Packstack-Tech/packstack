import { AxiosRequestConfig } from 'axios';

interface Api {
    post: (url: string, data: any, config?: AxiosRequestConfig) => Promise<any>;
    put: (url: string, data: any, config?: AxiosRequestConfig) => Promise<any>;
    get: (url: string, config?: AxiosRequestConfig) => Promise<any>;
}

export default Api;