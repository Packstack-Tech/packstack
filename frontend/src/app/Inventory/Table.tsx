import * as React from 'react';
import { Icon, Tooltip } from 'antd';

import { Category } from "types/category";
import { Item as ItemType } from 'types/item';
import { Update } from "types/api/item";

import Item from './Item';
import ExpandablePanel from "../components/ExpandablePanel";
import { helpIconStyles } from "styles/common";

interface TableProps {
    category: Category;
    items: ItemType[];
    fetchItems: () => void;
    updateItem: Update;
}

const Table: React.FC<TableProps> = ({ category, items, updateItem, fetchItems }) => {
    const itemList = items.map(item =>
        <Item item={item}
              key={item.id}
              updateItem={updateItem}
              fetchItems={fetchItems}/>
    );

    function setHeader(category: Category): JSX.Element {
        if (category.exclude_weight) {
            return <h3> {category.name}
                <Tooltip title={"Items in this category will be excluded from base weight"}
                                 mouseEnterDelay={.1}>
                    <Icon type="stop-o" style={helpIconStyles}/>
                </Tooltip>
            </h3>;
        }
        return <h3>{category.name}</h3>
    }

    return (
        <div key={category.id} style={{ marginBottom: '24px' }}>
            <ExpandablePanel Header={setHeader(category)}>
                {itemList}
            </ExpandablePanel>
        </div>
    )
};

export default Table;
