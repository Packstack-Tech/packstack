import Fuse from "fuse.js";
import { Item } from "types/item";

export function searchItems(items: Item[], searchText: string) {
  const fuse = new Fuse(items, {
    threshold: 0.25,
    location: 0,
    distance: 4,
    keys: ["name", "product_name"],
  });

  return fuse.search(searchText).map((rec) => rec.item);
}
