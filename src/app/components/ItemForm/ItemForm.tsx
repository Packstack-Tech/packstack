import { FC, useState } from "react"
import * as Yup from "yup"
import FileDownload from "js-file-download"
import { Formik, FormikProps } from "formik"
import { Row, Col, Button } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import { Input, Select, SelectCreatable } from "../FormFields"
import { Option } from "app/components/FormFields/types"

import { CreateItem, ItemConstants } from "types/item"
import { categoryOptions, weightUnitOptions } from "lib/utils/form"
import { categorySelectValue } from "lib/utils/categories"
import { exportCsv } from "api/api"

import { UploadModal } from "app/Inventory/UploadModal"
import { alertError, alertSuccess } from "../Notifications"

import { SidebarContainer } from "styles/common"
import { OptionsRows } from "./styles"
import { useUserData } from "hooks/useUserData"
import { useCategories } from "hooks/useCategories"
import { useCreateItem } from "queries/items"
import { useUserQuery } from "queries/user"

interface Props {
  onSave?: () => void
}

export const ItemForm: FC<Props> = ({ onSave }) => {
  const user = useUserData()
  const userQuery = useUserQuery()
  const categories = useCategories()
  const createItem = useCreateItem()
  const [uploadVisibility, showUploadModal] = useState<boolean>(false)

  function exportItems() {
    exportCsv().then((data) => FileDownload(data.data, "inventory.csv"))
  }

  return (
    <Formik
      initialValues={{
        name: "",
        categoryId: undefined,
        product_name: "",
        weight: undefined,
        weight_unit: user.default_weight_unit,
        price: undefined,
        product_url: "",
        newCategory: false,
        notes: "",
        manufacturer: "",
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Item name is required"),
        categoryId: Yup.string().required("Category is required"),
      })}
      onSubmit={(values, formikActions) => {
        createItem.mutate(values, {
          onSuccess: () => {
            formikActions.resetForm()
            alertSuccess({ message: "Item added" })

            if (values.newCategory) {
              userQuery.refetch()
            }

            if (onSave) {
              onSave()
            }
          },
          onError: () => {
            alertError({ message: "An error occurred" })
          },
          onSettled: () => {
            formikActions.setSubmitting(false)
          },
        })
      }}
    >
      {(props: FormikProps<CreateItem>) => {
        const {
          values,
          setFieldValue,
          errors,
          submitCount,
          submitForm,
          isSubmitting,
        } = props
        const wasSubmitted = submitCount > 0
        const weightUnit = values.weight_unit
        const categoryValue = categorySelectValue(categories, values.categoryId)

        return (
          <SidebarContainer>
            <Input
              value={values.name}
              label="Item Type"
              error={wasSubmitted && !!errors.name}
              placeholder="Backpack, Compass, etc..."
              onChange={(v) => setFieldValue("name", v)}
              allowedLength={ItemConstants.name}
            />
            <SelectCreatable
              label="Category"
              placeholder="Select a category..."
              options={categoryOptions(categories)}
              value={categoryValue || null}
              onChange={(option: Option<number>) => {
                const isNewCategory = Boolean(option && option.__isNew__);
                setFieldValue("categoryId", option?.value);
                setFieldValue("newCategory", isNewCategory);
              }}
              error={wasSubmitted && !!errors.categoryId}
              errorMsg={errors.categoryId}
              clearable={true}
            />
            <Input
              label="Product Name"
              value={values.product_name || ""}
              placeholder="Renn 65"
              onChange={(v) => setFieldValue("product_name", v)}
              allowedLength={ItemConstants.product_name}
            />
            <Input
              label="Manufacturer"
              value={values.manufacturer || ""}
              placeholder="Osprey"
              onChange={(v) => setFieldValue("manufacturer", v)}
              allowedLength={ItemConstants.manufacturer}
            />
            <Row gutter={8}>
              <Col span={16}>
                <Input
                  value={values.weight || ""}
                  label="Weight"
                  type="number"
                  placeholder="0.0"
                  onChange={(v) => setFieldValue("weight", v)}
                />
              </Col>
              <Col span={8}>
                <Select
                  defaultValue={
                    weightUnit && {
                      value: weightUnit,
                      label: weightUnit,
                    }
                  }
                  label="Unit"
                  tip="Change default weight unit in Settings"
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
              value={values.price || ""}
              placeholder="0.00"
              onChange={(v) => setFieldValue("price", v)}
            />
            <Input
              label="Product URL"
              value={values.product_url || ""}
              type="url"
              placeholder="https://osprey.com"
              onChange={(v) => setFieldValue("product_url", v)}
              allowedLength={ItemConstants.product_url}
            />
            <Input
              label="Notes"
              value={values.notes || ""}
              placeholder="Care instructions, further details, etc..."
              onChange={(v) => setFieldValue("notes", v)}
              allowedLength={ItemConstants.notes}
            />
            <Button
              onClick={submitForm}
              disabled={isSubmitting}
              block={true}
              size="large"
              type="primary"
            >
              Add Item
            </Button>

            <OptionsRows>
              <Button onClick={exportItems} type="link" size="small">
                Export items
              </Button>
              <Button
                onClick={() => showUploadModal(true)}
                type="dashed"
                icon={<UploadOutlined />}
              >
                Import Items
              </Button>
            </OptionsRows>

            <UploadModal
              visible={uploadVisibility}
              hideModal={() => showUploadModal(false)}
            />
          </SidebarContainer>
        );
      }}
    </Formik>
  )
}
