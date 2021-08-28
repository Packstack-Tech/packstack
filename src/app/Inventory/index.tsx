import React, { useState, useEffect, useCallback, useMemo } from "react"
import DocumentTitle from "react-document-title"

import { InventorySpecs } from "./types"
import { Item as ItemType } from "types/item"
import { Category } from "types/category"

import withApi from "app/components/higher-order/with-api"
import ItemForm from "app/components/ItemForm"
import { MessageArea } from "app/components/MessageArea"
import Loading from "app/components/Loading"
import { useSidebar } from "app/components/Sidebar/Context"
import { Input } from "app/components/FormFields"

import { getCategories } from "lib/utils/categories"
import { searchItems } from "lib/utils/search"

import Table from "./Table"
import { PageTitle, PageDescription, PageWrapper } from "styles/common"

const Inventory: React.FC<InventorySpecs.Props> = ({
  getItems,
  updateItem,
}) => {
  const [items, setItems] = useState<ItemType[]>([])
  const [filterText, setFilterText] = useState<string>("")
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const { dispatch } = useSidebar()

  useEffect(() => {
    fetchItems()
    dispatch({ type: "setTitle", value: "Add Item" })
    dispatch({ type: "setContent", value: <ItemForm onSubmit={fetchItems} /> })

    return function cleanup() {
      dispatch({ type: "reset" })
    }
  }, [])

  const fetchItems = useCallback(() => {
    getItems()
      .then((items) => {
        const categories = getCategories(items)
        const rowItems = Object.assign(
          [],
          items.map((i) => ({ ...i, refresh: fetchItems }))
        )
        setItems(rowItems)
        setCategories(categories)
        setLoading(false)
      })
      .catch((err) => console.warn(err))
  }, [getItems])

  const categoryTables = useMemo(() => {
    const tables = categories.map((cat) => {
      const categoryItems = items.filter((i) => i.categoryId === cat.id)
      const filteredItem = !!filterText
        ? searchItems(categoryItems, filterText)
        : categoryItems

      if (!filteredItem.length) return null
      return (
        <Table
          key={cat.id}
          category={cat}
          items={filteredItem}
          fetchItems={fetchItems}
          updateItem={updateItem}
        />
      )
    })

    return <div style={{ minWidth: "100%" }}>{tables}</div>
  }, [filterText, categories, items, fetchItems, updateItem])

  const renderEmptyList = () => (
    <MessageArea>Get started by adding your inventory.</MessageArea>
  )

  const InventoryTable = !!categories.length
    ? categoryTables
    : renderEmptyList()
  return (
    <DocumentTitle title={`Packstack | Inventory`}>
      <PageWrapper>
        <PageTitle>
          <h1>Inventory</h1>
        </PageTitle>
        <PageDescription>
          <p>
            Add all of the gear you own. Whenever you create a new pack, you'll
            be able to select items from your inventory.
          </p>
        </PageDescription>

        {loading ? (
          <Loading size="large" />
        ) : (
          <>
            <div
              style={{
                marginBottom: "16px",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
              }}
            >
              <Input
                placeholder="search items..."
                value={filterText}
                style={{ width: "75%" }}
                onChange={(v) => setFilterText(`${v}`)}
                last={true}
              />
            </div>
            {InventoryTable}
          </>
        )}
      </PageWrapper>
    </DocumentTitle>
  )
}

const InventoryWithApi = withApi<InventorySpecs.ApiProps>((api) => ({
  getItems: api.ItemService.get,
  updateItem: api.ItemService.update,
  deleteItem: api.ItemService.delete,
}))(Inventory)

export default InventoryWithApi
