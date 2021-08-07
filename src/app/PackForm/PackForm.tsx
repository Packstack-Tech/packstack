import * as React from "react";
import DocumentTitle from 'react-document-title';
import FileDownload from "js-file-download";
import * as Yup from "yup";
import { Formik, FormikProps } from 'formik';
import { Row, Col, Button } from "antd";
import { Input, Select, Textarea } from 'app/components/FormFields';
import { Option } from "app/components/FormFields/types";

import { getPackPath, LOGIN } from "routes";
import { PackFormSpecs } from "./types";
import { DurationUnit } from "enums";
import { Item, PackItem } from "types/item";
import { Pack, BasePack, PackConstants } from "types/pack";

import { durationUnitOptions, genderOptions } from "lib/utils/form";

import InventorySidebar from "app/components/InventorySidebar";
import PackItems from "app/components/PackItems";
import { alertError, alertSuccess } from "app/components/Notifications";
import Loading from "app/components/Loading";
import { useSidebar } from "app/components/Sidebar/Context";
import { NavigationConfirmModal } from 'react-router-navigation-confirm';

import { PageTitle, Controls, Box, Grid, PageDescription } from "styles/common";
import SwitchInput from "app/components/FormFields/SwitchInput";
import ItemForm from 'app/components/ItemForm';
import FloatingActionButton from "app/components/FloatingActionButton";

