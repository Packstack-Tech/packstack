import * as React from 'react';
import { Button, Col, Modal, Row, Popconfirm } from "antd";

import { FormSpecs } from "./types";

import { Input, Select, Option, SelectCreatable } from "app/components/FormFields";

import withApi from "app/components/higher-order/with-api";
import { categoryOptions, weightUnitOptions } from "lib/utils/form";

import { ButtonGroup, ModalTitle } from "./styles";

const EditForm: React.FC<FormSpecs.Props> = (
    {
        deleteItem,
        categoryValue,
        categories,
        fetchItems,
        updateItem,
        onCancel,
        visible,
        onClose,
        onOk,
        record
    }) => {
    const handleDelete = () => {
        deleteItem(record.id).then(() => {
            onClose();
            fetchItems();
        });
    };

    const renderFooter = () => (
        <ButtonGroup>
            <div>
                <Popconfirm title="Are you sure you want to delete this item?"
                            okText="Delete"
                            placement="bottom"
                            onConfirm={handleDelete}>
                    <Button type="danger">
                        Delete
                    </Button>
                </Popconfirm>
            </div>
            <div>
                <Button onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="primary" onClick={onOk}>
                    Save Changes
                </Button>
            </div>
        </ButtonGroup>
    );

    const { product_name, name, weight_unit, weight, price, product_url } = record;
    return (
        <Modal
            title={<ModalTitle>Edit Item</ModalTitle>}
            visible={visible}
            onCancel={onCancel}
            footer={renderFooter()}
        >
            <Input label="Item Type"
                   placeholder="Backpack, Compass, etc..."
                   value={name}
                   onChange={v => updateItem('name', v)}
            />

            <SelectCreatable
                label="Category"
                placeholder="Select a category..."
                options={categoryOptions(categories)}
                value={categoryValue}
                clearable={true}
                onChange={(option: Option<number>) => updateItem('categoryId', option.value)}/>

            <Input label="Product Name"
                   placeholder="Osprey Renn 65"
                   value={product_name || ''}
                   onChange={v => updateItem('product_name', v)}/>

            <Row gutter={8}>
                <Col span={16}>
                    <Input label="Weight"
                           type="number"
                           value={weight || ''}
                           onChange={v => updateItem('weight', v)}/>
                </Col>
                <Col span={8}>
                    <Select label="Unit"
                            defaultValue={weight_unit && {
                                value: weight_unit,
                                label: weight_unit
                            }}
                            options={weightUnitOptions()}
                            onChange={(option: Option<string>) => updateItem('weight_unit', option.value)}/>
                </Col>
            </Row>

            <Input label="Price"
                  type="number"
                   placeholder="0.00"
                   value={price || ''}
                   onChange={v => updateItem('price', v)}/>

            <Input label="Product URL"
                   placeholder="https://osprey.com"
                   type="url"
                   value={product_url || ''}
                   onChange={v => updateItem('product_url', v)}
                   last={true}/>
        </Modal>
    )
};

const EditWithApi = withApi<FormSpecs.ApiProps>(api => ({
    deleteItem: api.ItemService.delete
}))(EditForm);

export default EditWithApi;