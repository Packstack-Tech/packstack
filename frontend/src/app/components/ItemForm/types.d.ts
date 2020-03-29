import { Create, ExportCSV } from "types/api/item";

export declare module FormSpecs {
    export interface ApiProps {
        createItem: Create;
        exportCsv: ExportCSV;
    }

    export interface OwnProps {
        onSubmit: () => void;
    }

    export type Props = ApiProps & OwnProps;
}
