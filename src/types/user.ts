import { WeightUnit } from "../enums";
import { Category } from "./category";

export interface User {
    id: number;
    username: string;
    default_weight_unit: WeightUnit;
    bio?: string;
    avatar_url?: string;
    website_url?: string;
    facebook_url?: string;
    twitter_url?: string;
    instagram_url?: string;
    settings?: object;
    categories: Category[];
    createdAt: string;
    updatedAt: string;
}