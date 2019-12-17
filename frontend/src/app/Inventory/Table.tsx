import * as React from 'react';
import { Icon } from "antd";

import { Category } from "types/category";
import { Item as ItemType } from 'types/item';
import { Update } from "types/api/item";

import Item from './Item';
import { SectionHeader } from "styles/common";

interface TableProps {
    category: Category;
    items: ItemType[];
    fetchItems: () => void;
    updateItem: Update;
}

const Table: React.FC<TableProps> = ({ category, items, updateItem, fetchItems }) => {
    const [visible, setVisible] = React.useState<boolean>(true);

    const Caret = () => {
        const type = visible ? 'caret-down' : 'caret-right';
        return <Icon type={type} onClick={() => setVisible(!visible)}/>
    };

    const itemList = items.map(item =>
        <Item item={item}
              key={item.id}
              updateItem={updateItem}
              fetchItems={fetchItems}/>
    );

    return (
        <div key={category.id} style={{ marginBottom: '24px' }}>
            <SectionHeader>
                <h3>{category.name}</h3>
                {Caret()}
            </SectionHeader>
            <div style={{ display: visible ? 'block' : 'none', padding: '0 8px' }}>
                {itemList}
            </div>
        </div>
    )
};

export default Table;