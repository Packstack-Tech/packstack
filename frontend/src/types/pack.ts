import { DurationUnit, Gender } from "enums";
import { PackItem } from "./item";
import { User } from "./user";

export interface BasePack {
    title: string;
    description?: string;
    duration?: number;
    duration_unit?: DurationUnit;
    temp_range?: string;
    season?: string;
    gender?: Gender;
}

export interface Pack extends BasePack {
    id: number;
    createdAt: string;
    updatedAt: string;
    userId: number;
    items: PackItem[];
    user: Pick<User, | 'id' | 'username'>
}

export type UpdatePack = Omit<BasePack, 'title'> & {
    id: number;
    title?: string;
    items?: PackItem[];
}

export interface CreatePack extends BasePack {
    items: PackItem[];
}

export type PackOverview = Omit<Pack, 'items'> & {
    itemCount: number;
}
