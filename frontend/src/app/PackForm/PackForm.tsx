import * as React from "react";
import DocumentTitle from 'react-document-title';
import FileDownload from "js-file-download";
import * as Yup from "yup";
import { Formik, FormikProps } from 'formik';
import { Row, Col, Button } from "antd";
import { Input, Select, Textarea, Option } from 'app/components/FormFields';

import { getPackPath } from "routes";
import { PackFormSpecs } from "./types";
import { DurationUnit } from "enums";
import { Item, PackItem } from "types/item";
import { Pack } from "types/pack";
import { BasePack } from "types/pack";

import { durationUnitOptions, genderOptions } from "lib/utils/form";

import InventorySidebar from "app/components/InventorySidebar";
import PackItems from "app/components/PackItems";
import { alertError, alertSuccess } from "app/components/Notifications";
import Loading from "app/components/Loading";
import { useSidebar } from "app/components/Sidebar/Context";

import { PageTitle, Controls, Box, Grid } from "styles/common";

const PackForm: React.FC<PackFormSpecs.Props> = ({ history, packId, getPack, exportItems, getItems, createPack, updatePack, user }) => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [inventory, setInventory] = React.useState<Item[]>([]);
    const [packItems, setPackItems] = React.useState<PackItem[]>([]);
    const [packData, setPackData] = React.useState<Pack | null>(null);
    const { dispatch } = useSidebar();

    React.useEffect(() => {
        setLoading(true);
        async function fetchData(id: number) {
            await getData(id);
        }
        getItems()
            .then(items => setInventory(items))
            .catch(() => alertError({ message: 'Unable to retrieve inventory' }));

        if (!packId) {
            setLoading(false);
        } else {
            fetchData(packId);
        }
    }, [packId]);

    async function getData(id: number) {
        try {
            const pack = await getPack(id);
            const { items, userId, title } = pack;
            if (user && user.id !== userId) {
                history.push(getPackPath(id, title));
                return;
            }
            setPackData(pack);
            setPackItems(items);
            setLoading(false);
        } catch (e) {
            alertError({ message: 'Unable to retrieve pack information.' })
        }
    }

    const addItem = (item: Item) => {
        const items = Object.assign([], [...packItems, { ...item, packItem: { notes: '', quantity: 1, worn: false } }]);
        setPackItems(items);
    };

    const removeItem = (itemId: number) => {
        const items = packItems.filter(i => i.id !== itemId);
        setPackItems(items);
    };

    const updateItem = (itemId: number, field: string, value: string | number | boolean) => {
        const items: PackItem[] = Object.assign([], packItems);
        const idx = items.findIndex(item => item.id === itemId);
        items[idx].packItem[field] = value;
        setPackItems(items);
    };

    const SidebarContent = () => (
        <InventorySidebar items={inventory}
                          addItem={addItem}
                          removeItem={removeItem}
                          currentItems={packItems.map(item => item.id)}/>
    );

    React.useEffect(() => {
        dispatch({ type: 'setTitle', value: 'Inventory' });
        dispatch({ type: 'setContent', value: SidebarContent() });
        return function cleanup() {
            dispatch({ type: 'reset' });
        }
    }, [inventory, packItems]);

    if (loading) {
        return <Loading size="large"/>
    }

    function downloadItems() {
        if (packId && packData) {
            exportItems(packId).then(data => FileDownload(data, `${packData.title}.csv`));
        }
    }

    const titleType = packId ? 'Edit' : 'New';
    return (
        <DocumentTitle title={`Packstack | ${titleType} packing list`}>
            <Formik
                initialValues={{
                    title: packData ? packData.title : '',
                    description: packData ? packData.description : '',
                    duration: packData ? packData.duration : undefined,
                    duration_unit: packData ? packData.duration_unit : undefined,
                    temp_range: packData ? packData.temp_range : '',
                    season: packData ? packData.season : '',
                    gender: packData ? packData.gender : undefined
                }}
                validationSchema={Yup.object().shape({
                    title: Yup.string().required("Trail name or location is required.")
                })}
                onSubmit={values => {
                    if (!packId) {
                        const payload = Object.assign(values, { items: packItems });
                        createPack(payload)
                            .then(resp => {
                                alertSuccess({ message: 'Packing list created' });
                                history.push(`/pack/${resp.id}`);
                            })
                            .catch(err => console.log(err));
                    } else {
                        const payload = Object.assign(values, {
                            items: packItems,
                            id: packId
                        });
                        updatePack(payload)
                            .then(() => alertSuccess({ message: 'Packing list saved' }))
                            .catch(() => alertError({ message: 'Error saving packing list' }));
                    }
                }}>
                {(props: FormikProps<BasePack>) => {
                    const { values, setFieldValue, submitForm, submitCount, errors } = props;
                    const saveBtnLabel = packId ? 'Save' : 'Create';
                    const statusLabel = packId ? 'Edit' : 'New';
                    const wasSubmitted = submitCount > 0;
                    const durationUnit = values.duration_unit && {
                        value: values.duration_unit,
                        label: values.duration_unit
                    };

                    return (
                        <>
                            <PageTitle>
                                <h1>{statusLabel} Packing List</h1>
                                <Controls>
                                    {packId && (
                                        <Button type="link"
                                                onClick={() => history.push(getPackPath(packId, values.title))}>
                                            View pack
                                        </Button>
                                    )}
                                    <Button type="primary" onClick={submitForm}>
                                        {saveBtnLabel} Pack
                                    </Button>
                                </Controls>
                            </PageTitle>

                            <Box style={{ marginBottom: '16px' }}>
                                <Grid>
                                    <div className="two-thirds">
                                        <Input label="Location / Trail"
                                               placeholder="Isle Royale National Park"
                                               error={wasSubmitted && !!errors.title}
                                               errorMsg={errors.title}
                                               value={values.title}
                                               onChange={v => setFieldValue('title', v)}/>

                                        <Textarea label="Field Notes"
                                                  placeholder="Additional notes about this trip..."
                                                  value={values.description || ''}
                                                  onChange={v => setFieldValue('description', v)}
                                                  last={true}/>
                                    </div>
                                    <div className="third">
                                        <Row gutter={8}>
                                            <Col span={12}>
                                                <Input label="Duration"
                                                       type="number"
                                                       placeholder="1"
                                                       value={values.duration || ''}
                                                       onChange={v => {
                                                           setFieldValue('duration', v);
                                                           if (!values.duration_unit) {
                                                               setFieldValue('duration_unit', DurationUnit.DAYS)
                                                           }
                                                       }}/>
                                            </Col>
                                            <Col span={12}>
                                                <Select placeholder="Days"
                                                        defaultValue={durationUnit}
                                                        value={durationUnit}
                                                        options={durationUnitOptions()}
                                                        onChange={(option: Option) => setFieldValue('duration_unit', option.value)}
                                                        style={{ marginTop: '14px' }}/>
                                            </Col>
                                        </Row>
                                        <Input label="Temp Range"
                                               placeholder="43° - 81° F"
                                               value={values.temp_range || ''}
                                               onChange={v => setFieldValue('temp_range', v)}
                                        />
                                        <Row gutter={8}>
                                            <Col span={12}>
                                                <Input label="Season"
                                                       placeholder="Summer"
                                                       value={values.season || ''}
                                                       onChange={v => setFieldValue('season', v)}
                                                       last={true}
                                                />
                                            </Col>
                                            <Col span={12}>
                                                <Select label="Gender"
                                                        placeholder="Unspecified"
                                                        options={genderOptions()}
                                                        defaultValue={values.gender && {
                                                            value: values.gender,
                                                            label: values.gender
                                                        }}
                                                        onChange={(option: Option) => setFieldValue('gender', option.value)}
                                                        last={true}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </Grid>
                            </Box>

                            {packId && !!packItems.length && (
                                <div style={{ textAlign: 'right' }}>
                                    <Button onClick={downloadItems} type="link" size="small">
                                        Export items
                                    </Button>
                                </div>
                            )}

                            <PackItems items={packItems}
                                       weightUnit={user.default_weight_unit}
                                       removeItem={removeItem}
                                       updateItem={updateItem}/>
                        </>
                    )
                }}
            </Formik>
        </DocumentTitle>
    );
};

export default PackForm;