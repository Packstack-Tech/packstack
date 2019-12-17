import { CatLevel } from "../enums";
import { Item, PackItem } from "./item";

export interface Category {
    id: number;
    name: string;
    level: CatLevel;
    exclude_weight: boolean;
}

export interface CategoryItems extends Category {
    items: (Item | PackItem)[];
}

export interface CategoryItemSpecs extends CategoryItems, AggregateWeightProps {
    color: string;
}

export interface WeightProps {
    value: number;
    label: string;
}

export interface AggregateWeightProps {
    included: WeightProps;
    excluded: WeightProps;
    total: WeightProps;
}