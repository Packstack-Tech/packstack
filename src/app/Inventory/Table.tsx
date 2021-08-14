import * as React from "react";

import { Category } from "types/category";
import { Item as ItemType } from "types/item";
import { Update } from "types/api/item";

import Item from "./Item";
import ExpandablePanel from "../components/ExpandablePanel";

interface TableProps {
  category: Category;
  items: ItemType[];
  fetchItems: () => void;
  updateItem: Update;
}

const Table: React.FC<TableProps> = ({
  category,
  items,
  updateItem,
  fetchItems,
}) => {
  const itemList = items.map((item) => (
    <Item
      item={item}
      key={item.id}
      updateItem={updateItem}
      fetchItems={fetchItems}
    />
  ));

  const Header = <h3>{category.name}</h3>;

  return (
    <div key={category.id} style={{ marginBottom: "24px" }}>
      <ExpandablePanel Header={Header}>{itemList}</ExpandablePanel>
    </div>
  );
};

export default Table;
