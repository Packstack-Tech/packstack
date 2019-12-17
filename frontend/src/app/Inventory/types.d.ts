import { Delete, Get, Update, UploadCSV } from "types/api/item";

export declare module InventorySpecs {
    export interface ApiProps {
        getItems: Get;
        updateItem: Update;
        deleteItem: Delete;
    }

    export type Props = ApiProps;
}

export declare module UploadModalSpecs {
    export interface ApiProps {
        upload: UploadCSV;
    }

    export interface OwnProps {
        visible: boolean;
        fetchItems: () => void;
        hideModal: () => void;
    }

    export type Props = OwnProps & ApiProps;
}