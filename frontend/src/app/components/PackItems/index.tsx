import * as React from 'react';
import { Icon, Tooltip } from 'antd';

import { WeightUnit } from "enums";
import { PackItem } from "types/item";

import { MessageArea } from "app/components/MessageArea";

import Item from './Item';

import { getCategories } from "lib/utils/categories";
import { getWeightByCategory } from "lib/utils/weight";
import { helpIconStyles } from "styles/common";

import { CategoryGroup } from "styles/common";
import ExpandablePanel from '../ExpandablePanel';

interface PackItemProps {
    items: PackItem[];
    weightUnit: WeightUnit;
    removeItem: (id: number) => void;
    updateItem: (id: number, field: string, value: string | number | boolean) => void;
}

const PackItems: React.FC<PackItemProps> = ({ items, removeItem, updateItem, weightUnit }) => {
    const [updateId, setUpdateId] = React.useState<number | null>(null);
    const categories = getCategories(items);
    const weightByCategory = getWeightByCategory(weightUnit, items);

    const renderEmptyList = () => (
        <MessageArea>
            Select items from your inventory to begin<br/> building your packing list.
        </MessageArea>
    );

    const update = (id: number, field: string, value: string | number | boolean) => {
        updateItem(id, field, value);
        setUpdateId(id);
    };

    const renderGroupedItems = () => (
        categories.map(cat => {
            const catItems = items.filter(i => i.categoryId === cat.id);
            const catWeight = weightByCategory.find(c => c.id === cat.id);
            const Header = (
                <>
                    <h3>
                        {cat.name}
                        {cat.exclude_weight &&
                        <Tooltip title={"Items in this category are excluded from base weight"}
                                         mouseEnterDelay={.1}>
                            <Icon type="stop-o" style={helpIconStyles}/>
                        </Tooltip>}
                    </h3>
                    <strong>{catWeight!.total.label} {weightUnit}</strong>
                </>
            );
            return (
                <CategoryGroup key={cat.id}>
                    <ExpandablePanel Header={Header}>
                        <div style={{ padding: '0 8px' }}>
                            {catItems.map(item => (
                                <Item key={item.id}
                                      item={item}
                                      updateId={updateId}
                                      removeItem={removeItem}
                                      updateItem={update}/>)
                            )}
                        </div>
                    </ExpandablePanel>
                </CategoryGroup>
            )
        })
    );

    return (
        <div style={{ marginTop: '8px' }}>
            {items.length ? renderGroupedItems() : renderEmptyList()}
        </div>
    )
};

export default PackItems;
