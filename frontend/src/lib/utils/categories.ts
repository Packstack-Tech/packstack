import { uniqBy } from 'lodash'

import { Item, PackItem } from "types/item";
import { Category, CategoryItems } from "types/category";
import { Option } from "app/components/FormFields/types";

export const getCategories = (items: (PackItem | Item)[]): Category[] => {
    const categories = items.map(item => item.Category);
    return uniqBy(categories, 'id').sort((a, b) => a.id - b.id);
};

export const getItemsByCategory = (items: (PackItem | Item)[]): CategoryItems[] => {
    const categories = getCategories(items);
    return categories.map(category => {
        const catItems = items.filter(i => i.categoryId === category.id);
        return {
            ...category,
            items: catItems
        }
    });
};

// handles the weirdness between categories with IDs and those without Ids
export const categorySelectValue = (categories: Category[], value: number | string | undefined): Option<any> | undefined => {
    if (!value) return;
    const currentCategory = categories.find(cat => cat.id === value);

    return {
        value: currentCategory ? currentCategory.id : value,
        label: currentCategory ? currentCategory.name : value.toString()
    };
};

export const categoryCheckIfNew = (categories: Category[], value: number | string | undefined): boolean => {
    if (!value) return false;
    return categories.find(cat => cat.id === value) ? false : true;
};
