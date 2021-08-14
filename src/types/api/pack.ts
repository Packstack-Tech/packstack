import { CreatePack, Pack, PackOverview, UpdatePack } from "../pack";
import { NewPackItem, PackItemAttr } from "../item";

export interface PackService {
    get: Get;
    getUserPacks: GetUserPacks;
    create: Create;
    update: Update;
    delete: Delete;
    addItem: AddItem;
    removeItem: RemoveItem;
    exportItems: ExportItems;
    copyPack: CopyPack;
}

export interface Get {
    (packId: number): Promise<Pack>;
}

export interface GetUserPacks {
    (userId: number): Promise<PackOverview[]>;
}

export interface Create {
    (newPack: CreatePack): Promise<Pack>;
}

export interface Update {
    (updatedPack: UpdatePack): Promise<Pack>;
}

export interface Delete {
    (packId: number): Promise<number>
}

export interface AddItem {
    (item: NewPackItem): Promise<PackItemAttr>;
}

export interface RemoveItem {
    (packId: number, itemId: number): Promise<number>;
}

export interface ExportItems {
    (packId: number): Promise<File>;
}

export interface CopyPack {
    (packId: number): Promise<number>;//returns the id of the new pack
}