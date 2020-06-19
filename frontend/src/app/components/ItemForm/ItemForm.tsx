import * as React from 'react';
import * as Yup from 'yup';
import FileDownload from 'js-file-download';
import { Formik, FormikProps } from "formik";
import { Row, Col, Button } from "antd";
import { Input, Select, SelectCreatable, Option } from '../FormFields';

import { AppContext } from 'AppContext';
import { CreateItem } from "types/item";
import { FormSpecs } from "./types";

import withApi from 'app/components/higher-order/with-api';
import { categoryOptions, weightUnitOptions } from "lib/utils/form";
import { categorySelectValue } from "lib/utils/categories";

import UploadModal from 'app/Inventory/UploadModal';
import { alertError, alertSuccess } from "../Notifications";

import { SidebarContainer } from "styles/common";
import { OptionsRows } from './styles';

const ItemForm: React.FC<FormSpecs.Props> = ({ createItem, exportCsv, onSubmit }) => {
    const [uploadVisibility, showUploadModal] = React.useState<boolean>(false);
    const app = React.useContext(AppContext);
    if (!app.userInfo) {
        return null;
    }

    function exportItems() {
        exportCsv().then(data => FileDownload(data, 'inventory.csv'));
    }

    const { default_weight_unit } = app.userInfo;
    return (
        <Formik
            initialValues={{
                name: '',
                categoryId: undefined,
                product_name: '',
                weight: undefined,
                weight_unit: default_weight_unit,
                price: undefined,
                product_url: '',
                newCategory: false
            }}
            validationSchema={Yup.object().shape({
                name: Yup.string().required('Item name is required'),
                categoryId: Yup.string().required('Category is required')
            })}
            onSubmit={(values, formikActions) => {
                createItem(values)
                    .then(() => {
                        onSubmit();
                        formikActions.setSubmitting(false);
                        formikActions.resetForm();
                        alertSuccess({ message: 'Item added' });
                        if (values.newCategory) {
                            app.fetchUser();
                        }
                    })
                    .catch(() => {
                        formikActions.setSubmitting(false);
                        alertError({ message: 'An error occurred' });
                    });
            }}
        >
            {(props: FormikProps<CreateItem>) => {
                const { values, setFieldValue, errors, submitCount, submitForm, isSubmitting } = props;
                const wasSubmitted = submitCount > 0;
                const weightUnit = values.weight_unit;
                const categoryValue = categorySelectValue(app.categories, values.categoryId);

                return (
                    <SidebarContainer>
                        <Input
                            value={values.name}
                            label="Item Type"
                            error={wasSubmitted && !!errors.name}
                            placeholder="Backpack, Compass, etc..."
                            onChange={v => setFieldValue('name', v)}
                        />
                        <SelectCreatable
                            label="Category"
                            placeholder="Select a category..."
                            options={categoryOptions(app.categories)}
                            value={categoryValue || null}
                            onChange={(option: Option<number>) => {
                                const value = option ? option.value : undefined;
                                const isNewCategory = Boolean(option && option.__isNew__);
                                setFieldValue('categoryId', value);
                                setFieldValue('newCategory', isNewCategory);
                            }}
                            error={wasSubmitted && !!errors.categoryId}
                            errorMsg={errors.categoryId}
                            clearable={true}
                        />
                        <Input
                            label="Product Name"
                            value={values.product_name || ''}
                            placeholder="Osprey Renn 65"
                            onChange={v => setFieldValue('product_name', v)}
                        />
                        <Row gutter={8}>
                            <Col span={16}>
                                <Input
                                    value={values.weight || ''}
                                    label="Weight"
                                    type="number"
                                    placeholder="0.0"
                                    onChange={v => setFieldValue('weight', v)}
                                />
                            </Col>
                            <Col span={8}>
                                <Select
                                    defaultValue={weightUnit && {
                                        value: weightUnit,
                                        label: weightUnit
                                    }}
                                    label="Unit"
                                    tip="Change default weight unit in Settings"
                                    options={weightUnitOptions()}
                                    onChange={(option: Option<string>) => setFieldValue('weight_unit', option.value)}/>
                            </Col>
                        </Row>
                        <Input
                            label="Price"
                            value={values.price || ''}
                            placeholder="0.00"
                            onChange={v => setFieldValue('price', v)}
                        />
                        <Input
                            label="Product URL"
                            value={values.product_url || ''}
                            type="url"
                            placeholder="https://osprey.com"
                            onChange={v => setFieldValue('product_url', v)}
                        />
                        <Button onClick={submitForm}
                                disabled={isSubmitting}
                                block={true}
                                size="large"
                                type="primary">
                            Add Item
                        </Button>

                        <OptionsRows>
                            <Button onClick={exportItems} type="link" size="small">
                                Export items
                            </Button>
                            <Button onClick={() => showUploadModal(true)} type="dashed" icon="upload">
                                 Import Items
                            </Button>
                        </OptionsRows>

                        <UploadModal
                            visible={uploadVisibility}
                            fetchItems={onSubmit}
                            hideModal={() => showUploadModal(false)}
                        />
                    </SidebarContainer>
                )
            }}
        </Formik>
    )
};

const ItemFormWithProps = withApi<FormSpecs.ApiProps>(api => ({
    createItem: api.ItemService.create,
    exportCsv: api.ItemService.exportCSV
}))(ItemForm);

export default ItemFormWithProps;