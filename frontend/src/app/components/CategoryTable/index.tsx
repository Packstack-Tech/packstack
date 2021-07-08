import * as React from 'react';

import { WeightUnit } from "enums";
import { CategoryItemSpecs } from "types/category";

import { Label } from "../FormFields";
import { CatTableWrapper, CatRow } from "./styles";

interface CategoryTableProps {
    data: CategoryItemSpecs[];
    unit: WeightUnit;
}

const CategoryChart: React.FC<CategoryTableProps> = ({ data, unit }) => {
    const Rows = data.map((row: CategoryItemSpecs) => (
        <CatRow key={row.id}>
            <div>
                <span style={{ backgroundColor: row.color }}/>
                {row.name}
            </div>
            <div>{row.total.label} {unit}</div>
        </CatRow>
    ));

    const totalWeight = data.reduce((acc: number, cur: CategoryItemSpecs) => acc + cur.total.value, 0);
    const bigThree = data.filter(({name}) => name === 'Pack' || name === 'Shelter' || name === 'Sleep System');
    const bigThreeWeight = bigThree.reduce((sum, dat) => sum + dat.total.value, 0);
    const excludedWeight = data.reduce((acc: number, cur: CategoryItemSpecs) => acc + cur.excluded.value, 0);
    const consumables = data.find(c => c.name === 'Consumables');
    const customExcludedCategories = data.find(c => c.level === 'USER' && c.exclude_weight === true);
    const customExcludedWeight = customExcludedCategories ? customExcludedCategories.total.value : 0;
    const consumablesWeight = consumables ? consumables.total.value : 0;
    const wornWeight = excludedWeight - consumablesWeight - customExcludedWeight;
    const baseWeight = totalWeight - excludedWeight;

    return (
        <CatTableWrapper>
            <Label style={{ marginBottom: '8px' }}>
                Weight Breakdown
            </Label>
            {Rows}
            <CatRow className="totals highlight">
                <div>Total</div>
                <div>{totalWeight.toFixed(2)} {unit}</div>
            </CatRow>
            <CatRow className="totals">
                <div>Big 3</div>
                <div>{bigThreeWeight.toFixed(2)} {unit}</div>
            </CatRow>
            <CatRow className="totals">
                <div>Consumable</div>
                <div>{consumablesWeight.toFixed(2)} {unit}</div>
            </CatRow>
            <CatRow className="totals">
                <div>Worn</div>
                <div>{wornWeight.toFixed(2)} {unit}</div>
            </CatRow>
            {customExcludedCategories &&
            <CatRow className="totals">
                <div>Other Excluded</div>
                <div>{customExcludedWeight.toFixed(2)} {unit}</div>
            </CatRow>
            }
            <CatRow className="totals highlight">
                <div>Base Weight</div>
                <div>{baseWeight.toFixed(2)} {unit}</div>
            </CatRow>
        </CatTableWrapper>
    )
};

export default React.memo(CategoryChart);
