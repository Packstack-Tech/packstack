import { ModalProps } from "antd/lib/modal";
import { Update, Delete } from "types/api/item";
import { Item, ItemRow } from "types/item";
import { Option } from "../FormFields/types";
import { Category } from "../../../types/category";

export declare module FormSpecs {
    export interface ApiProps {
        deleteItem: Delete;
    }

    export interface OwnProps extends ModalProps {
        record: Item;
        fetchItems: () => void;
        updateItem: (key: string, value: any) => void;
        categoryValue?: Option;
        categories: Category[];
        onClose: () => void;
    }

    export type Props = ApiProps & OwnProps;
}
