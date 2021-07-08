import * as React from 'react';
import { Col, Icon, Row, Tooltip } from 'antd';

import { WeightUnit } from 'enums'
import { PackItem } from 'types/item';

import { ShirtIcon } from "app/components/Icons";
import { WornIndicator } from "app/components/PackItems/styles";
import { getItemWeight, getWeightByCategory } from "lib/utils/weight";
import { getCategories } from "lib/utils/categories";

import { ItemList, ItemName, ItemNotes, ItemDescription, ItemQuantity, ItemWeight, CategorySection } from "./styles";
import { helpIconStyles } from "styles/common";
import ExpandablePanel from 'app/components/ExpandablePanel';
import { Category } from 'types/category';

interface ItemsProps {
    items: PackItem[];
    unit: WeightUnit;
}

const Items: React.FC<ItemsProps> = ({ items, unit }) => {
    const categories = getCategories(items);
    const weightByCategory = getWeightByCategory(unit, items);

    const itemDesc = (url?: string, product_name?: string) => {
        if (product_name && !url) {
            return product_name;
        }

        if (url) {
            const linkLabel = product_name || 'View product';
            return <a href={url} target="_blank" rel="noopener noreferrer">{linkLabel}</a>
        }

        return null;
    };

    
    const sortItems = (a: PackItem, b: PackItem) => {
        return a.packItem && b.packItem ? a.packItem.sort_order - b.packItem.sort_order : 0;
    }

    const sortCategories = (a: Category, b: Category) => {
        const catAItem = items.find(i => i.categoryId === a.id);
        const catBItem = items.find(i => i.categoryId === b.id);
        return catAItem && catBItem ? catAItem.packItem.sort_order - catBItem.packItem.sort_order : -1;
    }

    return (
        <ItemList>
            {categories.sort(sortCategories).map(cat => {
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
                        <strong>{catWeight!.total.label} {unit}</strong>
                    </>
                )
                return (
                    <CategorySection key={cat.id}>
                        <ExpandablePanel Header={Header}>
                        {catItems.sort(sortItems).map(item => {
                            const { name, product_name, product_url, packItem: { notes, quantity, worn } } = item;
                            const { label } = getItemWeight(unit, item);
                            const NotesRow = notes && (
                                <ItemNotes>
                                    {notes}
                                </ItemNotes>
                            );
                            let quantityString = parseFloat(quantity.toString());
                            return (
                                <Row gutter={16} key={item.id} className="item-row">
                                    <Col span={6}>
                                        <ItemName>
                                            <ItemQuantity>{quantityString} x </ItemQuantity>
                                            {name}
                                        </ItemName>
                                    </Col>
                                    <Col span={12}>
                                        <ItemDescription>
                                            {itemDesc(product_url, product_name)}
                                            {NotesRow}
                                        </ItemDescription>
                                    </Col>
                                    <Col span={2} className="align-right">
                                        {worn && (
                                            <WornIndicator className='active display'>
                                                <Tooltip title="Worn items are excluded from pack weight"
                                                         mouseEnterDelay={.1}>
                                                    <Icon component={ShirtIcon}/>
                                                </Tooltip>
                                            </WornIndicator>
                                        )}
                                    </Col>
                                    <Col span={4} className="align-right">
                                        <ItemWeight>
                                            {label} {unit}
                                        </ItemWeight>
                                    </Col>
                                </Row>
                            )
                        })}
                        </ExpandablePanel>
                    </CategorySection>
                )
            })}
        </ItemList>
    )

};

export default Items;
