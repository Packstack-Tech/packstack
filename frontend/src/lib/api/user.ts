import { AxiosResponse } from "axios";

import Api from 'types/api/base';
import { WeightUnit } from "enums";
import { RequestReset, ResetPassword, UserService } from 'types/api/user';
import { Login, Register, Status, AuthToken, Update } from 'types/api/user';
import { User as UserInfo } from 'types/user';

export default class User implements UserService {
    private api: Api;
    private baseUrl = '';

    constructor(baseApi: Api) {
        this.api = baseApi;
    }

    status: Status = () => {
        return this.api.get(`${this.baseUrl}/status`)
            .then((resp: AxiosResponse<UserInfo>) => resp.data);
    };

    login: Login = (username: string, password: string) => {
        return this.api.post(`${this.baseUrl}/login`, { username, password })
            .then((resp: AxiosResponse<AuthToken>) => resp.data);
    };

    update: Update = (username: string, default_weight_unit: WeightUnit | string) => {
        return this.api.put(`${this.baseUrl}/user`, { username, default_weight_unit })
            .then((resp: AxiosResponse<UserInfo>) => resp.data);
    };

    register: Register = (username: string, password: string, email: string) => {
        return this.api.post(`${this.baseUrl}/register`, { username, password, email })
            .then((resp: AxiosResponse<AuthToken>) => resp.data);
    };

    requestReset: RequestReset = email => {
        return this.api.post(`${this.baseUrl}/request-reset`, { email })
            .then((resp: AxiosResponse<null>) => resp.data);
    };

    resetPassword: ResetPassword = (callbackId: string, password: string) => {
        return this.api.post(`${this.baseUrl}/reset-password`, { callbackId, password })
            .then((resp: AxiosResponse<null>) => resp.data);
    }
}