const PackForm: React.FC<PackFormSpecs.Props> = ({
   history,
   packId,
   getPack,
   exportItems,
   getItems,
   createPack,
   updatePack,
   user
}) => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [inventory, setInventory] = React.useState<Item[]>([]);
    const [packItems, setPackItems] = React.useState<PackItem[]>([]);
    const [packData, setPackData] = React.useState<Pack | null>(null);
    const [hasPendingChanges, setHasPendingChanges] = React.useState<boolean>(false);
    const {dispatch} = useSidebar();



    React.useEffect(() => {
        refreshInventoryList(packId);
    }, [packId]);

    const refreshInventoryList = (packId: number | null) => {
        setLoading(true);

        async function fetchData(id: number) {
            await getData(id);
        }

        getItems()
            .then(items => setInventory(items))
            .catch(() => alertError({message: 'Unable to retrieve inventory'}));

        if (!packId) {
            setLoading(false);
        } else {
            fetchData(packId);
        }
    }

    async function getData(id: number) {
        try {
            const pack = await getPack(id);
            const {items, userId } = pack;
            if (user && user.id !== userId) {
                history.push(LOGIN);
                return;
            }
            setPackData(pack);
            setPackItems(items);
            setLoading(false);
        } catch (e) {
            alertError({message: 'Unable to retrieve pack information.'})
        }
    }

    const addItem = (item: Item) => {
        // @ts-ignore
        const items = Object.assign([], [...packItems, {
            ...item,
            packItem: {notes: item.notes, quantity: 1, worn: false}
        }]);
        setHasPendingChanges(true);
        setPackItems(items);
    };

    const removeItem = (itemId: number) => {
        const items = packItems.filter(i => i.id !== itemId);
        setHasPendingChanges(true);
        setPackItems(items);
    };

    const updateItem = (itemId: number, field: string, value: string | number | boolean) => {
        const items: PackItem[] = Object.assign([], packItems);
        const idx = items.findIndex(item => item.id === itemId);
        // @ts-ignore
        items[idx].packItem[field] = value;
        setHasPendingChanges(true);
        setPackItems(items);
    };

    const updateItemList = (newItemList: PackItem[]) => {
        setHasPendingChanges(true);
        setPackItems(newItemList);
    }

    const createNewItem  = () => {
        //show the add item view
        dispatch({type: 'setContent', value: SidebarContent(true)});
    }

    const SidebarContent = (isAddingNewItem: boolean) => {
        if (isAddingNewItem) {
            //show the new item form with a FAB to return to the inventory list
            return <div> 
                <ItemForm onSubmit={onNewItemCreated}></ItemForm>
                <FloatingActionButton 
                    icon="rollback"
                    visible={true}
                    onClick={cancelNewItem}
                    tooltip="Go back to the inventory list" ></FloatingActionButton>
                </div>
        }
        else {
            //show the inventory list
            return <InventorySidebar items={inventory}
            addItem={addItem}
            removeItem={removeItem}
            currentItems={packItems.map(item => item.id)}
            createNewItem={createNewItem}
            />
        }
    };

    React.useEffect(() => {
        dispatch({type: 'setTitle', value: 'Inventory'});
        //show the inventory list
        dispatch({type: 'setContent', value: SidebarContent(false)});
        return function cleanup() {
            dispatch({type: 'reset'});
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

    function onNewItemCreated() {
        //show the inventory list
        dispatch({type: 'setContent', value: SidebarContent(false)});
        refreshInventoryList(packId);
    }

    function cancelNewItem() {
        //show the inventory list
        dispatch({type: 'setContent', value: SidebarContent(false)});
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
                    gender: packData ? packData.gender : undefined,
                    public: packData ? packData.public : false
                }}
                validationSchema={Yup.object().shape({
                    title: Yup.string().required("Trail name or location is required.")
                })}
                onSubmit={values => {
                    if (!packId) {
                        const payload = Object.assign(values, {items: packItems});
                        createPack(payload)
                            .then(resp => {
                                alertSuccess({message: 'Packing list created'});
                                setHasPendingChanges(false);
                                history.push(`/pack/${resp.id}`);
                            })
                            .catch(err => console.log(err));
                    } else {
                        const payload = Object.assign(values, {
                            items: packItems,
                            id: packId
                        });
                        updatePack(payload)
                            .then(() => {
                                alertSuccess({message: 'Packing list saved'});
                                setHasPendingChanges(false);
                            })
                            .catch(() => alertError({message: 'Error saving packing list'}));
                    }
                }}>
                {(props: FormikProps<BasePack>) => {
                    const {values, setFieldValue, submitForm, submitCount, errors} = props;
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
                                    {packId && packData && packData.public && (
                                        <a href={getPackPath(packId, values.title)}>
                                            View pack
                                        </a>
                                    )}
                                    <Button type="primary" onClick={submitForm}>
                                        {saveBtnLabel} Pack
                                    </Button>
                                </Controls>
                            </PageTitle>

                            <Box style={{marginBottom: '16px'}}>
                                <Grid>
                                    <div className="two-thirds">
                                        <Input label="Location / Trail"
                                               placeholder="Isle Royale National Park"
                                               error={wasSubmitted && !!errors.title}
                                               errorMsg={errors.title}
                                               value={values.title}
                                               onChange={v => {
                                                   setFieldValue('title', v);
                                                   setHasPendingChanges(true);
                                               }}
                                               allowedLength={PackConstants.title}/>

                                        <Textarea label="Field Notes"
                                                  placeholder="Additional notes about this trip..."
                                                  value={values.description || ''}
                                                  onChange={v => {
                                                      setFieldValue('description', v);
                                                      setHasPendingChanges(true);
                                                  }}
                                                  last={true}
                                                  allowedLength={PackConstants.description}/>
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
                                                           setHasPendingChanges(true);
                                                       }}/>
                                            </Col>
                                            <Col span={12}>
                                                <Select placeholder="Days"
                                                        defaultValue={durationUnit}
                                                        value={durationUnit}
                                                        options={durationUnitOptions()}
                                                        onChange={(option: Option<string>) => {
                                                            setFieldValue('duration_unit', option.value);
                                                            setHasPendingChanges(true);
                                                        }}
                                                        style={{marginTop: '14px'}}/>
                                            </Col>
                                        </Row>
                                        <Input label="Temp Range"
                                               placeholder="43° - 81° F"
                                               allowedLength={PackConstants.temp_range}
                                               value={values.temp_range || ''}
                                               onChange={v => {
                                                   setFieldValue('temp_range', v);
                                                   setHasPendingChanges(true);
                                               }}
                                        />
                                        <Row gutter={8}>
                                            <Col span={12}>
                                                <Input label="Season"
                                                       placeholder="Summer"
                                                       value={values.season || ''}
                                                       onChange={v => {
                                                           setFieldValue('season', v);
                                                           setHasPendingChanges(true);
                                                       }}
                                                       last={true}
                                                       allowedLength={PackConstants.season}
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
                                                        onChange={(option: Option<string>) => {
                                                            setFieldValue('gender', option.value);
                                                            setHasPendingChanges(true);
                                                        }}
                                                        last={true}
                                                />
                                            </Col>
                                        </Row>
                                        <SwitchInput label="Pack Privacy"
                                                     checked={values.public}
                                                     checkedText="Public"
                                                     uncheckedText="Private"
                                                     onChange={v => {
                                                        setFieldValue('public', v);
                                                        setHasPendingChanges(true);}}
                                                     tip="When public, the pack will be viewable by anyone with a link"
                                        />
                                    </div>
                                </Grid>
                            </Box>

                            {packId && !!packItems.length && (
                                <div style={{textAlign: 'right'}}>
                                    <Button onClick={downloadItems} type="link" size="small">
                                        Export items
                                    </Button>
                                </div>
                            )}

                            <PackItems items={packItems}
                                       weightUnit={user.default_weight_unit}
                                       removeItem={removeItem}
                                       updateItem={updateItem}
                                       updateItemList={updateItemList}/>
                            <NavigationConfirmModal
                                when={hasPendingChanges}
                                buttonClassName="ant-btn"
                                buttonConfirmClassName="ant-btn-primary"
                                footerClassName="navigation-confirm-modal-footer"
                                bodyClassName="navigation-confirm-modal-body"
                                confirmText="Yes"
                                cancelText="No">
                                <PageDescription>
                                    <div style={{textAlign: "center"}}>You have unsaved changes. Are you sure you want
                                        to leave this page?
                                    </div>
                                </PageDescription>
                            </NavigationConfirmModal>
                        </>
                    )
                }}
            </Formik>
        </DocumentTitle>
    );
};

export default PackForm;
