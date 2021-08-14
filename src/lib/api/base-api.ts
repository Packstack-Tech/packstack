import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { TokenInterface } from 'lib/jwt';
import Api from 'types/api/base';

interface RequestHeaders {
    'Content-Type'?: string;
    Authorization?: string;
}

export default class BaseApi implements Api {
    private jwt: TokenInterface;

    constructor(jwt: TokenInterface) {
        this.jwt = jwt;
    }

    makeDefaultHeaders(): RequestHeaders {
        const headers: RequestHeaders = {
            'Content-Type': 'application/json;charset=UTF-8'
        };
        const jwt = this.jwt.getString();
        if (jwt !== '') {
            headers.Authorization = `Bearer ${jwt}`;
        }
        return headers;
    }

    makeRequestConfig(cfg?: AxiosRequestConfig): AxiosRequestConfig {
        const config: AxiosRequestConfig = cfg || {};
        const headers = config.headers || {};
        const baseURL = process.env.REACT_APP_API_URL;

        const defaultHeaders = this.makeDefaultHeaders();
        return {
            ...config,
            baseURL,
            headers: {
                ...defaultHeaders,
                ...headers
            }
        };
    }

    post<S, T>(url: string, data: S, config?: AxiosRequestConfig): Promise<void | AxiosResponse<T>> {
        return axios.post<T>(url, data, this.makeRequestConfig(config)).catch((err: AxiosError) => {
            if (err.response != null && err.response.status === 401) {
                this.jwt.revokeToken();
                return;
            }
            throw err;
        });
    }

    put<S, T>(url: string, data: S, config?: AxiosRequestConfig): Promise<void | AxiosResponse<T>> {
        return axios.put<T>(url, data, this.makeRequestConfig(config)).catch((err: AxiosError) => {
            if (err.response != null && err.response.status === 401) {
                this.jwt.revokeToken();
                return;
            }
            throw err;
        });
    }

    get<T>(url: string, config?: AxiosRequestConfig): Promise<void | AxiosResponse<T>> {
        return axios.get<T>(url, this.makeRequestConfig(config)).catch((err: AxiosError) => {
            if (err.response != null && err.response.status === 401) {
                this.jwt.revokeToken();
                return;
            }
            throw err;
        });
    }
}