import { useState, FC } from "react"
import DocumentTitle from "react-document-title"
import FileDownload from "js-file-download"
import { useHistory } from "react-router"
import * as Yup from "yup"
import { Formik, FormikProps } from "formik"
import { Row, Col, Button } from "antd"
import { RollbackOutlined } from "@ant-design/icons"
import { Input, Select, Textarea } from "app/components/FormFields"
import { Option } from "app/components/FormFields/types"

import { getPackPath } from "routes"
import { DurationUnit } from "enums"
import { Item, PackItem } from "types/item"
import { Pack, BasePack, PackConstants } from "types/pack"

import { durationUnitOptions, genderOptions } from "lib/utils/form"

import InventorySidebar from "app/components/InventorySidebar"
import { PackItems } from "app/components/PackItems"
import { alertError, alertSuccess } from "app/components/Notifications"
import { Sidebar } from "app/components/Sidebar"
import { Container, Content } from "styles/common"
import { NavigationConfirmModal } from "react-router-navigation-confirm"

import { PageTitle, Controls, Box, Grid, PageDescription } from "styles/common"
import SwitchInput from "app/components/FormFields/SwitchInput"
import { ItemForm } from "app/components/ItemForm"
import FloatingActionButton from "app/components/FloatingActionButton"
import { useUserData } from "hooks/useUserData"
import { exportPackItems } from "api/api"
import { useCreatePack, useUpdatePack } from "queries/packs"

interface Props {
  pack: Pack | undefined
}

const getPackItemDefaults = (notes?: string) => ({
  notes: notes || "",
  quantity: 1,
  worn: false,
  sort_order: 0,
})

