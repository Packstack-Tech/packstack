import { Create } from "types/api/item";

export declare module FormSpecs {
    export interface ApiProps {
        createItem: Create;
    }

    export interface OwnProps {
        onSubmit: () => void;
    }

    export type Props = ApiProps & OwnProps;
}
