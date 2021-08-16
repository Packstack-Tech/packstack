import * as React from "react";
import { Menu, Dropdown } from "antd";
import {
  CaretDownFilled,
  CheckCircleFilled,
  PlusOutlined,
} from "@ant-design/icons";

import { Item } from "types/item";
import { Category } from "types/category";

import { getCategories } from "lib/utils/categories";
import { searchItems } from "lib/utils/search";

import { CategoryGroup, InventoryContainer } from "styles/common";
import {
  InventoryItem,
  CategoryLabel,
  ItemContainer,
  CategoryHeader,
} from "./styles";
import { Input } from "../FormFields";
import FloatingActionButton from "../FloatingActionButton";
interface SidebarProps {
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (id: number) => void;
  createNewItem: () => void;
  currentItems: number[];
}

const InventorySidebar: React.FC<SidebarProps> = ({
  items,
  addItem,
  removeItem,
  currentItems,
  createNewItem,
}) => {
  const categories = getCategories(items);
  const [filterText, setFilterText] = React.useState<string>("");
  const [categoryFilter, setCategoryFilter] = React.useState<Category | null>(
    null
  );

  const handleAddItem = (id: number) => {
    const item = items.find((item) => item.id === id);
    if (!item) {
      return;
    }
    addItem(item);
  };

  const renderCategoryItems = (catItems: Item[]) =>
    catItems.map((item) => {
      const { id, name, product_name } = item;
      const isSelected = currentItems.includes(id);

      const handleSelect = () => {
        if (isSelected) {
          removeItem(id);
        } else {
          handleAddItem(id);
        }
      };

      const status = isSelected ? <CheckCircleFilled /> : null;
      return (
        <InventoryItem
          key={id}
          onClick={handleSelect}
          className={isSelected ? "selected" : ""}
        >
          <ItemContainer>
            <div>
              <h5>{name}</h5>
              {product_name && <p>{product_name}</p>}
            </div>
            <div>{status}</div>
          </ItemContainer>
        </InventoryItem>
      );
    });

  const renderInventory = () => {
    const cats = categoryFilter ? [categoryFilter] : categories;
    return cats.map((category) => {
      const categoryItems = items.filter((i) => i.categoryId === category.id);
      const filteredItem = !!filterText
        ? searchItems(categoryItems, filterText)
        : categoryItems;

      if (!filteredItem.length) {
        return null;
      }

      return (
        <CategoryGroup key={category.id}>
          <CategoryHeader>
            <h3>{category.name}</h3>
          </CategoryHeader>
          {renderCategoryItems(filteredItem)}
        </CategoryGroup>
      );
    });
  };

  const categoryMenu = () => {
    const categoryOptions = categories.map((cat) => (
      <Menu.Item key={cat.id} onClick={() => setCategoryFilter(cat)}>
        {cat.name}
      </Menu.Item>
    ));
    return (
      <Menu>
        <Menu.Item key={-1} onClick={() => setCategoryFilter(null)}>
          All Categories
        </Menu.Item>
        {categoryOptions}
      </Menu>
    );
  };

  const filterLabel = categoryFilter ? categoryFilter.name : "All Categories";
  const categoryDropdown = () => (
    <Dropdown overlay={categoryMenu()} trigger={["click"]}>
      <CategoryLabel>
        <div>{filterLabel}</div>
        <CaretDownFilled />
      </CategoryLabel>
    </Dropdown>
  );

  return (
    <>
      <div style={{ padding: "8px 16px" }}>
        {categoryDropdown()}
        <Input
          placeholder="search items..."
          value={filterText}
          onChange={(v) => setFilterText(v.toString())}
          last={true}
        />
      </div>
      <FloatingActionButton
        icon={<PlusOutlined />}
        onClick={createNewItem}
        tooltip="Add a new item to your inventory"
      ></FloatingActionButton>
      <InventoryContainer>{renderInventory()}</InventoryContainer>
    </>
  );
};

function isEqual(prev: SidebarProps, next: SidebarProps) {
  const { currentItems: prevItems, items: prevInventory } = prev;
  const { currentItems: nextItems, items: nextInventory } = next;
  return (
    prevItems.length === nextItems.length &&
    prevInventory.length === nextInventory.length
  );
}

export default React.memo(InventorySidebar, isEqual);
