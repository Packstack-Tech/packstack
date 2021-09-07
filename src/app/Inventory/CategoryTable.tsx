import * as React from "react"

import { Category } from "types/category"
import { Item as ItemType } from "types/item"

import Item from "./Item"
import { ExpandablePanel } from "../components/ExpandablePanel"

interface Props {
  category: Category
  items: ItemType[]
}

export const CategoryTable: React.FC<Props> = ({ category, items }) => (
  <div key={category.id} style={{ marginBottom: "24px" }}>
    <ExpandablePanel Header={<h3>{category.name}</h3>}>
      {items.map((item) => (
        <Item item={item} key={item.id} />
      ))}
    </ExpandablePanel>
  </div>
)
