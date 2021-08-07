import Fuse from 'fuse.js';

export function searchItems(items: any, searchText: string) {
    const fuse = new Fuse(items, {
        threshold: 0.25,
        location: 0,
        distance: 4,
        minMatchCharLength: 2,
        keys: [
            "name",
            "product_name"
        ]
    });
    return !!searchText ? fuse.search(searchText) : items;
}