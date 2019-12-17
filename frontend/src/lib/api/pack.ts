import { AxiosResponse } from "axios";

import Api from 'types/api/base';
import { Create, Delete, Get, Update, PackService, AddItem, RemoveItem, GetUserPacks } from "types/api/pack";
import { Pack as PackPayload, PackOverview } from "types/pack";
import { PackItemAttr } from "types/item";

export default class Pack implements PackService {
    private api: Api;
    private baseUrl = '/pack';

    constructor(baseApi: Api) {
        this.api = baseApi;
    }

    get: Get = (packId: number) => {
        return this.api.get(`${this.baseUrl}/${packId}`)
            .then((resp: AxiosResponse<PackPayload>) => resp.data)
    };

    getUserPacks: GetUserPacks = (userId: number) => {
        return this.api.get(`${this.baseUrl}/user/${userId}`)
            .then((resp: AxiosResponse<PackOverview[]>) => resp.data)
    };

    create: Create = pack => {
        return this.api.post(`${this.baseUrl}`, pack)
            .then((resp: AxiosResponse<PackPayload>) => resp.data)
    };

    update: Update = pack => {
        return this.api.put(`${this.baseUrl}`, pack)
            .then((resp: AxiosResponse<PackPayload>) => resp.data)
    };

    delete: Delete = (packId: number) => {
        return this.api.post(`${this.baseUrl}/delete`, { packId })
            .then((resp: AxiosResponse<number>) => resp.data)
    };

    addItem: AddItem = packItem => {
        return this.api.post(`${this.baseUrl}/add-item`, packItem)
            .then((resp: AxiosResponse<PackItemAttr>) => resp.data);
    };

    removeItem: RemoveItem = (packId: number, itemId: number) => {
        return this.api.post(`${this.baseUrl}/remove-item`, { packId, itemId })
            .then((resp: AxiosResponse<number>) => resp.data)
    };
}