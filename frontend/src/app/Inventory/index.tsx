import React, { useContext, useState, useEffect } from 'react';
import DocumentTitle from 'react-document-title';

import { InventorySpecs } from "./types";
import { Item as ItemType } from "types/item";
import { Category } from "types/category";

import { AppContext } from "AppContext";
import withApi from 'app/components/higher-order/with-api';
import ItemForm from 'app/components/ItemForm';
import { MessageArea } from "app/components/MessageArea";
import Loading from 'app/components/Loading';
import { useSidebar } from "app/components/Sidebar/Context";
import { Input, Option, Select } from "app/components/FormFields";

import { getCategories } from "lib/utils/categories";
import { searchItems } from "lib/utils/search";
import { weightUnitOptions } from "lib/utils/form";

import Table from './Table';
import { PageTitle, PageDescription, PageWrapper } from "styles/common";

const Inventory: React.FC<InventorySpecs.Props> = ({ getItems, updateItem, updateUser }) => {
    const { userInfo: user, fetchUser } = useContext(AppContext);
    const [defaultUnit, setDefaultUnit] = useState(user ? user.default_weight_unit : '');
    const [items, setItems] = useState<ItemType[]>([]);
    const [filterText, setFilterText] = useState<string>('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { dispatch } = useSidebar();

    useEffect(() => {
        fetchItems();
        dispatch({ type: 'setTitle', value: 'Add Item' });
        dispatch({ type: 'setContent', value: SidebarContent() });

        return function cleanup() {
            dispatch({ type: 'reset' })
        }
    }, []);

    function fetchItems() {
        getItems()
            .then(items => {
                const categories = getCategories(items);
                const rowItems = Object.assign([], items.map(i => ({ ...i, refresh: fetchItems })));
                setItems(rowItems);
                setCategories(categories);
                setLoading(false);
            })
            .catch(err => console.warn(err));
    }

    function renderTables() {
        const tables = categories.map(cat => {
            let catItems = items.filter(i => i.categoryId === cat.id);
            catItems = searchItems(catItems, filterText);

            if (!catItems.length) return null;
            return <Table key={cat.id} category={cat} items={catItems} fetchItems={fetchItems} updateItem={updateItem}/>
        });

        return <div style={{ minWidth: '100%', overflowX: "scroll" }}>{tables}</div>;
    }

    const renderEmptyList = () => (
        <MessageArea>
            Get started by adding your inventory.
        </MessageArea>
    );

    const SidebarContent = () => <ItemForm onSubmit={fetchItems}/>;

    const InventoryTable = !!categories.length ? renderTables() : renderEmptyList();
    return (
        <DocumentTitle title={`Packstack | Inventory`}>
            <PageWrapper>
                <PageTitle>
                    <h1>Inventory</h1>
                </PageTitle>
                <PageDescription>
                    <p>
                        Add all of the gear you own. Whenever you create a new pack, you'll be able to select items
                        from your inventory.
                    </p>
                </PageDescription>

                {loading ? <Loading size="large"/> : (
                    <>
                        <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                            <Input placeholder="search items..."
                                   value={filterText}
                                   style={{ width: '50%' }}
                                   onChange={v => setFilterText(v.toString())}
                                   last={true}/>
                            <Select label="Default Weight Unit"
                                    defaultValue={{
                                        value: defaultUnit,
                                        label: defaultUnit
                                    }}
                                    last={true}
                                    options={weightUnitOptions()}
                                    onChange={(option: Option<string>) => {
                                        setDefaultUnit(option.value);
                                        updateUser(user!.username, option.value).then(fetchUser);
                                    }}/>
                        </div>
                        {InventoryTable}
                    </>
                )}
            </PageWrapper>
        </DocumentTitle>
    )
};

const InventoryWithApi = withApi<InventorySpecs.ApiProps>(api => ({
    getItems: api.ItemService.get,
    updateItem: api.ItemService.update,
    deleteItem: api.ItemService.delete,
    updateUser: api.UserService.update
}))(Inventory);

export default InventoryWithApi;