import { useState, memo } from "react"
import { Tooltip } from "antd"

import { Item as ItemType, ItemKey } from "types/item"

import { Input, SelectCreatable, Select } from "app/components/FormFields"
import { Option } from "app/components/FormFields/types"
import { alertSuccess, alertWarn } from "app/components/Notifications"
import { EditItem } from "app/components/EditItem"
import { DotIcon } from "app/components/Icons"

import { categoryOptions, weightUnitOptions } from "utils/form"
import { categorySelectValue } from "utils/categories"
import { useCategories } from "hooks/useCategories"

import { Grid, PairGrid, NotesIndicator, inlineStyles } from "styles/grid"
import { useUserQuery } from "queries/user"
import { useUpdateItem } from "queries/items"
import { WeightUnit } from "enums"

interface Props {
  item: ItemType
}

// needs some more refactoring to make it less crazy
const Item: React.FC<Props> = ({ item }) => {
  const user = useUserQuery()
  const updateItem = useUpdateItem()
  const [copy, setCopy] = useState<ItemType>(item)
  const [editVisible, setEditVisible] = useState<boolean>(false)
  const categories = useCategories()

  const updateCategory = (id: number) => {
    updateItem.mutate(
      {
        id: item.id,
        name: item.name,
        categoryId: id,
        newCategory: false,
      },
      {
        onSuccess: () => {
          alertSuccess({ message: "Item Updated.", duration: 2 })
          user.refetch()
        },
        onError: () => alertWarn({ message: "Error updating item." }),
      }
    )
  }

  const updateWeightUnit = (weightUnit: WeightUnit) => {
    updateItem.mutate(
      {
        id: item.id,
        name: item.name,
        weight_unit: weightUnit,
        newCategory: false,
      },
      {
        onSuccess: () => {
          alertSuccess({ message: "Item Updated.", duration: 2 })
          user.refetch()
        },
        onError: () => alertWarn({ message: "Error updating item." }),
      }
    )
  }

  function update(key: ItemKey, value: any) {
    setCopy({ ...copy, [key]: value })
  }

  function handleSave(key: ItemKey) {
    if (copy[key] === item[key]) return

    const payload = {
      id: item.id,
      name: copy.name,
      [key]: copy[key],
    }

    updateItem.mutate(
      { ...payload, newCategory: false },
      {
        onSuccess: (newItem) => {
          setCopy(newItem)
          alertSuccess({ message: "Item Updated.", duration: 2 })
        },
        onError: () => alertWarn({ message: "Error updating item." }),
      }
    )
  }

  const categoryValue = categorySelectValue(categories, copy.categoryId)
  const { product_name, name, weight_unit, weight, price, notes } = copy
  return (
    <>
      <Grid>
        <div className="align-center">
          <NotesIndicator className={!!notes ? "active" : ""}>
            <Tooltip
              title={notes || "No notes on this item"}
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
            onBlur={() => handleSave("name")}
            style={inlineStyles}
          />
        </div>
        <Input
          value={product_name || ""}
          placeholder="product name"
          onChange={(v) => update("product_name", v)}
          onBlur={() => handleSave("product_name")}
          style={inlineStyles}
        />
        <div>
          <SelectCreatable
            options={categoryOptions(categories)}
            value={categoryValue}
            onChange={(option: Option<number>) => {
              update("categoryId", option.value)
              updateCategory(option.value)
            }}
            style={inlineStyles}
          />
        </div>
        <PairGrid>
          <Input
            type="number"
            value={weight || ""}
            onBlur={() => handleSave("weight")}
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
            onChange={(option: Option<WeightUnit>) => {
              update("weight_unit", option.value)
              updateWeightUnit(option.value)
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
            onBlur={() => handleSave("price")}
            style={inlineStyles}
          />
        </div>
        <div className="align-right">
          <a onClick={() => setEditVisible(true)}>edit</a>
        </div>
      </Grid>
      <EditItem
        record={copy}
        visible={editVisible}
        onClose={() => setEditVisible(false)}
        onCancel={() => setEditVisible(false)}
      />
    </>
  )
}

export default memo(Item)
