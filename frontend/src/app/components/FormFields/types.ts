import { CSSProperties } from "react";

export interface Option<t> {
    value: t;
    label: string;
    __isNew__?: boolean;
}

export interface SharedInputProps {
    label?: string;
    error?: boolean;
    errorMsg?: string;
    children?: any;
    placeholder?: string;
    tip?: string;
    last?: boolean;
    style?: CSSProperties;
    onBlur?: () => void;
}