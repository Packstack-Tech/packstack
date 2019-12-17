import { AxiosResponse } from "axios";

import Api from 'types/api/base';
import { Create, Delete, Get, Update, ItemService, UploadCSV } from "types/api/item";
import { Item as ItemPayload } from "types/item";

export default class Item implements ItemService {
    private api: Api;
    private baseUrl = '/item';

    constructor(baseApi: Api) {
        this.api = baseApi;
    }

    get: Get = (itemId?: number) => {
        return this.api.get(`${this.baseUrl}`, { params: { itemId } })
            .then((resp: AxiosResponse<ItemPayload[]>) => resp.data)
    };

    create: Create = item => {
        return this.api.post(`${this.baseUrl}`, item)
            .then((resp: AxiosResponse<ItemPayload>) => resp.data)
    };

    update: Update = item => {
        return this.api.put(`${this.baseUrl}`, item)
            .then((resp: AxiosResponse<ItemPayload>) => resp.data)
    };

    delete: Delete = (itemId: number) => {
        return this.api.post(`${this.baseUrl}/delete`, { itemId })
            .then((resp: AxiosResponse<number>) => resp.data)
    };

    uploadCSV: UploadCSV = (file: FormData) => {
        return this.api.post(`${this.baseUrl}/upload`,  file,
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            .then((resp: AxiosResponse<ItemPayload[]>) => resp.data)
    }
}