import { FC } from "react"
import { Formik, FormikProps } from "formik"
import { Button, Col, Modal, Row, Popconfirm } from "antd"
import * as Yup from "yup"

import { WeightUnit } from "enums"
import { Item } from "types/item"

import { alertSuccess, alertWarn } from "app/components/Notifications"
import { Input, Select, SelectCreatable } from "app/components/FormFields"
import { Option } from "app/components/FormFields/types"

import { categorySelectValue } from "utils/categories"
import { categoryOptions, weightUnitOptions } from "utils/form"
import { useDeleteItem, useUpdateItem } from "queries/items"
import { useUserData } from "hooks/useUserData"
import { useCategories } from "hooks/useCategories"

import { ButtonGroup, ModalTitle } from "./styles"
import { useUserQuery } from "queries/user"

interface Props {
  record: Item
  onClose: () => void
  onCancel: () => void
  visible: boolean
}

type FormValues = {
  name: string
  categoryId: string | number
  product_name: string
  weight: number
  weight_unit: WeightUnit
  price: number
  product_url: string
  notes: string
}

export const EditItem: FC<Props> = ({ onCancel, visible, onClose, record }) => {
  const userQuery = useUserQuery()
  const user = useUserData()
  const categories = useCategories()
  const deleteItem = useDeleteItem()
  const updateItem = useUpdateItem()
  const handleDelete = () => {
    deleteItem.mutate(
      { id: record.id },
      {
        onSuccess: () => onClose(),
      }
    )
  }

  // todo add yup validation
  return (
    <Modal
      title={<ModalTitle>Edit Item</ModalTitle>}
      visible={visible}
      onCancel={onCancel}
      footer={false}
    >
      <Formik
        initialValues={{
          name: record.name,
          categoryId: record.categoryId,
          product_name: record.product_name || "",
          weight: record.weight || 0,
          weight_unit: record.weight_unit || user.default_weight_unit,
          price: record.price || 0,
          product_url: record.product_url || "",
          notes: record.notes || "",
        }}
        onSubmit={(values) => {
          const newCategory = !categories.find(
            (rec) => rec.id === values.categoryId
          )
          updateItem.mutate(
            { id: record.id, newCategory, ...values },
            {
              onSuccess: () => {
                alertSuccess({ message: "Item Updated.", duration: 2 })
                if (newCategory) {
                  userQuery.refetch()
                }
                onClose()
              },
              onError: () => alertWarn({ message: "Error updating item." }),
            }
          )
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .required("Item name is required.")
            .max(200, "200 characters max."),
          product_name: Yup.string().max(500, "500 characters max"),
          notes: Yup.string().max(500, "500 characters max"),
          product_url: Yup.string().max(500, "500 characters max"),
        })}
      >
        {({
          setFieldValue,
          submitForm,
          errors,
          values,
        }: FormikProps<FormValues>) => {
          const categoryValue = categorySelectValue(
            categories,
            values.categoryId
          )
          return (
            <>
              <Input
                label="Item Type"
                placeholder="Backpack, Compass, etc..."
                value={values.name}
                onChange={(v) => setFieldValue("name", v)}
                error={!!errors.name}
                errorMsg={errors.name}
              />

              <SelectCreatable
                label="Category"
                placeholder="Select a category..."
                options={categoryOptions(categories)}
                value={categoryValue}
                clearable={true}
                onChange={(option: Option<number>) =>
                  setFieldValue("categoryId", option.value)
                }
              />

              <Input
                label="Product Name"
                placeholder="Osprey Renn 65"
                value={values.product_name}
                onChange={(v) => setFieldValue("product_name", v)}
                error={!!errors.product_name}
                errorMsg={errors.product_name}
              />

              <Row gutter={8}>
                <Col span={16}>
                  <Input
                    label="Weight"
                    type="number"
                    value={values.weight}
                    onChange={(v) => setFieldValue("weight", v)}
                  />
                </Col>
                <Col span={8}>
                  <Select
                    label="Unit"
                    defaultValue={{
                      value: values.weight_unit,
                      label: values.weight_unit,
                    }}
                    options={weightUnitOptions()}
                    onChange={(option: Option<string>) =>
                      setFieldValue("weight_unit", option.value)
                    }
                  />
                </Col>
              </Row>

              <Input
                label="Price"
                type="number"
                placeholder="0.00"
                value={values.price}
                onChange={(v) => setFieldValue("price", v)}
              />

              <Input
                label="Product URL"
                placeholder="https://osprey.com"
                type="url"
                value={values.product_url}
                onChange={(v) => setFieldValue("product_url", v)}
                error={!!errors.product_url}
                errorMsg={errors.product_url}
              />

              <Input
                label="Notes"
                value={values.notes}
                placeholder="Care instructions, further details, etc..."
                onChange={(v) => setFieldValue("notes", v)}
                error={!!errors.notes}
                errorMsg={errors.notes}
                last={true}
              />

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
                  <Button onClick={onCancel} style={{ marginRight: "8px" }}>
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    disabled={updateItem.isLoading || deleteItem.isLoading}
                    htmlType="submit"
                    onClick={submitForm}
                  >
                    Save Changes
                  </Button>
                </div>
              </ButtonGroup>
            </>
          )
        }}
      </Formik>
    </Modal>
  )
}
