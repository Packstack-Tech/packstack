import * as React from 'react';
import { Icon, Tooltip } from 'antd';

import { WeightUnit } from "enums";
import { PackItem } from "types/item";

import { MessageArea } from "app/components/MessageArea";

import Item from './Item';

import { getCategories } from "lib/utils/categories";
import { getWeightByCategory } from "lib/utils/weight";
import { helpIconStyles } from "styles/common";

import { CategoryGroup } from "styles/common";
import ExpandablePanel from '../ExpandablePanel';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Category } from 'types/category';

interface PackItemProps {
    items: PackItem[];
    weightUnit: WeightUnit;
    removeItem: (id: number) => void;
    updateItem: (id: number, field: string, value: string | number | boolean) => void;
    updateItemList: (newPackItems: PackItem[]) => void;
}

const PackItems: React.FC<PackItemProps> = ({ items, removeItem, updateItem, weightUnit, updateItemList }) => {
    const [updateId, setUpdateId] = React.useState<number | null>(null);
    const categories = getCategories(items);
    const weightByCategory = getWeightByCategory(weightUnit, items);

    const renderEmptyList = () => (
        <MessageArea>
            Select items from your inventory to begin<br/> building your packing list.
        </MessageArea>
    );

    const update = (id: number, field: string, value: string | number | boolean) => {
        updateItem(id, field, value);
        setUpdateId(id);
    };

    const onDragEndItem = (result: any) => {
        const { source, destination } = result;
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) { //if we dropped it in our list 
            const sortedItemsInCategory = reorderItem(items.sort(sortItems).filter(i => i.categoryId.toString() === source.droppableId), source.index, destination.index);
            let allItems: PackItem[] = items.sort(sortItems).filter(i => i.categoryId.toString() !== source.droppableId);//remove those old items from the main list
            allItems = allItems.concat(sortedItemsInCategory);
            updateItemList(allItems);
        }
    }

    const reorderItem = (list: PackItem[], startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        let newSortOrder = result[0].packItem.sort_order; //lowest sort order for this category
        const [removed] = result.splice(startIndex, 1); //remove the thing we picked up
        result.splice(endIndex, 0, removed); //and insert it where we dropped it

        result.forEach((item) => { //then assign the sort order based on the indexes we have now
            item.packItem.sort_order = newSortOrder;
            newSortOrder++;
        })
        return result;
    }

    const onDragEndCategory = (result: any) => {
        const { source, destination } = result;
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) { //if we dropped it in our list 
            const reorderedItems = reorderCategory(items.sort(sortItems), source.index, destination.index);
            updateItemList(reorderedItems);
        }
    }

    class sortedCategory {
        sort_order: number;
        packItems: PackItem[] = [];
    }
    const reorderCategory = (list: PackItem[], startIndex: number, endIndex: number) => {
        const result = new Array<PackItem>();
        let sortedGroupCategories = new Array<sortedCategory>();
        categories.map((cat,catIndex) => {
            if (sortedGroupCategories[cat.id] === undefined) {
                sortedGroupCategories[cat.id] = new sortedCategory();
            }
        });
        list.forEach((item,index) => {
            sortedGroupCategories[item.categoryId].packItems.push(item);
            sortedGroupCategories[item.categoryId].sort_order = index;
        })
        sortedGroupCategories.sort((a,b) => {
            return a && b ? a.sort_order - b.sort_order : -1;
        });
        sortedGroupCategories = sortedGroupCategories.filter(cat => cat.packItems.length > 0);

        const [removed] = sortedGroupCategories.splice(startIndex, 1); //remove the category we picked up
        sortedGroupCategories.splice(endIndex, 0, removed); //and insert it where we dropped it
        let sortOrder = 0;
        for (let i = 0; i < sortedGroupCategories.length; i++){
            for (let j = 0; j < sortedGroupCategories[i].packItems.length; j++) {
                 sortedGroupCategories[i].packItems[j].packItem.sort_order = sortOrder;
                result.push(sortedGroupCategories[i].packItems[j]); //add the item to our result list
                sortOrder++;
            }
        } 
        return (result);
    }

    const sortItems = (a: PackItem, b: PackItem) => {
        return a.packItem && b.packItem ? a.packItem.sort_order - b.packItem.sort_order : 0;
    }

    const sortCategories = (a: Category, b: Category) => {
        const catAItem = items.find(i => i.categoryId === a.id);
        const catBItem = items.find(i => i.categoryId === b.id);
        return catAItem && catBItem ? catAItem.packItem.sort_order - catBItem.packItem.sort_order : -1;
    }

    const renderGroupedItems = () => (
        categories.sort(sortCategories).map((cat,catIndex) => {
            const catItems = items.filter(i => i.categoryId === cat.id);
            const catWeight = weightByCategory.find(c => c.id === cat.id);
            const Header = (
                <>
                    <h3>
                        {cat.name}
                        {cat.exclude_weight &&
                        <Tooltip title={"Items in this category are excluded from base weight"}
                                         mouseEnterDelay={.1}>
                            <Icon type="stop-o" style={helpIconStyles}/>
                        </Tooltip>}
                    </h3>
                    <strong>{catWeight!.total.label} {weightUnit}</strong>
                </>
            );
            return (
                    <CategoryGroup key={cat.id}>
                        <ExpandablePanel Header={Header} categoryId={cat.id} categoryIndex={catIndex}>
                            <DragDropContext onDragEnd={onDragEndItem}>
                                <Droppable droppableId={cat.id.toString()}>
                                    {(provided) => 
                                        <div ref={provided.innerRef} {...provided.droppableProps}>
                                            {catItems.sort(sortItems).map((item, index) => (
                                                <Item key={item.id}
                                                    item={item}
                                                    updateId={updateId}
                                                    removeItem={removeItem}
                                                    updateItem={update}
                                                    index={index}/>)
                                            )}
                                            {provided.placeholder}
                                        </div>
                                    }
                                </Droppable>
                            </DragDropContext>
                        </ExpandablePanel>
                    </CategoryGroup>
            )
        })
    );

    return (
        <div style={{ marginTop: '8px' }}>
            <DragDropContext onDragEnd={onDragEndCategory}>
                <Droppable droppableId="categoriesDroppable">
                    {(provided) => 
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            {items.length ? renderGroupedItems() : renderEmptyList()}
                            {provided.placeholder}
                        </div>
                    }
                </Droppable>
            </DragDropContext>
        </div>
    )
};

export default PackItems;
