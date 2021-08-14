import * as React from "react";
import { isEqual } from "lodash";
import { Tooltip } from "antd";

import { Item as ItemType } from "types/item";
import { Update } from "types/api/item";

import { AppContext } from "AppContext";
import {
  Input,
  SelectCreatable,
  Select,
} from "app/components/FormFields";
import { Option } from 'app/components/FormFields/types'
import { alertSuccess, alertWarn } from "app/components/Notifications";
import EditItem from "app/components/EditItem";
import { DotIcon } from "app/components/Icons";

import { categoryOptions, weightUnitOptions } from "lib/utils/form";
import { categorySelectValue } from "lib/utils/categories";

import { Grid, PairGrid, NotesIndicator, inlineStyles } from "styles/grid";

interface ItemProps {
  item: ItemType;
  fetchItems: () => void;
  updateItem: Update;
}

const Item: React.FC<ItemProps> = ({ item, updateItem, fetchItems }) => {
  const app = React.useContext(AppContext);
  const firstRender = React.useRef(true);
  const [copy, setCopy] = React.useState<ItemType>(item);
  const [catId, setCatId] = React.useState<number | string>(item.categoryId);
  const [wUnit, setWUnit] = React.useState<any>(item.weight_unit);
  const [editVisible, setEditVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!firstRender.current) {
      handleSave();
    }
    firstRender.current = false;
  }, [catId, wUnit]);

  function update(key: string, value: any) {
    const i = Object.assign({}, { ...copy, [key]: value });
    setCopy(i);
  }

  function handleSave() {
    if (!copy.name || isEqual(copy, item)) return;
    const newCategory = !app.categories
      .map((c) => c.id)
      .includes(copy.categoryId);
    const withDefaults = {
      ...copy,
      price: copy.price || 0,
      weight: copy.weight || 0,
    };
    updateItem({ ...withDefaults, newCategory })
      .then((newItem) => {
        setCopy(newItem);
        alertSuccess({ message: "Item Updated.", duration: 2 });
        if (newCategory) {
          app.fetchUser();
        }
      })
      .catch(() => alertWarn({ message: "Error updating item." }));
  }

  const categoryValue = categorySelectValue(app.categories, copy.categoryId);
  const { product_name, name, weight_unit, weight, price, notes } = copy;
  const hasNotes = notes !== "";
  return (
    <>
      <Grid>
        <div className="align-center">
          <NotesIndicator className={hasNotes ? "active" : ""}>
            <Tooltip
              title={hasNotes ? notes : "No notes on this item"}
              mouseEnterDelay={0.1}
              placement="right"
            >
              <DotIcon />
            </Tooltip>
          </NotesIndicator>
        </div>
        <div>
          <Input
            value={name || ""}
            onChange={(v) => update("name", v)}
            onBlur={handleSave}
            style={inlineStyles}
          />
        </div>
        <Input
          value={product_name || ""}
          placeholder="product name"
          onChange={(v) => update("product_name", v)}
          onBlur={handleSave}
          style={inlineStyles}
        />
        <div>
          <SelectCreatable
            options={categoryOptions(app.categories)}
            value={categoryValue}
            onChange={(option: Option<number>) => {
              update("categoryId", option.value);
              setCatId(option.value);
            }}
            style={inlineStyles}
          />
        </div>
        <PairGrid>
          <Input
            type="number"
            value={weight || ""}
            onBlur={handleSave}
            onChange={(v) => update("weight", v)}
            style={inlineStyles}
          />

          <Select
            options={weightUnitOptions()}
            defaultValue={
              weight_unit && {
                value: weight_unit,
                label: weight_unit,
              }
            }
            onChange={(option: Option<string>) => {
              update("weight_unit", option.value);
              setWUnit(option.value);
            }}
            style={inlineStyles}
          />
        </PairGrid>
        <div style={{ display: "flex", alignItems: "center" }}>
          $
          <Input
            value={price || ""}
            placeholder="price"
            onChange={(v) => update("price", v)}
            onBlur={handleSave}
            style={inlineStyles}
          />
        </div>
        <div className="align-right">
          <a onClick={() => setEditVisible(true)}>edit</a>
        </div>
      </Grid>
      <EditItem
        record={copy}
        title={copy.name}
        visible={editVisible}
        updateItem={update}
        fetchItems={fetchItems}
        categoryValue={categoryValue}
        categories={app.categories}
        onClose={() => setEditVisible(false)}
        onOk={() => {
          setEditVisible(false);
          handleSave();
        }}
        onCancel={() => setEditVisible(false)}
      />
    </>
  );
};

export default React.memo(Item);
