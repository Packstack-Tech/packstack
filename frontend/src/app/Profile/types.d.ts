import { CopyPack, Delete, GetUserPacks } from "types/api/pack";
import { Update } from "types/api/user";
import { PackOverview } from "types/pack";
import { User } from "types/user";

export declare module ProfileSpecs {
    export interface OwnProps {
        getPacks: GetUserPacks;
        deletePack: Delete;
        copyPack: CopyPack;
        updateUser: Update;
        fetchUser: () => void;
        user: User;
    }

    export interface State {
        loading: boolean;
        packs: PackOverview[];
    }

    export interface SettingsForm {
        username: string;
    }

    export type Props = OwnProps;
}