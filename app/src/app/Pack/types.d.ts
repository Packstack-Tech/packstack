import { WeightUnit } from "enums";
import { Get } from "types/api/pack";

export declare module PackSpecs {
    export interface ApiProps {
        getPack: Get;
        packId: number;
    }

    export interface OwnProps {
        weightUnit: WeightUnit;
    }

    export type Props = ApiProps & OwnProps;
}
