import converter from 'convert-units';

import { WeightUnit } from 'enums';
import { PackItem, Item } from 'types/item';
import { CategoryItemSpecs, AggregateWeightProps, WeightProps } from "types/category";

import { getItemsByCategory } from "./categories";
import { colors } from "app/components/CategoryChart/colors";

const unitDict = {
    [WeightUnit.OUNCES]: 'oz',
    [WeightUnit.POUNDS]: 'lb',
    [WeightUnit.GRAMS]: 'g',
    [WeightUnit.KILOGRAMS]: 'kg'
};

export const getTotalWeight = (unit: WeightUnit, items: (PackItem | Item)[]): AggregateWeightProps => {
    function reducer(acc: { include: number, exclude: number }, item: PackItem | Item) {
        const isWorn = 'packItem' in item ? item.packItem.worn : false;
        const quantity = 'packItem' in item ? item.packItem.quantity : 1;
        const { weight, weight_unit, Category } = item;

        // no weight unit specified
        if (!weight_unit) return acc;

        const conversionValue = converter(weight).from(unitDict[weight_unit]).to(unitDict[unit]);
        const convertedWeight = parseFloat(conversionValue);

        if (Category.exclude_weight) {
             return { ...acc, exclude: acc.exclude + convertedWeight * quantity };
        }

        if (isWorn) {
            return { ...acc, include: acc.include + convertedWeight * (quantity - 1), exclude: acc.exclude + convertedWeight };
        }

        return { ...acc, include: acc.include + convertedWeight * quantity };
    }

    const { include, exclude } = items.reduce(reducer, { include: 0, exclude: 0 });
    const total = include + exclude;

    return {
        included: {
            value: include,
            label: include.toFixed(2)
        },
        excluded: {
            value: exclude,
            label: exclude.toFixed(2)
        },
        total: {
            value: total,
            label: total.toFixed(2)
        }
    }
};

export const getItemWeight = (unit: WeightUnit, item: PackItem | Item): WeightProps => {
    const { weight, weight_unit } = item;
    const quantity = 'packItem' in item ? item.packItem.quantity : 1;
    const conversionValue = weight_unit ? converter(weight).from(unitDict[weight_unit]).to(unitDict[unit]) : 0;
    const floatValue = parseFloat(conversionValue) * quantity;

    return {
        value: floatValue,
        label: floatValue.toFixed(2)
    }
};

export const getWeightByCategory = (unit: WeightUnit, items: (PackItem | Item)[]): CategoryItemSpecs[] => {
    const itemsByCategory = getItemsByCategory(items);
    return itemsByCategory.map((category, i) => {
        const weightSpecs = getTotalWeight(unit, category.items);
        return {
            ...category,
            ...weightSpecs,
            color: colors[i]
        }
    }).sort((a, b) => b.total.value - a.total.value);
};
