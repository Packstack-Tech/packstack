import { RouteComponentProps } from "react-router";

import { Get as GetItems } from "types/api/item";
import { Create, Get as GetPack, Update } from "types/api/pack";
import { User } from "types/user";

export declare module PackFormSpecs {
    export interface OwnProps {
        getItems: GetItems;
        getPack: GetPack;
        createPack: Create;
        updatePack: Update;
        packId: number | null;
        user: User;
    }

    export type Props = OwnProps & RouteComponentProps<{ id: string }>;
}