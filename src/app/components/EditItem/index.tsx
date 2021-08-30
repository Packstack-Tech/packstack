import * as React from "react"
import { Button, Col, Modal, Row, Popconfirm } from "antd"

import { ItemConstants } from "types/item"
import { Category } from "types/category"
import { Item } from "types/item"

import { Input, Select, SelectCreatable } from "app/components/FormFields"
import { Option } from "app/components/FormFields/types"

import { categoryOptions, weightUnitOptions } from "lib/utils/form"
import { useDeleteItem } from "queries/items"

import { ButtonGroup, ModalTitle } from "./styles"

interface Props {
  record: Item
  updateItem: (key: string, value: any) => void
  categoryValue?: Option<number>
  categories: Category[]
  onClose: () => void
  onCancel: () => void
  visible: boolean
  onOk: () => void
}

export const EditItem: React.FC<Props> = ({
  categoryValue,
  categories,
  updateItem,
  onCancel,
  visible,
  onClose,
  onOk,
  record,
}) => {
  const deleteItem = useDeleteItem()
  const handleDelete = () => {
    deleteItem.mutate(
      { id: record.id },
      {
        onSuccess: () => onClose(),
      }
    )
  }

  const renderFooter = () => (
    <ButtonGroup>
      <div>
        <Popconfirm
          title="Are you sure you want to delete this item?"
          okText="Delete"
          placement="bottom"
          onConfirm={handleDelete}
        >
          <Button type="ghost" danger>
            Delete
          </Button>
        </Popconfirm>
      </div>
      <div>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="primary" onClick={onOk}>
          Save Changes
        </Button>
      </div>
    </ButtonGroup>
  )

  const { product_name, name, weight_unit, weight, price, product_url, notes } =
    record
  return (
    <Modal
      title={<ModalTitle>Edit Item</ModalTitle>}
      visible={visible}
      onCancel={onCancel}
      footer={renderFooter()}
    >
      <Input
        label="Item Type"
        placeholder="Backpack, Compass, etc..."
        value={name}
        onChange={(v) => updateItem("name", v)}
        allowedLength={ItemConstants.name}
      />

      <SelectCreatable
        label="Category"
        placeholder="Select a category..."
        options={categoryOptions(categories)}
        value={categoryValue}
        clearable={true}
        onChange={(option: Option<number>) =>
          updateItem("categoryId", option.value)
        }
      />

      <Input
        label="Product Name"
        placeholder="Osprey Renn 65"
        value={product_name || ""}
        allowedLength={ItemConstants.product_name}
        onChange={(v) => updateItem("product_name", v)}
      />

      <Row gutter={8}>
        <Col span={16}>
          <Input
            label="Weight"
            type="number"
            value={weight || ""}
            onChange={(v) => updateItem("weight", v)}
          />
        </Col>
        <Col span={8}>
          <Select
            label="Unit"
            defaultValue={
              weight_unit && {
                value: weight_unit,
                label: weight_unit,
              }
            }
            options={weightUnitOptions()}
            onChange={(option: Option<string>) =>
              updateItem("weight_unit", option.value)
            }
          />
        </Col>
      </Row>

      <Input
        label="Price"
        type="number"
        placeholder="0.00"
        value={price || ""}
        onChange={(v) => updateItem("price", v)}
      />

      <Input
        label="Product URL"
        placeholder="https://osprey.com"
        type="url"
        value={product_url || ""}
        onChange={(v) => updateItem("product_url", v)}
        allowedLength={ItemConstants.product_url}
      />

      <Input
        label="Notes"
        value={notes || ""}
        placeholder="Care instructions, further details, etc..."
        onChange={(v) => updateItem("notes", v)}
        allowedLength={ItemConstants.notes}
        last={true}
      />
    </Modal>
  )
}
