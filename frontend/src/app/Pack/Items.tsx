import * as React from 'react';
import { Col, Icon, Row, Tooltip } from 'antd';

import { WeightUnit } from 'enums'
import { PackItem } from 'types/item';

import { ShirtIcon } from "app/components/Icons";
import { WornIndicator } from "app/components/PackItems/styles";
import { getItemWeight, getWeightByCategory } from "lib/utils/weight";
import { getCategories } from "lib/utils/categories";

import { SectionHeader } from "styles/common";
import { ItemList, ItemName, ItemNotes, ItemDescription, ItemQuantity, ItemWeight, CategorySection } from "./styles";

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
            const linkLabel = product_name || 'view item';
            return <a href={url} target="_blank">{linkLabel}</a>
        }

        return null;
    };

    return (
        <ItemList>
            {categories.map(cat => {
                const catItems = items.filter(i => i.categoryId === cat.id);
                const catWeight = weightByCategory.find(c => c.id === cat.id);
                return (
                    <CategorySection key={cat.id}>
                        <SectionHeader>
                            <h3>{cat.name}</h3>
                            <strong>{catWeight!.total.label} {unit}</strong>
                        </SectionHeader>

                        {catItems.map(item => {
                            const { name, product_name, product_url, packItem: { notes, quantity, worn } } = item;
                            const { label } = getItemWeight(unit, item);
                            const NotesRow = notes && (
                                <ItemNotes>
                                    {notes}
                                </ItemNotes>
                            );
                            return (
                                <Row gutter={16} key={item.id} className="item-row">
                                    <Col span={18}>
                                        <ItemName>
                                            {name}
                                        </ItemName>
                                        <ItemDescription>
                                            {itemDesc(product_url, product_name)}
                                        </ItemDescription>
                                        <ItemQuantity>
                                            Quantity: {quantity}
                                        </ItemQuantity>
                                        {NotesRow}
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
                    </CategorySection>
                )
            })}
        </ItemList>
    )

};

export default Items;