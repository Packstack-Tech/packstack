import { CreateItem, Item, UpdateItem } from "../item";

export interface ItemService {
    get: Get;
    create: Create;
    update: Update;
    delete: Delete;
    uploadCSV: UploadCSV;
    exportCSV: ExportCSV;
}

export interface Get {
    (itemId?: number): Promise<Item[]>;
}

export interface Create {
    (newItem: CreateItem): Promise<Item>;
}

export interface Update {
    (updatedItem: UpdateItem): Promise<Item>;
}

export interface Delete {
    (itemId: number): Promise<number>;
}

export interface UploadCSV {
    (file: FormData): Promise<Item[]>;
}

export interface ExportCSV {
    (): Promise<File>;
}