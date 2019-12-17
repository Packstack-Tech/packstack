import { WeightUnit } from "enums";
import { Category } from "./category";

export interface BaseItem {
    name: string;
    categoryId: number;
    product_name?: string;
    weight?: number;
    weight_unit?: WeightUnit;
    product_url?: string;
}

export interface Item extends BaseItem {
    id: number;
    Category: Category;
    createdAt: string;
    updatedAt: string;
}

export type CreateItem = Omit<BaseItem, 'categoryId'> & {
    categoryId?: number;
    newCategory: boolean;
}

export type UpdateItem = Omit<BaseItem, 'categoryId'> & {
    id: number;
    categoryId?: number;
    newCategory: boolean;
}

export interface NewPackItem {
    quantity?: number;
    sort_order?: number;
    worn?: boolean;
    notes?: string;
    itemId: number;
    packId: number;
}

export interface PackItemAttr {
    quantity: number;
    sort_order: number;
    worn: boolean;
    notes: string;
    itemId?: number;
    packId?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface PackItem extends Item {
    packItem: PackItemAttr;
}