export const PackForm: FC<Props> = ({ pack }) => {
  const history = useHistory()
  const user = useUserData()
  const createPack = useCreatePack()
  const updatePack = useUpdatePack()

  const [sidebar, setSidebar] = useState<"inventory" | "form">("inventory")
  const [packItems, setPackItems] = useState<PackItem[]>(pack?.items || [])
  const [hasPendingChanges, setHasPendingChanges] = useState<boolean>(false)

  const addItem = (item: Item) => {
    console.log(item)
    const items = [
      ...packItems,
      { ...item, packItem: getPackItemDefaults(item.notes) },
    ]
    setHasPendingChanges(true)
    setPackItems(items)
  }

  const removeItem = (itemId: number) => {
    const items = packItems.filter((i) => i.id !== itemId)
    setHasPendingChanges(true)
    setPackItems(items)
  }

  const updateItem = (
    itemId: number,
    field: string,
    value: string | number | boolean
  ) => {
    const items = [...packItems]
    const idx = items.findIndex((item) => item.id === itemId)
    // @ts-ignore
    items[idx].packItem[field] = value
    setHasPendingChanges(true)
    setPackItems(items)
  }

  const updateItemList = (newItemList: PackItem[]) => {
    setHasPendingChanges(true)
    setPackItems(newItemList)
  }

  function downloadItems() {
    if (pack) {
      exportPackItems(pack.id).then((data) =>
        FileDownload(data.data, `${pack.title}.csv`)
      )
    }
  }

  const titleType = !!pack ? "Edit" : "New"
  return (
    <DocumentTitle title={`Packstack | ${titleType} packing list`}>
      <Container>
        <Content>
          <Formik
            initialValues={{
              title: pack?.title || "",
              description: pack?.description || "",
              duration: pack?.duration || undefined,
              duration_unit: pack?.duration_unit || undefined,
              temp_range: pack?.temp_range || "",
              season: pack?.season || "",
              gender: pack?.gender || undefined,
              public: pack?.public || false,
            }}
            validationSchema={Yup.object().shape({
              title: Yup.string().required("Trail name or region is required."),
            })}
            onSubmit={(values) => {
              if (!pack) {
                const payload = Object.assign(values, { items: packItems })
                createPack.mutate(payload, {
                  onSuccess: (data) => {
                    alertSuccess({ message: "Packing list created" })
                    setHasPendingChanges(false)
                    history.push(`/pack/${data.id}`)
                  },
                  onError: (err) => {
                    alertError({ message: "Error saving pack" })
                  },
                })
              } else {
                const payload = Object.assign(values, {
                  items: packItems,
                  id: pack.id,
                })
                updatePack.mutate(payload, {
                  onSuccess: () => {
                    alertSuccess({ message: "Packing list saved" })
                    setHasPendingChanges(false)
                  },
                  onError: (err) => {
                    alertError({ message: "Error saving pack" })
                  },
                })
              }
            }}
          >
            {(props: FormikProps<BasePack>) => {
              const { values, setFieldValue, submitForm, submitCount, errors } =
                props
              const saveBtnLabel = !!pack ? "Save" : "Create"
              const statusLabel = !!pack ? "Edit" : "New"
              const wasSubmitted = submitCount > 0
              const durationUnit = values.duration_unit && {
                value: values.duration_unit,
                label: values.duration_unit,
              }

              return (
                <>
                  <PageTitle>
                    <h1>{statusLabel} Packing List</h1>
                    <Controls>
                      {pack?.public && (
                        <a
                          href={getPackPath(pack.id, values.title)}
                          target="_blank"
                          rel="noreferrer"
                          style={{ marginRight: "8px" }}
                        >
                          View pack
                        </a>
                      )}
                      <Button type="primary" onClick={submitForm}>
                        {saveBtnLabel} Pack
                      </Button>
                    </Controls>
                  </PageTitle>

                  <Box style={{ marginBottom: "16px" }}>
                    <Grid>
                      <div className="two-thirds">
                        <Input
                          label="Trail Name or Region"
                          placeholder="Isle Royale National Park"
                          error={wasSubmitted && !!errors.title}
                          errorMsg={errors.title}
                          value={values.title}
                          onChange={(v) => {
                            setFieldValue("title", v)
                            setHasPendingChanges(true)
                          }}
                          allowedLength={PackConstants.title}
                        />

                        <Textarea
                          label="Field Notes"
                          placeholder="What would someone want to know when preparing for this trip?"
                          value={values.description || ""}
                          onChange={(v) => {
                            setFieldValue("description", v)
                            setHasPendingChanges(true)
                          }}
                          last={true}
                          allowedLength={PackConstants.description}
                        />
                      </div>
                      <div className="third">
                        <Row gutter={8}>
                          <Col span={12}>
                            <Input
                              label="Duration"
                              type="number"
                              placeholder="1"
                              value={values.duration || ""}
                              onChange={(v) => {
                                setFieldValue("duration", v)
                                if (!values.duration_unit) {
                                  setFieldValue(
                                    "duration_unit",
                                    DurationUnit.DAYS
                                  )
                                }
                                setHasPendingChanges(true)
                              }}
                            />
                          </Col>
                          <Col span={12}>
                            <Select
                              placeholder="Days"
                              defaultValue={durationUnit}
                              value={durationUnit}
                              options={durationUnitOptions()}
                              onChange={(option: Option<string>) => {
                                setFieldValue("duration_unit", option.value)
                                setHasPendingChanges(true)
                              }}
                              style={{ marginTop: "14px" }}
                            />
                          </Col>
                        </Row>
                        <Input
                          label="Temp Range"
                          placeholder="43° - 81° F"
                          allowedLength={PackConstants.temp_range}
                          value={values.temp_range || ""}
                          onChange={(v) => {
                            setFieldValue("temp_range", v)
                            setHasPendingChanges(true)
                          }}
                        />
                        <Row gutter={8}>
                          <Col span={12}>
                            <Input
                              label="Season"
                              placeholder="Summer"
                              value={values.season || ""}
                              onChange={(v) => {
                                setFieldValue("season", v)
                                setHasPendingChanges(true)
                              }}
                              last={true}
                              allowedLength={PackConstants.season}
                            />
                          </Col>
                          <Col span={12}>
                            <Select
                              label="Gender"
                              placeholder="Unspecified"
                              options={genderOptions()}
                              defaultValue={
                                values.gender && {
                                  value: values.gender,
                                  label: values.gender,
                                }
                              }
                              onChange={(option: Option<string>) => {
                                setFieldValue("gender", option.value)
                                setHasPendingChanges(true)
                              }}
                              last={true}
                            />
                          </Col>
                        </Row>
                        <SwitchInput
                          label="Public"
                          checked={values.public}
                          onChange={(v) => {
                            setFieldValue("public", v)
                            setHasPendingChanges(true)
                          }}
                          tip="Making your pack public gives you access to the list view."
                          style={{ marginTop: "12px" }}
                        />
                      </div>
                    </Grid>
                  </Box>

                  {!!pack && !!packItems.length && (
                    <div style={{ textAlign: "right" }}>
                      <Button onClick={downloadItems} type="link" size="small">
                        Export items
                      </Button>
                    </div>
                  )}

                  <PackItems
                    items={packItems}
                    weightUnit={user.default_weight_unit}
                    removeItem={removeItem}
                    updateItem={updateItem}
                    updateItemList={updateItemList}
                  />
                  <NavigationConfirmModal
                    when={hasPendingChanges}
                    buttonClassName="ant-btn"
                    buttonConfirmClassName="ant-btn-primary"
                    footerClassName="navigation-confirm-modal-footer"
                    bodyClassName="navigation-confirm-modal-body"
                    confirmText="Yes"
                    cancelText="No"
                  >
                    <PageDescription>
                      <div style={{ textAlign: "center" }}>
                        You have unsaved changes. Are you sure you want to leave
                        this page?
                      </div>
                    </PageDescription>
                  </NavigationConfirmModal>
                </>
              )
            }}
          </Formik>
        </Content>
        {sidebar === "inventory" && (
          <Sidebar
            title="Inventory"
            content={
              <InventorySidebar
                addItem={addItem}
                removeItem={removeItem}
                currentItems={packItems.map((item) => item.id)}
                createNewItem={() => setSidebar("form")}
              />
            }
          />
        )}
        {sidebar === "form" && (
          <Sidebar
            title="Add Item"
            content={
              <>
                <ItemForm onSave={() => setSidebar("inventory")} />
                <FloatingActionButton
                  icon={<RollbackOutlined />}
                  onClick={() => setSidebar("inventory")}
                  tooltip="Go back to the inventory list"
                />
              </>
            }
          />
        )}
      </Container>
    </DocumentTitle>
  )
}
