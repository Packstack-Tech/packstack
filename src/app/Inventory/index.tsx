import { FC, useState, useEffect } from "react"
import DocumentTitle from "react-document-title"

import { Category } from "types/category"

import { ItemForm } from "app/components/ItemForm"
import { MessageArea } from "app/components/MessageArea"
import Loading from "app/components/Loading"
import { Sidebar } from "app/components/Sidebar"
import { Content, Container } from "styles/common"
import { Input } from "app/components/FormFields"

import { getCategories } from "lib/utils/categories"
import { searchItems } from "lib/utils/search"
import { useItemsQuery } from "queries/items"

import { CategoryTable } from "./CategoryTable"
import { PageTitle, PageDescription, PageWrapper } from "styles/common"

export const Inventory: FC = () => {
  const items = useItemsQuery()
  const [filterText, setFilterText] = useState<string>("")
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    if (items.isSuccess) {
      const categories = getCategories(items.data)
      setCategories(categories)
    }
  }, [items.data, items.isSuccess])

  return (
    <DocumentTitle title={`Packstack | Inventory`}>
      <Container>
        <Content>
          <PageWrapper>
            <PageTitle>
              <h1>Inventory</h1>
            </PageTitle>
            <PageDescription>
              <p>
                Add all of the gear you own. Whenever you create a new pack,
                you'll be able to select items from your inventory.
              </p>
            </PageDescription>

            {items.isLoading ? (
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
                {categories.length > 0 ? (
                  <div style={{ minWidth: "100%" }}>
                    {categories.map((cat) => {
                      const categoryItems = (items.data || []).filter(
                        (i) => i.categoryId === cat.id
                      )
                      const filteredItem = !!filterText
                        ? searchItems(categoryItems, filterText)
                        : categoryItems

                      if (!filteredItem.length) return null
                      return (
                        <CategoryTable
                          key={cat.id}
                          category={cat}
                          items={filteredItem}
                        />
                      )
                    })}
                  </div>
                ) : (
                  <MessageArea>
                    Get started by adding your inventory.
                  </MessageArea>
                )}
              </>
            )}
          </PageWrapper>
        </Content>
        <Sidebar title="Add Item" content={<ItemForm />} />
      </Container>
    </DocumentTitle>
  )
}
